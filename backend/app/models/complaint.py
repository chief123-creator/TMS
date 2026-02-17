from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.database import Base
import enum

class VehicleType(str, enum.Enum):
    TWO_WHEELER = "two_wheeler"
    FOUR_WHEELER = "four_wheeler"
    TRUCK = "truck"

class ActionType(str, enum.Enum):
    DIRECT_CALL = "direct_call"
    OFFICIAL_ISSUE = "official_issue"

class ComplaintStatus(str, enum.Enum):
    PENDING = "pending"
    TIMER_RUNNING = "timer_running"
    RESOLVED = "resolved"
    FINE_APPLIED = "fine_applied"

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    video_url = Column(String, nullable=False)  # path to video file
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    vehicle_type = Column(Enum(VehicleType), nullable=False)
    action_type = Column(Enum(ActionType), nullable=False)
    status = Column(Enum(ComplaintStatus), default=ComplaintStatus.PENDING)
    plate_number = Column(String, nullable=True)  # detected later or manually entered
    timer_end_time = Column(DateTime, nullable=True)  # when timer should expire
    fine_amount = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # For proof upload (simplified: store proof URL)
    proof_url = Column(String, nullable=True)