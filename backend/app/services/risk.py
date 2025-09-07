import numpy as np

def historical_var(pnl, level=0.99):
    if len(pnl) < 20: raise ValueError("PNL series too short")
    return float(-np.quantile(pnl, 1-level))

def expected_shortfall(pnl, level=0.99):
    q = np.quantile(pnl, 1-level)
    tail = [x for x in pnl if x <= q]
    return float(-np.mean(tail)) if tail else 0.0
