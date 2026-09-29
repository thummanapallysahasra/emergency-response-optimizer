from fastapi import APIRouter, HTTPException

from app.data import incidents
from app.models import Incident


router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"],
)


@router.get("")
def get_incidents():
    return incidents


@router.post("", response_model=Incident)
def create_incident(incident: Incident):
    existing = next(
        (item for item in incidents if item.id == incident.id),
        None,
    )

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Incident ID already exists",
        )

    incidents.append(incident)
    return incident


@router.get("/{incident_id}", response_model=Incident)
def get_incident(incident_id: str):
    for incident in incidents:
        if incident.id == incident_id:
            return incident

    raise HTTPException(
        status_code=404,
        detail="Incident not found",
    )