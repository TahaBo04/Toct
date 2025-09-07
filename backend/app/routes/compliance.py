from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import OpsEvent
from reportlab.pdfgen import canvas
from io import BytesIO
from fastapi.responses import StreamingResponse

router = APIRouter(prefix="/compliance", tags=["compliance"])

@router.get("/audit_report.pdf")
def audit_pdf(db: Session = Depends(get_db)):
    buf = BytesIO()
    c = canvas.Canvas(buf)
    c.setTitle("TOCT Audit Report")
    c.drawString(72, 800, "Trading Ops Control Tower — Audit Report")
    y = 780
    for ev in db.query(OpsEvent).order_by(OpsEvent.id.asc()).limit(50):
        line = f"#{ev.id} {ev.ts} {ev.stage} {ev.entity_id} SLA={ev.sla_ok} HASH={ev.hash[:12]} PREV={str(ev.prev_hash)[:12]}"
        c.drawString(72, y, line); y -= 14
        if y < 72: c.showPage(); y = 800
    c.save(); buf.seek(0)
    return StreamingResponse(buf, media_type="application/pdf", headers={"Content-Disposition":"inline; filename=audit_report.pdf"})
