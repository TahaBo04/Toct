from fastapi import APIRouter, HTTPException
from ..schemas import VaRRequest
from ..services.risk import historical_var, expected_shortfall

router = APIRouter(prefix="/risk", tags=["risk"])

@router.post("/var")
def var(req: VaRRequest):
    try:
        v = historical_var(req.pnl_series, req.level)
        es = expected_shortfall(req.pnl_series, req.level)
        return {"var": v, "es": es, "level": req.level}
    except Exception as e:
        raise HTTPException(400, str(e))
