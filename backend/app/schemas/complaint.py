from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import Optional
from app.models.complaint import VehicleType, ActionType, ComplaintStatus

class ComplaintBase(BaseModel):
    vehicle_type: VehicleType
    action_type: ActionType
    latitude: float
    longitude: float

class ComplaintCreate(ComplaintBase):
    pass  # video will be uploaded separately

class ComplaintOut(ComplaintBase):
    id: UUID
    user_id: UUID
    video_url: str
    status: ComplaintStatus
    plate_number: Optional[str] = None
    timer_end_time: Optional[datetime] = None
    fine_amount: float
    proof_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ComplaintStatusUpdate(BaseModel):
    status: ComplaintStatus