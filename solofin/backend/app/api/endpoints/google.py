from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from httpx_oauth.clients.google import GoogleOAuth2

from app.core.config import settings
from app.core import security
from app.services import crud
from app.db.database import get_db
from app.db import schemas

router = APIRouter()

google_client = GoogleOAuth2(
    settings.GOOGLE_CLIENT_ID,
    settings.GOOGLE_CLIENT_SECRET
)

@router.get("/google")
async def google_auth_redirect():
    redirect_uri = settings.GOOGLE_REDIRECT_URI
    scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]
    
    authorization_url = await google_client.get_authorization_url(
        redirect_uri,
        scope=scopes
    )
    return RedirectResponse(authorization_url)


@router.get("/google/callback", response_model=schemas.Token)
async def google_auth_callback(
    code: str,
    db: AsyncSession = Depends(get_db)
):
    try:
        token = await google_client.get_access_token(code, settings.GOOGLE_REDIRECT_URI)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Google'dan token alınamadı: {e}"
        )

    try:
        user_id, user_data = await google_client.get_id_email(token['access_token'])
        user_email = user_data.get("email")
        user_full_name = user_data.get("name")

        if not user_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Google hesabı email bilgisi içermiyor."
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Google'dan kullanıcı bilgisi alınamadı: {e}"
        )

    db_user = await crud.get_user_by_email(db, email=user_email)

    if not db_user:
        db_user = await crud.create_google_user(
            db, email=user_email, full_name=user_full_name
        )
    elif db_user.is_google_user == False:
        pass
    
    access_token = security.create_access_token(
        data={"sub": db_user.email}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}