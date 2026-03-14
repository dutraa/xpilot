from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Literal

from .strategy import generate_recommendation

app = FastAPI(title="xPilot AI Engine", version="0.1.0")

RiskLevel = Literal["low", "moderate", "high"]


class RecommendRequest(BaseModel):
    prompt: str = Field(..., min_length=5)
    amount: float = Field(..., gt=0)
    risk: RiskLevel = "moderate"


@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "xpilot-ai-engine"}


@app.post("/recommend")
def recommend(req: RecommendRequest) -> dict:
    return generate_recommendation(req.prompt, req.amount, req.risk)
