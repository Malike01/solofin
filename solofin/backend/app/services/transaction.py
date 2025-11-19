from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db import models, schemas

async def create_transaction(
    db: AsyncSession, 
    transaction: schemas.TransactionCreate, 
    user_id: int
) -> models.Transaction:
    db_transaction = models.Transaction(
        **transaction.model_dump(),
        owner_id=user_id
    )
    db.add(db_transaction)
    await db.commit()
    await db.refresh(db_transaction)
    return db_transaction

async def get_transactions(
    db: AsyncSession, 
    user_id: int, 
    skip: int = 0, 
    limit: int = 100
) -> list[models.Transaction]:
    result = await db.execute(
        select(models.Transaction)
        .where(models.Transaction.owner_id == user_id)
        .order_by(models.Transaction.date.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()