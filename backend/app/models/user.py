import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Float, Boolean, DateTime, Text,
    ForeignKey, Enum as SAEnum, JSON
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum


class UserRole(str, enum.Enum):
    admin = "admin"
    dispatcher = "dispatcher"
    driver = "driver"
    customer = "customer"


class ShipmentStatus(str, enum.Enum):
    pending = "pending"
    picked_up = "picked_up"
    in_transit = "in_transit"
    at_hub = "at_hub"
    out_for_delivery = "out_for_delivery"
    delivered = "delivered"
    failed = "failed"
    returned = "returned"


class TrackingEventType(str, enum.Enum):
    created = "created"
    picked_up = "picked_up"
    departed_hub = "departed_hub"
    arrived_hub = "arrived_hub"
    out_for_delivery = "out_for_delivery"
    delivery_attempted = "delivery_attempted"
    delivered = "delivered"
    failed = "failed"
    returned = "returned"
    location_update = "location_update"


class NotificationChannel(str, enum.Enum):
    email = "email"
    sms = "sms"
    push = "push"


class NotificationStatus(str, enum.Enum):
    pending = "pending"
    sent = "sent"
    failed = "failed"


# ── Models ────────────────────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(20), nullable=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(SAEnum(UserRole), default=UserRole.customer, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    driver_profile = relationship("Driver", back_populates="user", uselist=False)
    sent_shipments = relationship("Shipment", foreign_keys="Shipment.sender_id", back_populates="sender")
    received_shipments = relationship("Shipment", foreign_keys="Shipment.recipient_id", back_populates="recipient")
    notifications = relationship("Notification", back_populates="user")


class Driver(Base):
    __tablename__ = "drivers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    license_number = Column(String(50), nullable=True)
    vehicle_type = Column(String(50), nullable=True)
    vehicle_plate = Column(String(20), nullable=True)
    current_lat = Column(Float, nullable=True)
    current_lng = Column(Float, nullable=True)
    is_available = Column(Boolean, default=True)
    last_location_update = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="driver_profile")
    shipments = relationship("Shipment", back_populates="driver")


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tracking_number = Column(String(20), unique=True, nullable=False, index=True)
    sender_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    recipient_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    driver_id = Column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=True)

    # Addresses as JSON for flexibility
    origin_address = Column(JSON, nullable=False)
    destination_address = Column(JSON, nullable=False)
    recipient_name = Column(String(100), nullable=False)
    recipient_phone = Column(String(20), nullable=True)
    recipient_email = Column(String(255), nullable=True)

    status = Column(SAEnum(ShipmentStatus), default=ShipmentStatus.pending, nullable=False)
    weight_kg = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    special_instructions = Column(Text, nullable=True)
    declared_value = Column(Float, nullable=True)

    estimated_delivery = Column(DateTime, nullable=True)
    delivered_at = Column(DateTime, nullable=True)
    proof_of_delivery_url = Column(String(500), nullable=True)
    delivery_signature = Column(String(500), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_shipments")
    recipient = relationship("User", foreign_keys=[recipient_id], back_populates="received_shipments")
    driver = relationship("Driver", back_populates="shipments")
    tracking_events = relationship("TrackingEvent", back_populates="shipment", order_by="TrackingEvent.occurred_at")
    notifications = relationship("Notification", back_populates="shipment")


class TrackingEvent(Base):
    __tablename__ = "tracking_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipments.id"), nullable=False, index=True)
    event_type = Column(SAEnum(TrackingEventType), nullable=False)
    description = Column(Text, nullable=True)
    location_name = Column(String(255), nullable=True)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    occurred_at = Column(DateTime, default=datetime.utcnow)
    created_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    shipment = relationship("Shipment", back_populates="tracking_events")


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipments.id"), nullable=True)
    channel = Column(SAEnum(NotificationChannel), nullable=False)
    subject = Column(String(255), nullable=True)
    message = Column(Text, nullable=False)
    status = Column(SAEnum(NotificationStatus), default=NotificationStatus.pending)
    sent_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")
    shipment = relationship("Shipment", back_populates="notifications")
