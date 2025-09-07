from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import MarketPrice
from ..schemas import PriceOut
from typing import List

router = APIRouter(prefix="/market", tags=["market"])

@router.get("/prices", response_model=List[PriceOut])
def prices(symbol: str, limit: int = 500, db: Session = Depends(get_db)):
    q = (db.query(MarketPrice)
           .filter(MarketPrice.symbol==symbol)
           .order_by(MarketPrice.ts.desc())
           .limit(limit))
    rows = q.all()[::-1]
    return [PriceOut(ts=r.ts, open=r.open, high=r.high, low=r.low, close=r.close, volume=r.volume or 0.0) for r in rows]
