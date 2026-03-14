import { PortfolioResponse } from "../lib/types";

function buildRecommendation(portfolio: PortfolioResponse) {
  const assetCount = portfolio.assets.length;
  const topAsset = portfolio.assets[0];

  return {
    status: "Active",
    cadence: "Weekly review",
    driftThreshold: "5%",
    nextAction:
      portfolio.risk === "high"
        ? `Monitor ${topAsset.symbol} closely and rebalance if concentration increases beyond target.`
        : portfolio.risk === "low"
        ? "Maintain defensive posture and only rebalance when drift exceeds threshold."
        : `Hold current allocation and review whether ${topAsset.symbol} remains aligned with medium-risk objectives.`,
    guardrails: [
      `Keep total portfolio limited to ${assetCount} supported xStocks positions.`,
      "Do not allow a single position to drift materially above target allocation.",
      "Re-evaluate strategy if user risk preference changes.",
    ],
  };
}

export default function AutopilotPanel({
  portfolio,
}: {
  portfolio: PortfolioResponse;
}) {
  const recommendation = buildRecommendation(portfolio);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Autopilot Recommendation</h2>
        <p className="text-sm text-gray-700 mt-1">
          What xPilot would do next if this strategy remained active.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-600">Status</p>
          <p className="mt-1 font-semibold text-gray-900">
            {recommendation.status}
          </p>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-600">
            Rebalance Cadence
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {recommendation.cadence}
          </p>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-600">
            Drift Threshold
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {recommendation.driftThreshold}
          </p>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-600">
            Risk Mode
          </p>
          <p className="mt-1 font-semibold text-gray-900 capitalize">
            {portfolio.risk}
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-gray-50 p-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">
          Next Recommended Action
        </p>
        <p className="text-sm text-gray-800">{recommendation.nextAction}</p>
      </div>

      <div className="rounded-lg border bg-gray-50 p-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">
          Risk Guardrails
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
          {recommendation.guardrails.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
