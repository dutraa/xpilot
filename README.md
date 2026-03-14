# xPilot

xPilot is an AI-assisted portfolio strategy generator that converts
natural language investment prompts into structured portfolio
allocations and stores them onchain for transparency and verification.

The system demonstrates how AI-driven financial agents can generate
investment strategies whose outputs are permanently recorded on a
blockchain.

Users can generate a portfolio, inspect the reasoning behind the
allocation, and save the result onchain as a verifiable strategy.

------------------------------------------------------------------------

## Overview

xPilot explores a simple question:

Can AI-generated investment strategies be made transparent and auditable
by storing their outputs onchain?

The application allows users to:

1.  Enter a natural language investment prompt
2.  Receive an AI-generated portfolio allocation
3.  Review the reasoning behind the allocation
4.  Save the strategy onchain
5.  Reload saved strategies from the blockchain

The result is a minimal prototype of a verifiable AI financial agent.

------------------------------------------------------------------------

## Core Features

### AI Portfolio Generation

Users can describe an investment strategy using natural language.\
The AI engine converts the prompt into a portfolio allocation with
weighted assets.

Example prompt:

Build a portfolio focused on leading AI companies.

### Agent Reasoning

Each generated portfolio includes an explanation describing why the AI
selected specific assets and allocations.

This provides transparency into the decision-making process.

### Onchain Portfolio Storage

Generated portfolios can be saved to a smart contract.

Once written to the blockchain, the portfolio allocation becomes a
permanent and verifiable record.

### Portfolio History

Previously saved portfolios can be retrieved from the blockchain and
displayed in the application.

### Autopilot Advisor

The interface includes an Autopilot Recommendation panel which proposes:

-   portfolio monitoring cadence
-   allocation drift thresholds
-   suggested management actions
-   risk guardrails

This demonstrates how AI agents could guide portfolio maintenance over
time.

------------------------------------------------------------------------

## System Architecture

Frontend (Next.js)\
Handles user prompts, portfolio display, and onchain interactions.

AI Engine (FastAPI)\
Processes prompts and generates portfolio allocations.

Smart Contract (Solidity)\
Stores portfolio strategies onchain.

Local Blockchain (Anvil)\
Provides the development chain used for testing contract interactions.

------------------------------------------------------------------------

## Technology Stack

Frontend

-   Next.js
-   React
-   TailwindCSS

Backend

-   Python
-   FastAPI

Blockchain

-   Solidity
-   Foundry
-   Anvil

Contract interaction

-   viem

------------------------------------------------------------------------

## Repository Structure

xpilot/

apps/\
    web/\
        Next.js frontend application

services/\
    ai-engine/\
        FastAPI service that generates portfolio strategies

contracts/\
    Solidity smart contracts

components/\
    React UI components including:

-   PortfolioCard
-   PromptBox
-   PromptPresets
-   SavedPortfolioHistory
-   AutopilotPanel

------------------------------------------------------------------------

## Running the Project

### 1. Start the local blockchain

anvil

### 2. Start the AI engine

cd services/ai-engine

source venv/bin/activate

uvicorn app.main:app --host 0.0.0.0 --reload --port 8000

### 3. Start the frontend

cd apps/web

npm install

npm run dev

### 4. Open the application

http://localhost:3000

------------------------------------------------------------------------

## Example Workflow

User prompt:

Invest in leading AI companies

AI generated allocation:

NVIDIA 30%\
Microsoft 25%\
Alphabet 20%\
Amazon 15%\
Meta 10%

Save to blockchain:

portfolioId: 0\
transactionHash: 0x...\
blockNumber: 2

Reload from chain:

GET /api/get-portfolio/0

------------------------------------------------------------------------

## Why Store AI Strategies Onchain

AI systems will increasingly generate financial strategies.

Recording those outputs onchain enables:

-   verifiable AI decisions
-   transparent strategy history
-   reproducible allocations
-   auditable financial agents

xPilot explores how AI-generated strategies can be paired with
blockchain infrastructure to provide transparency and accountability.

------------------------------------------------------------------------

## Current MVP Scope

The current prototype supports:

-   natural language portfolio generation
-   AI reasoning display
-   onchain portfolio storage
-   portfolio history retrieval
-   autopilot recommendation panel

Future iterations may explore:

-   wallet integration
-   live market data feeds
-   automated portfolio rebalancing
-   multi-chain support

------------------------------------------------------------------------

## License

MIT
