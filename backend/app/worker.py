import os, json, time
from redis import Redis
from rq import Queue
from .services.backtest import run_backtest
from .db import SessionLocal

# Simplest demonstration worker; queue wiring point if you later push jobs.
if __name__ == "__main__":
    print("Worker ready (demo). Sleeping…")
    while True:
        time.sleep(60)
