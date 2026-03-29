from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from uuid import UUID

from app.db.database import get_db
from app.models.user import User, Driver
from app.schemas.schemas import DriverCreate, DriverOut, DriverLocationUpdate
from app.core.security import get_current_user, require_role

router = APIRouter(prefix="/api/drivers", tags=["drivers"])


@router.post("/profile", response_model=DriverOut, status_code=201)
def create_driver_profile(
    payload: DriverCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("driver", "admin")),
):
    if db.query(Driver).filter(Driver.user_id == current_user.id).first():
        raise HTTPException(status_code=400, detail="Driver profile already exists")

    driver = Driver(
        user_id=current_user.id,
        license_number=payload.license_number,
        vehicle_type=payload.vehicle_type,
        vehicle_plate=payload.vehicle_plate,
    )
    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver


@router.get("", response_model=List[DriverOut])
def list_drivers(
    available_only: bool = False,
    db: Session = Depends(get_db),
    _: User = Depends(require_role("admin", "dispatcher")),
):
    q = db.query(Driver)
    if available_only:
        q = q.filter(Driver.is_available == True)
    return q.all()


@router.get("/me", response_model=DriverOut)
def get_my_driver_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("driver")),
):
    driver = db.query(Driver).filter(Driver.user_id == current_user.id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver profile not found")
    return driver


@router.patch("/me/location", response_model=DriverOut)
def update_location(
    payload: DriverLocationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("driver")),
):
    driver = db.query(Driver).filter(Driver.user_id == current_user.id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver profile not found")

    driver.current_lat = payload.lat
    driver.current_lng = payload.lng
    driver.last_location_update = datetime.utcnow()
    db.commit()
    db.refresh(driver)
    return driver


@router.patch("/me/availability")
def toggle_availability(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("driver")),
):
    driver = db.query(Driver).filter(Driver.user_id == current_user.id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver profile not found")
    driver.is_available = not driver.is_available
    db.commit()
    return {"is_available": driver.is_available}


@router.get("/{driver_id}", response_model=DriverOut)
def get_driver(
    driver_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_role("admin", "dispatcher")),
):
    driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    return driver
