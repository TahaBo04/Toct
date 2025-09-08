import numpy as np

def historical_var(pnl_series: list[float], level: float) -> float:
    pnl = np.array(pnl_series, dtype=float)
    pnl.sort()
    n = len(pnl)
    k = int((1 - level) * n)
    k = max(0, min(n - 1, k))  # clamp
    return float(pnl[k])

def expected_shortfall(pnl_series: list[float], level: float) -> float:
    pnl = np.array(pnl_series, dtype=float)
    pnl.sort()
    n = len(pnl)
    k = int((1 - level) * n)
    k = max(0, min(n - 1, k))
    tail = pnl[:k + 1]
    return float(tail.mean()) if len(tail) else float(pnl[0])
