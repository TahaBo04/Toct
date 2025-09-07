from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import OpsEvent
from ..schemas import OpsEventIn
from ..services.audit import hash_event
import json

router = APIRouter(prefix="/ops", tags=["ops"])

@router.post("/event")
def log_event(ev: OpsEventIn, db: Session = Depends(get_db)):
    prev = db.query(OpsEvent).order_by(OpsEvent.id.desc()).first()
    payload = ev.model_dump()
    h = hash_event(payload, prev.hash if prev else None)
    row = OpsEvent(stage=ev.stage, entity_id=ev.entity_id, latency_ms=ev.latency_ms,
                   sla_ok=ev.sla_ok, details_json=ev.details_json, prev_hash=prev.hash if prev else None,
                   hash=h)
    db.add(row); db.commit()
    return {"id": row.id, "hash": row.hash, "prev_hash": row.prev_hash}
