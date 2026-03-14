from app.strategy import generate_recommendation


def test_ai_prompt_returns_ai_growth() -> None:
    result = generate_recommendation("Invest in AI leaders", 1000, "moderate")
    assert result["strategy"] == "AI Growth"
    assert len(result["assets"]) == 4


def test_low_risk_returns_balanced() -> None:
    result = generate_recommendation("Build a conservative basket", 1000, "low")
    assert result["strategy"] == "Balanced Blue Chips"
