from typing import Literal

RiskLevel = Literal["low", "moderate", "high"]

AI_SET = ["NVDAx", "MSFTx", "METAx", "GOOGLx"]
BALANCED_SET = ["AAPLx", "MSFTx", "AMZNx", "SPYx"]
HIGH_BETA_SET = ["NVDAx", "TSLAx", "METAx", "AMZNx"]


def _weights_for_risk(risk: RiskLevel) -> list[int]:
    if risk == "low":
        return [25, 25, 20, 30]
    if risk == "high":
        return [40, 20, 20, 20]
    return [35, 25, 20, 20]


def _pick_strategy(prompt: str, risk: RiskLevel) -> tuple[str, list[str], list[str]]:
    lower = prompt.lower()

    if "ai" in lower or "artificial intelligence" in lower:
        return (
            "AI Growth",
            AI_SET,
            [
                "Selected large-cap AI leaders with strong infrastructure and platform exposure.",
                "Focused on familiar, liquid names suited for a hackathon MVP portfolio.",
            ],
        )

    if "safe" in lower or "conservative" in lower or risk == "low":
        return (
            "Balanced Blue Chips",
            BALANCED_SET,
            [
                "Tilted toward diversified mega-cap exposure and broad-market balance.",
                "Included SPYx to reduce single-name concentration.",
            ],
        )

    return (
        "Momentum Tilt",
        HIGH_BETA_SET,
        [
            "Selected higher-beta large-cap names for a stronger growth tilt.",
            "Maintained a four-asset cap to keep concentration understandable.",
        ],
    )


def generate_recommendation(prompt: str, amount: float, risk: RiskLevel) -> dict:
    strategy, symbols, base_reasoning = _pick_strategy(prompt, risk)
    weights = _weights_for_risk(risk)

    reasoning = base_reasoning + [
        f"Applied the {risk} risk profile with a maximum single-name weight of {max(weights)}%.",
        "This recommendation is advisory only and assumes the user keeps execution control.",
    ]

    assets = [{"symbol": symbol, "weight": weight} for symbol, weight in zip(symbols, weights)]

    return {
        "strategy": strategy,
        "risk": risk,
        "amount": amount,
        "assets": assets,
        "reasoning": reasoning,
        "rebalanceTrigger": "Review weekly or when any position drifts by more than 5%.",
    }
