from fastapi import APIRouter, Depends
from app.db import schemas
from app.core.security import get_current_active_user

router = APIRouter()

@router.get("/me", response_model=schemas.UserOut)
async def read_users_me(
    current_user: schemas.UserOut = Depends(get_current_active_user)
):
    return current_user