from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, Float, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.database import Base
from datetime import datetime
from typing import List
import enum
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String, nullable=True)
    hashed_password: Mapped[str] = mapped_column(String, nullable=True)
    
    # 'Attempt'
    is_google_user: Mapped[bool] = mapped_column(Boolean, default=False)
    login_attempts: Mapped[int] = mapped_column(Integer, default=0)
    locked_until: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)

class TransactionType(str, enum.Enum):
    INCOME = "income"   
    EXPENSE = "expense"

class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    
    type: Mapped[TransactionType] = mapped_column(Enum(TransactionType), nullable=False)
    
    category: Mapped[str] = mapped_column(String, index=True)
    
    description: Mapped[str] = mapped_column(String, nullable=True)
    
    date: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now)
    
    vat_rate: Mapped[float] = mapped_column(Float, default=0.0)
    
    is_tax_deductible: Mapped[bool] = mapped_column(Boolean, default=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now)

    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    owner: Mapped["User"] = relationship(back_populates="transactions")    