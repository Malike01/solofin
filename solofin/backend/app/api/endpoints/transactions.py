from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import schemas
from app.services import crud
from app.db.database import get_db
from app.core.security import get_current_active_user

router = APIRouter()

@router.post("/", response_model=schemas.TransactionOut)
async def create_transaction(
    transaction: schemas.TransactionCreate,
    db: AsyncSession = Depends(get_db),
    current_user: schemas.UserOut = Depends(get_current_active_user)
):
    return await crud.create_transaction(
        db=db, 
        transaction=transaction, 
        user_id=current_user.id
    )

@router.get("/", response_model=List[schemas.TransactionOut])
async def read_transactions(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
    current_user: schemas.UserOut = Depends(get_current_active_user)
):

    transactions = await crud.get_transactions(
        db=db, 
        user_id=current_user.id, 
        skip=skip, 
        limit=limit
    )
    return transactions