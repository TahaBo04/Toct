from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import datetime

class PriceIn(BaseModel):
    symbol: str; start: datetime; end: datetime

class PriceOut(BaseModel):
    ts: datetime; open: float; high: float; low: float; close: float; volume: float

class BacktestRequest(BaseModel):
    symbol: str
    lookback: int = Field(20, ge=2, le=500)
    oos_pct: float = Field(0.3, ge=0.05, le=0.8)
    strategy: Literal["momentum","mean_reversion"] = "momentum"

class BacktestMetrics(BaseModel):
    cagr: float; sharpe: float; max_dd: float; hit_rate: float; turnover: float

class VaRRequest(BaseModel):
    pnl_series: List[float]
    level: float = Field(0.99, ge=0.8, le=0.999)

class OpsEventIn(BaseModel):
    stage: str; entity_id: str; latency_ms: int; sla_ok: bool; details_json: str
