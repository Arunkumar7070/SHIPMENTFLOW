from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID
from app.models.user import UserRole


# ── Auth ──────────────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    password: str = Field(..., min_length=8)
    role: UserRole = UserRole.customer


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserOut"


class UserOut(BaseModel):
    id: UUID
    name: str
    email: str
    phone: Optional[str]
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ── Driver ────────────────────────────────────────────────────────────────────

class DriverCreate(BaseModel):
    license_number: Optional[str] = None
    vehicle_type: Optional[str] = None
    vehicle_plate: Optional[str] = None


class DriverLocationUpdate(BaseModel):
    lat: float = Field(..., ge=-90, le=90)
    lng: float = Field(..., ge=-180, le=180)


class DriverOut(BaseModel):
    id: UUID
    user_id: UUID
    license_number: Optional[str]
    vehicle_type: Optional[str]
    vehicle_plate: Optional[str]
    current_lat: Optional[float]
    current_lng: Optional[float]
    is_available: bool
    last_location_update: Optional[datetime]
    user: UserOut

    class Config:
        from_attributes = True


# ── Address ───────────────────────────────────────────────────────────────────

class Address(BaseModel):
    street: str
    city: str
    state: str
    postal_code: str
    country: str = "India"
    lat: Optional[float] = None
    lng: Optional[float] = None
