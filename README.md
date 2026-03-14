# xPilot

> AI Advisor for Tokenized Stocks

xPilot is a hackathon starter project for an **AI advisor** that turns natural-language investing prompts into tokenized-stock portfolio recommendations using **xStocks-style assets**.

For v1, xPilot is intentionally designed as a **non-custodial advisor**:
- the AI suggests allocations and rebalance actions
- the user keeps control of funds in their own wallet
- the app stores strategy metadata and emits recommendation events onchain
- execution is **simulated first** for hackathon reliability

## Locked v1 Scope

- **AI Advisor model** (no custody)
- **Ethereum Sepolia**
- **Next.js + Tailwind frontend**
- **FastAPI AI service**
- **Foundry contracts**
- **Simulated execution layer**
- **Future-ready for multi-agent expansion**

## Core User Flow

1. Connect wallet
2. Enter prompt like:
   - `Invest $1,000 into AI companies with moderate risk`
3. AI generates a portfolio recommendation
4. User saves the portfolio profile onchain
5. xPilot shows drift + rebalance suggestions
6. User approves any future trade actions from their own wallet

## Repo Structure

```text
xpilot-starter/
├─ apps/
│  └─ web/                  # Next.js app router frontend
├─ services/
│  └─ ai-engine/            # FastAPI strategy engine
├─ packages/
│  └─ contracts/            # Foundry contracts
├─ data/                    # Mock xStocks universe + demo data
├─ docs/                    # Architecture + roadmap notes
├─ .env.example
└─ README.md
```

## Quick Start

### 1) Frontend

```bash
cd apps/web
npm install
npm run dev
```

### 2) AI Service

```bash
cd services/ai-engine
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3) Contracts

```bash
cd packages/contracts
forge build
forge test
```

## Environment

Copy the root env template:

```bash
cp .env.example .env
```

Then fill in values as needed.

## Current MVP Features in This Starter

- landing page shell
- prompt form UI
- mock portfolio generation flow
- dashboard shell
- FastAPI endpoint for recommendation generation
- rules-based recommendation engine
- Foundry contract skeleton for portfolio profiles
- mock data for xStocks universe and sample portfolios

## Phase Plan

### Phase 0 — Foundation
- repo scaffold
- README
- mock data
- UI shell
- contract skeleton

### Phase 1 — Prompt → Portfolio
- prompt input
- risk selector
- AI recommendation endpoint
- proposal card

### Phase 2 — Onchain Strategy Profile
- save portfolio profile onchain
- emit portfolio created events
- index saved strategies in UI

### Phase 3 — Rebalance Suggestions
- drift detection
- rationale engine
- execution simulation log

### Phase 4 — Polish
- cleaner UI
- better prompts
- demo mode
- submission assets

## Suggested Demo Prompt

`Invest $1,000 into AI leaders with moderate risk.`

Expected sample output:
- NVDAx 35%
- MSFTx 25%
- METAx 20%
- GOOGLx 20%

## Future Expansion

- multi-agent strategy voting
- bounded auto-approval flows
- real execution adapters
- strategy marketplace

## Pitch Line

**xStocks put equities onchain. xPilot makes them autonomous.**
