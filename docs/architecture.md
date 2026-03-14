# xPilot Architecture

## Components

### Frontend
- Next.js app router
- prompt-to-portfolio UX
- dashboard for current and target weights
- wallet-aware save strategy flow

### AI Engine
- FastAPI endpoint
- input: prompt, amount, risk profile
- output: strategy recommendation JSON
- rules guardrails for deterministic behavior

### Contracts
- portfolio profile registry
- store target allocations
- emit create/update events
- no custody in v1

## Data Flow

1. User enters a natural-language goal.
2. Frontend calls FastAPI `/recommend`.
3. AI engine returns a structured recommendation.
4. User reviews recommendation.
5. User optionally saves profile onchain.
6. Dashboard displays mock or indexed portfolio state.

## Why Non-Custodial
- less hackathon risk
- easier to explain
- user wallet stays in control
- cleaner path to multi-agent advisor later
