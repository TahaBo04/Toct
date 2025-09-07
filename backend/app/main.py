from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import Base, engine
from .routes import market, backtest, risk, ops, compliance
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TOCT Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("ALLOW_ORIGINS","*")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

app.include_router(market.router)
app.include_router(backtest.router)
app.include_router(risk.router)
app.include_router(ops.router)
app.include_router(compliance.router)
