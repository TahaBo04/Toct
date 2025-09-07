from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .db import Base

class MarketPrice(Base):
    __tablename__ = "market_prices"
    id = Column(Integer, primary_key=True)
    symbol = Column(String(32), index=True)
    ts = Column(DateTime(timezone=True), index=True)
    open = Column(Float); high = Column(Float); low = Column(Float); close = Column(Float)
    volume = Column(Float)
    source_hash = Column(String(64))

class Strategy(Base):
    __tablename__ = "strategies"
    id = Column(Integer, primary_key=True)
    name = Column(String(64), unique=True)
    params_json = Column(Text)
    owner = Column(String(64))
    approved_by = Column(String(64), nullable=True)
    approved_at = Column(DateTime(timezone=True), nullable=True)

class BacktestRun(Base):
    __tablename__ = "backtest_runs"
    id = Column(Integer, primary_key=True)
    strategy_id = Column(Integer, ForeignKey("strategies.id"))
    start = Column(DateTime(timezone=True)); end = Column(DateTime(timezone=True))
    oos_start = Column(DateTime(timezone=True), nullable=True)
    status = Column(String(16), default="done")
    metrics_json = Column(Text)
    artifact_uri = Column(String(256), nullable=True)
    parent_hash = Column(String(64), nullable=True)
    strategy = relationship("Strategy")

class RiskLimit(Base):
    __tablename__ = "risk_limits"
    id = Column(Integer, primary_key=True)
    scope = Column(String(64))
    limit_type = Column(String(32))
    threshold = Column(Float)
    active = Column(Boolean, default=True)

class LimitBreach(Base):
    __tablename__ = "limit_breaches"
    id = Column(Integer, primary_key=True)
    limit_id = Column(Integer, ForeignKey("risk_limits.id"))
    ts = Column(DateTime(timezone=True), server_default=func.now())
    value = Column(Float)
    limit = relationship("RiskLimit")

class OpsEvent(Base):
    """
    Hash-chained audit/ops log (tamper-evident).
    """
    __tablename__ = "ops_events"
    id = Column(Integer, primary_key=True)
    ts = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    stage = Column(String(32))   # e.g., SIGNAL, ORDER, EXEC, ALLOC, RECON
    entity_id = Column(String(64))
    latency_ms = Column(Integer)
    sla_ok = Column(Boolean)
    details_json = Column(Text)
    prev_hash = Column(String(64), nullable=True)
    hash = Column(String(64), index=True, unique=True)
