from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum

# --- Token ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# --- User ---
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserOut(BaseModel): 
    id: int
    email: EmailStr
    full_name: Optional[str] = None
    is_google_user: bool
    login_attempts: int
    locked_until: Optional[datetime] = None

    class Config:
        from_attributes = True 

# ---- Transaction ---        
class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"

class TransactionBase(BaseModel):
    amount: float
    type: TransactionType
    category: str
    description: Optional[str] = None
    date: datetime = Field(default_factory=datetime.now) 
    
    vat_rate: float = 0.0        
    is_tax_deductible: bool = True 

class TransactionCreate(TransactionBase):
    pass
class TransactionOut(TransactionBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True        