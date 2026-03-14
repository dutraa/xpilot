from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .portfolio_engine import build_portfolio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://100.118.32.16:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PortfolioRequest(BaseModel):
    prompt: str
    risk: str = "medium"


@app.post("/generate-portfolio")
def generate_portfolio(req: PortfolioRequest):
    portfolio = build_portfolio(req.prompt, req.risk)

    return {
        "status": "success",
        "portfolio": portfolio
    }
