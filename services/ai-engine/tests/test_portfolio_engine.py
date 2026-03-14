from app.portfolio_engine import build_portfolio, normalize_risk, select_strategy


def test_normalize_risk():
    assert normalize_risk("low") == "low"
    assert normalize_risk("conservative") == "low"
    assert normalize_risk("aggressive") == "high"
    assert normalize_risk("medium") == "medium"


def test_select_strategy_ai():
    assert select_strategy("Invest in AI leaders") == "ai_growth"


def test_select_strategy_tech():
    assert select_strategy("Build a tech portfolio") == "tech_leaders"


def test_select_strategy_defensive():
    assert select_strategy("Make me a safe portfolio") == "defensive"


def test_build_portfolio_shape():
    portfolio = build_portfolio("Invest in AI leaders", "medium")

    assert portfolio["strategy"] == "AI Growth"
    assert portfolio["risk"] == "medium"
    assert len(portfolio["assets"]) == 4
    assert sum(asset["weight"] for asset in portfolio["assets"]) == 100
    assert len(portfolio["explanation"]) > 0
