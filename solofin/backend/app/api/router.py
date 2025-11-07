from fastapi import APIRouter
from app.api.endpoints import auth, google, users

api_router = APIRouter(prefix="/api")

api_router.include_router(auth.router, prefix="/auth", tags=["Email/Password Auth"])
api_router.include_router(google.router, prefix="/auth", tags=["Google OAuth2"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])