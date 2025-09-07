"""
Seed a demo price series (synthetic MASI proxy) and a couple of limits.
Run once inside the backend container:
  docker compose exec backend python -m app.seed_demo
"""
import pandas as pd, numpy as np
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from .db import SessionLocal, Base, engine
from .models import MarketPrice, RiskLimit

Base.metadata.create_all(bind=engine)

def seed_prices(db: Session, symbol="MASI.X"):
    start = datetime.now() - timedelta(days=520)
    dates = pd.bdate_range(start=start, periods=500)
    rnd = np.random.default_rng(42)
    ret = rnd.normal(0.0005, 0.01, size=len(dates))
    px = 1000 * (1+pd.Series(ret, index=dates)).cumprod()
    for ts, close in px.items():
        mp = MarketPrice(symbol=symbol, ts=ts.to_pydatetime(),
                         open=float(close*0.998), high=float(close*1.003),
                         low=float(close*0.997), close=float(close), volume=100000.0, source_hash="demo")
        db.add(mp)
    db.commit()

def seed_limits(db: Session):
    db.add_all([
        RiskLimit(scope="portfolio", limit_type="VaR_99", threshold=2.5),
        RiskLimit(scope="symbol:MASI.X", limit_type="Position", threshold=1_000_000),
    ])
    db.commit()

if __name__ == "__main__":
    with SessionLocal() as db:
        if db.query(MarketPrice).count() == 0:
            seed_prices(db)
        if db.query(RiskLimit).count() == 0:
            seed_limits(db)
    print("Seeded.")
