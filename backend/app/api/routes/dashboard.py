from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date

from app.db.database import get_db
from app.models.user import User, Shipment, Driver, ShipmentStatus
from app.schemas.schemas import DashboardStats, UserOut
from app.core.security import get_current_user, require_role
from typing import List

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/stats", response_model=DashboardStats)
def get_stats(
    db: Session = Depends(get_db),
    _: User = Depends(require_role("admin", "dispatcher")),
):
    today_start = datetime.combine(date.today(), datetime.min.time())

    total = db.query(func.count(Shipment.id)).scalar()
    pending = db.query(func.count(Shipment.id)).filter(Shipment.status == ShipmentStatus.pending).scalar()
    in_transit = db.query(func.count(Shipment.id)).filter(
        Shipment.status.in_([ShipmentStatus.picked_up, ShipmentStatus.in_transit,
                               ShipmentStatus.at_hub, ShipmentStatus.out_for_delivery])
    ).scalar()
    delivered = db.query(func.count(Shipment.id)).filter(Shipment.status == ShipmentStatus.delivered).scalar()
    failed = db.query(func.count(Shipment.id)).filter(
        Shipment.status.in_([ShipmentStatus.failed, ShipmentStatus.returned])
    ).scalar()
    active_drivers = db.query(func.count(Driver.id)).filter(Driver.is_available == True).scalar()
    today_deliveries = db.query(func.count(Shipment.id)).filter(
        Shipment.status == ShipmentStatus.delivered,
        Shipment.delivered_at >= today_start,
    ).scalar()

    return DashboardStats(
        total_shipments=total,
        pending=pending,
        in_transit=in_transit,
        delivered=delivered,
        failed=failed,
        active_drivers=active_drivers,
        today_deliveries=today_deliveries,
    )


@router.get("/users", response_model=List[UserOut])
def list_users(
    db: Session = Depends(get_db),
    _: User = Depends(require_role("admin")),
):
    return db.query(User).all()
