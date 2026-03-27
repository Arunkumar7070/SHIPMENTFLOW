from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.db.database import get_db
from app.models.user import User, Shipment, TrackingEvent, Driver, ShipmentStatus, TrackingEventType
from app.schemas.schemas import (
    ShipmentCreate, ShipmentOut, ShipmentWithEvents,
    ShipmentStatusUpdate, ShipmentAssign, TrackingEventCreate, TrackingEventOut
)
from app.core.security import get_current_user, require_role
from app.core.utils import generate_tracking_number

router = APIRouter(prefix="/api/shipments", tags=["shipments"])

STATUS_TO_EVENT = {
    ShipmentStatus.picked_up: TrackingEventType.picked_up,
    ShipmentStatus.in_transit: TrackingEventType.departed_hub,
    ShipmentStatus.at_hub: TrackingEventType.arrived_hub,
    ShipmentStatus.out_for_delivery: TrackingEventType.out_for_delivery,
    ShipmentStatus.delivered: TrackingEventType.delivered,
    ShipmentStatus.failed: TrackingEventType.failed,
    ShipmentStatus.returned: TrackingEventType.returned,
}


@router.post("", response_model=ShipmentOut, status_code=201)
def create_shipment(
    payload: ShipmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    tracking_number = generate_tracking_number()

    while db.query(Shipment).filter(Shipment.tracking_number == tracking_number).first():
        tracking_number = generate_tracking_number()

    shipment = Shipment(
        tracking_number=tracking_number,
        sender_id=current_user.id,
        origin_address=payload.origin_address.model_dump(),
        destination_address=payload.destination_address.model_dump(),
        recipient_name=payload.recipient_name,
        recipient_phone=payload.recipient_phone,
        recipient_email=payload.recipient_email,
        weight_kg=payload.weight_kg,
        description=payload.description,
        special_instructions=payload.special_instructions,
        declared_value=payload.declared_value,
        estimated_delivery=payload.estimated_delivery,
    )

    # ✅ STEP 1: save shipment first
    db.add(shipment)
    db.commit()
    db.refresh(shipment)

    # ✅ STEP 2: now create tracking event
    event = TrackingEvent(
        shipment_id=shipment.id,
        event_type=TrackingEventType.created,
        description="Shipment created and awaiting pickup",
        created_by_id=current_user.id,
    )

    db.add(event)
    db.commit()

    return shipment


@router.get("", response_model=List[ShipmentOut])
def list_shipments(
    status: Optional[ShipmentStatus] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    q = db.query(Shipment)

    if current_user.role == "customer":
        q = q.filter(Shipment.sender_id == current_user.id)
    elif current_user.role == "driver":
        driver = db.query(Driver).filter(Driver.user_id == current_user.id).first()
        if driver:
            q = q.filter(Shipment.driver_id == driver.id)
        else:
            return []

    if status:
        q = q.filter(Shipment.status == status)

    return q.order_by(Shipment.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/track/{tracking_number}", response_model=ShipmentWithEvents)
def track_by_number(tracking_number: str, db: Session = Depends(get_db)):
    shipment = (
        db.query(Shipment)
        .filter(Shipment.tracking_number == tracking_number.upper())
        .first()
    )
    if not shipment:
        raise HTTPException(status_code=404, detail="Tracking number not found")
    return shipment


@router.get("/{shipment_id}", response_model=ShipmentWithEvents)
def get_shipment(
    shipment_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return shipment


@router.patch("/{shipment_id}/status", response_model=ShipmentOut)
def update_status(
    shipment_id: UUID,
    payload: ShipmentStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("admin", "dispatcher", "driver")),
):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")

    shipment.status = payload.status

    if payload.status == ShipmentStatus.delivered:
        from datetime import datetime
        shipment.delivered_at = datetime.utcnow()

    event_type = STATUS_TO_EVENT.get(payload.status)
    if event_type:
        event = TrackingEvent(
            shipment_id=shipment.id,
            event_type=event_type,
            description=payload.note or f"Status updated to {payload.status.value}",
            created_by_id=current_user.id,
        )
        db.add(event)

    db.commit()
    db.refresh(shipment)
    return shipment


@router.post("/{shipment_id}/assign", response_model=ShipmentOut)
def assign_driver(
    shipment_id: UUID,
    payload: ShipmentAssign,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("admin", "dispatcher")),
):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")

    driver = db.query(Driver).filter(Driver.id == payload.driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")

    shipment.driver_id = driver.id
    db.commit()
    db.refresh(shipment)
    return shipment


@router.post("/{shipment_id}/events", response_model=TrackingEventOut, status_code=201)
def add_tracking_event(
    shipment_id: UUID,
    payload: TrackingEventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("admin", "dispatcher", "driver")),
):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")

    event = TrackingEvent(
        shipment_id=shipment_id,
        event_type=payload.event_type,
        description=payload.description,
        location_name=payload.location_name,
        lat=payload.lat,
        lng=payload.lng,
        created_by_id=current_user.id,
    )

    db.add(event)
    db.commit()
    db.refresh(event)
    return event