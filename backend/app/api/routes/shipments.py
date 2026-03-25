from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.db.database import get_db
from app.models.user import User, Shipment, TrackingEvent, Driver, ShipmentStatus, TrackingEventType
from app.schemas.schemas import ShipmentCreate, ShipmentOut, ShipmentWithEvents
from app.core.security import get_current_user
from app.core.utils import generate_tracking_number

router = APIRouter(prefix="/api/shipments", tags=["shipments"])


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

    db.add(shipment)
    db.commit()
    db.refresh(shipment)

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
