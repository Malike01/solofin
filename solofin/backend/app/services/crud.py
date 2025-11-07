from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db import models, schemas
from app.core.security import get_password_hash
from app.core.config import settings
from typing import Optional
from datetime import datetime, timedelta, timezone

async def get_user_by_email(db: AsyncSession, email: str) -> Optional[models.User]:
    result = await db.execute(select(models.User).where(models.User.email == email))
    return result.scalars().first()

async def create_user(db: AsyncSession, user: schemas.UserCreate) -> models.User:
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
        is_google_user=False
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def create_google_user(db: AsyncSession, email: str, full_name: str) -> models.User:
    db_user = models.User(
        email=email,
        full_name=full_name,
        hashed_password=None,
        is_google_user=True
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def update_login_attempts(
    db: AsyncSession, 
    user: models.User, 
    success: bool
) -> models.User:
    if success:
        user.login_attempts = 0
        user.locked_until = None
    else:
        user.login_attempts += 1
        if user.login_attempts >= settings.MAX_LOGIN_ATTEMPTS:
            user.locked_until = datetime.now(timezone.utc) + timedelta(minutes=settings.LOCKOUT_MINUTES)
    
    await db.commit()
    await db.refresh(user)
    return user