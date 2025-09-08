from fastapi import APIRouter, HTTPException
from ..schemas import VaRRequest
from ..services.risk import historical_var, expected_shortfall

# Create the router for this module
router = APIRouter(prefix="/risk", tags=["Risk"])

@router.post("/var")
def compute_var_es(req: VaRRequest):
    """
    Compute Value-at-Risk (VaR) and Expected Shortfall (ES)
    for a given PnL series at the chosen confidence level.
    """
    try:
        v = historical_var(req.pnl_series, req.level)
        es = expected_shortfall(req.pnl_series, req.level)
        return {"var": v, "es": es, "level": req.level}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
