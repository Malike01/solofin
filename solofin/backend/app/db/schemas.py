from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

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