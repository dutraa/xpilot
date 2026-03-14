from typing import List, Dict


SUPPORTED_ASSETS = [
    "AAPLx",
    "NVDAx",
    "MSFTx",
    "GOOGLx",
    "METAx",
    "TSLAx",
    "AMZNx",
    "SPYx",
]


STRATEGY_PROFILES = {
    "ai_growth": {
        "name": "AI Growth",
        "assets": ["NVDAx", "MSFTx", "METAx", "GOOGLx"],
        "description": "Focuses on large-cap companies with strong AI exposure.",
    },
    "tech_leaders": {
        "name": "Tech Leaders",
        "assets": ["AAPLx", "MSFTx", "GOOGLx", "AMZNx"],
        "description": "Broad exposure to major technology leaders.",
    },
    "defensive": {
        "name": "Defensive",
        "assets": ["SPYx", "AAPLx", "MSFTx"],
        "description": "A lower-volatility portfolio anchored by broad market exposure.",
    },
    "balanced": {
        "name": "Balanced Blue Chips",
        "assets": ["SPYx", "AAPLx", "MSFTx", "NVDAx"],
        "description": "Blends broad market exposure with large-cap growth.",
    },
}


def normalize_risk(risk: str) -> str:
    risk = (risk or "medium").strip().lower()

    if risk in ["low", "conservative", "safe"]:
        return "low"

    if risk in ["high", "aggressive"]:
        return "high"

    return "medium"


def select_strategy(prompt: str) -> str:
    prompt = prompt.lower()

    if any(term in prompt for term in ["ai", "artificial intelligence", "machine learning"]):
        return "ai_growth"

    if any(term in prompt for term in ["tech", "technology", "big tech"]):
        return "tech_leaders"

    if any(term in prompt for term in ["safe", "defensive", "low risk", "conservative"]):
        return "defensive"

    return "balanced"


def allocate_weights(assets: List[str], risk: str) -> List[int]:
    count = len(assets)

    if count == 3:
        if risk == "low":
            return [50, 25, 25]
        if risk == "high":
            return [20, 40, 40]
        return [40, 30, 30]

    if count == 4:
        if risk == "low":
            return [40, 20, 20, 20]
        if risk == "high":
            return [40, 25, 20, 15]
        return [30, 25, 25, 20]

    base = 100 // count
    weights = [base for _ in range(count)]
    weights[0] += 100 - sum(weights)
    return weights


def generate_explanation(
    strategy_name: str,
    strategy_description: str,
    risk: str,
    assets: List[str],
) -> List[str]:
    return [
        f"Selected strategy: {strategy_name}.",
        strategy_description,
        f"Risk profile normalized to {risk}.",
        f"Portfolio includes {len(assets)} supported xStocks assets.",
        "Weights were assigned using deterministic xPilot portfolio rules.",
    ]


def build_portfolio(prompt: str, risk: str = "medium") -> Dict:
    normalized_risk = normalize_risk(risk)
    strategy_key = select_strategy(prompt)
    strategy = STRATEGY_PROFILES[strategy_key]
    assets = strategy["assets"]
    weights = allocate_weights(assets, normalized_risk)

    portfolio_assets = []

    for symbol, weight in zip(assets, weights):
        portfolio_assets.append({
            "symbol": symbol,
            "weight": weight,
        })

    return {
        "strategy": strategy["name"],
        "risk": normalized_risk,
        "assets": portfolio_assets,
        "explanation": generate_explanation(
            strategy["name"],
            strategy["description"],
            normalized_risk,
            assets,
        ),
    }
