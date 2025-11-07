from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone

from app.db import schemas
from app.services import crud
from app.core import security
from app.db.database import get_db
from app.core.limiter import ip_rate_limiter 

router = APIRouter()

@router.post("/register", response_model=schemas.UserOut)
async def register_user(
    user: schemas.UserCreate, 
    db: AsyncSession = Depends(get_db)
):
    db_user = await crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu email adresi zaten kayıtlı."
        )
    return await crud.create_user(db=db, user=user)


@router.post("/login", response_model=schemas.Token)
async def login_for_access_token(
    db: AsyncSession = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
    # 'Retry' (IP) 
    _limiter: None = Depends(ip_rate_limiter) 
):
    email = form_data.username
    password = form_data.password
    
    user = await crud.get_user_by_email(db, email=email)

    if not user or user.is_google_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Geçersiz email veya şifre.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if user.locked_until and user.locked_until > datetime.now(timezone.utc):
        kalan_süre = (user.locked_until - datetime.now(timezone.utc)).seconds // 60
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Çok fazla hatalı deneme. Lütfen {kalan_süre+1} dakika sonra tekrar deneyin."
        )

    if not security.verify_password(password, user.hashed_password):
        # 'Attempt
        await crud.update_login_attempts(db, user, success=False)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Geçersiz email veya şifre.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    await crud.update_login_attempts(db, user, success=True)

    access_token = security.create_access_token(
        data={"sub": user.email}
    )
    return {"access_token": access_token, "token_type": "bearer"}