import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from uuid import uuid4
from typing import List, Optional
from app import models, schemas
from app.api import deps
from app.database import get_db
from app.config import settings

router = APIRouter(prefix="/complaints", tags=["Complaints"])

@router.post("/", response_model=schemas.ComplaintOut)
async def create_complaint(
    video: UploadFile = File(...),
    vehicle_type: str = Form(...),
    action_type: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_verified_user)
):
    # Validate vehicle_type and action_type
    try:
        v_type = models.VehicleType(vehicle_type)
        a_type = models.ActionType(action_type)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid vehicle type or action type")
    
    # Validate file type
    if not video.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video")
    
    # Save video file
    file_extension = os.path.splitext(video.filename)[1]
    filename = f"{uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {str(e)}")
    finally:
        video.file.close()
    
    # Create complaint
    complaint = models.Complaint(
        user_id=current_user.id,
        video_url=filename,  # store relative path
        latitude=latitude,
        longitude=longitude,
        vehicle_type=v_type,
        action_type=a_type,
        status=models.ComplaintStatus.PENDING
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    
    # Optionally trigger background task for processing (if AI later)
    
    return complaint

@router.get("/", response_model=List[schemas.ComplaintOut])
def list_complaints(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_verified_user)
):
    query = db.query(models.Complaint).filter(models.Complaint.user_id == current_user.id)
    if status:
        try:
            status_enum = models.ComplaintStatus(status)
            query = query.filter(models.Complaint.status == status_enum)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid status")
    complaints = query.order_by(models.Complaint.created_at.desc()).all()
    return complaints

@router.get("/{complaint_id}", response_model=schemas.ComplaintOut)
def get_complaint(
    complaint_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_verified_user)
):
    complaint = db.query(models.Complaint).filter(
        models.Complaint.id == complaint_id,
        models.Complaint.user_id == current_user.id
    ).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint

# Optional: endpoint for owner to upload proof
@router.post("/{complaint_id}/proof", response_model=schemas.ComplaintOut)
async def upload_proof(
    complaint_id: str,
    proof: UploadFile = File(...),
    db: Session = Depends(get_db),
    # In real app, this would be accessible to vehicle owner, not reporter
    # For now, we allow any verified user (simplified)
    current_user: models.User = Depends(deps.get_current_verified_user)
):
    complaint = db.query(models.Complaint).filter(models.Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    # Save proof file
    file_extension = os.path.splitext(proof.filename)[1]
    filename = f"proof_{uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(proof.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {str(e)}")
    finally:
        proof.file.close()
    
    complaint.proof_url = filename
    complaint.status = models.ComplaintStatus.RESOLVED
    db.commit()
    db.refresh(complaint)
    
    return complaint