from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any
from datetime import datetime
from uuid import UUID
from app.models.user import UserRole, ShipmentStatus, TrackingEventType, NotificationChannel


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


# ── Shipment ──────────────────────────────────────────────────────────────────

class ShipmentCreate(BaseModel):
    origin_address: Address
    destination_address: Address
    recipient_name: str
    recipient_phone: Optional[str] = None
    recipient_email: Optional[str] = None
    weight_kg: Optional[float] = None
    description: Optional[str] = None
    special_instructions: Optional[str] = None
    declared_value: Optional[float] = None
    estimated_delivery: Optional[datetime] = None


class ShipmentStatusUpdate(BaseModel):
    status: ShipmentStatus
    note: Optional[str] = None


class ShipmentAssign(BaseModel):
    driver_id: UUID


class ShipmentOut(BaseModel):
    id: UUID
    tracking_number: str
    status: ShipmentStatus
    origin_address: Any
    destination_address: Any
    recipient_name: str
    recipient_phone: Optional[str]
    recipient_email: Optional[str]
    weight_kg: Optional[float]
    description: Optional[str]
    special_instructions: Optional[str]
    declared_value: Optional[float]
    estimated_delivery: Optional[datetime]
    delivered_at: Optional[datetime]
    proof_of_delivery_url: Optional[str]
    created_at: datetime
    updated_at: datetime
    sender: UserOut
    driver: Optional[DriverOut]

    class Config:
        from_attributes = True


class ShipmentWithEvents(ShipmentOut):
    tracking_events: List["TrackingEventOut"] = []

    class Config:
        from_attributes = True


# ── Tracking Events ───────────────────────────────────────────────────────────

class TrackingEventCreate(BaseModel):
    event_type: TrackingEventType
    description: Optional[str] = None
    location_name: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None


class TrackingEventOut(BaseModel):
    id: UUID
    shipment_id: UUID
    event_type: TrackingEventType
    description: Optional[str]
    location_name: Optional[str]
    lat: Optional[float]
    lng: Optional[float]
    occurred_at: datetime

    class Config:
        from_attributes = True


# ── Dashboard Stats ───────────────────────────────────────────────────────────

class DashboardStats(BaseModel):
    total_shipments: int
    pending: int
    in_transit: int
    delivered: int
    failed: int
    active_drivers: int
    today_deliveries: int


# forward refs
TokenResponse.model_rebuild()
ShipmentWithEvents.model_rebuild()
