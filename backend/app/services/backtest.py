import numpy as np, pandas as pd
from sqlalchemy.orm import Session
from ..models import MarketPrice, BacktestRun, Strategy
from datetime import datetime
import json

def load_prices(db: Session, symbol: str) -> pd.DataFrame:
    q = db.query(MarketPrice).filter(MarketPrice.symbol==symbol).order_by(MarketPrice.ts.asc())
    rows = [{"ts":r.ts,"close":r.close} for r in q]
    df = pd.DataFrame(rows).set_index("ts").sort_index()
    return df

def run_backtest(db: Session, symbol: str, lookback:int, oos_pct:float, strategy:str) -> dict:
    df = load_prices(db, symbol)
    if len(df) < lookback+30:
        raise ValueError("Not enough data")
    ret = df["close"].pct_change().fillna(0.0)

    if strategy == "momentum":
        sig = (df["close"].pct_change(lookback).shift(1) > 0).astype(int) * 2 - 1
    else: # mean_reversion
        z = (df["close"] - df["close"].rolling(lookback).mean())/df["close"].rolling(lookback).std()
        sig = (-z.shift(1)).clip(-1,1).fillna(0.0)

    strat_ret = sig * ret
    n = len(strat_ret)
    split = int(n*(1-oos_pct))
    ins, oos = strat_ret.iloc[:split], strat_ret.iloc[split:]

    def metrics(series):
        ann = 252
        cagr = (1+series.mean())**ann - 1
        vol  = series.std() * np.sqrt(ann) + 1e-9
        sharpe = series.mean()/series.std() * np.sqrt(ann) if series.std() > 0 else 0.0
        eq = (1+series).cumprod()
        max_dd = float(((eq.cummax()-eq)/eq.cummax()).max())
        hit = float((series>0).mean())
        turn = float((sig.diff().abs().fillna(0).sum())/n)
        return dict(cagr=float(cagr), sharpe=float(sharpe), max_dd=max_dd, hit_rate=hit, turnover=turn)

    m_in, m_out = metrics(ins), metrics(oos)
    return {"in_sample": m_in, "out_of_sample": m_out, "points": int(n)}
