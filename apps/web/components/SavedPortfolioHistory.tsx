"use client";

import { useEffect, useState } from "react";
import { LoadedPortfolioFromChain, SavedPortfolio } from "../lib/types";

export default function SavedPortfolioHistory({
  onLoadPortfolio,
}: {
  onLoadPortfolio?: (loaded: LoadedPortfolioFromChain) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState<string>("");
  const [portfolios, setPortfolios] = useState<SavedPortfolio[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        setNotice(null);

        const idsResponse = await fetch("/api/portfolios-by-owner");

        if (!idsResponse.ok) {
          throw new Error("Failed to fetch portfolio IDs");
        }

        const idsData = await idsResponse.json();
        setOwner(idsData.owner);

        const portfolioIds: string[] = idsData.portfolioIds || [];

        const results = await Promise.all(
          portfolioIds.map(async (id) => {
            try {
              const response = await fetch(`/api/get-portfolio/${id}`);

              if (!response.ok) {
                return null;
              }

              const data = await response.json();

              if (!data.success || !data.portfolio) {
                return null;
              }

              return data.portfolio as SavedPortfolio;
            } catch {
              return null;
            }
          })
        );

        const loaded = results.filter(Boolean) as SavedPortfolio[];

        const sorted = [...loaded].sort((a, b) => Number(b.id) - Number(a.id));

        if (portfolioIds.length > 0 && sorted.length < portfolioIds.length) {
          setNotice(
            "Some saved portfolio IDs were not available on the current local chain and were skipped."
          );
        }

        setPortfolios(sorted);
      } catch (error) {
        console.error(error);
        setNotice("Saved portfolio history could not be fully loaded.");
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  function handleLoad(portfolio: SavedPortfolio) {
    if (!onLoadPortfolio) return;

    onLoadPortfolio({
      prompt: portfolio.prompt,
      savedPortfolioId: portfolio.id,
      portfolio: {
        strategy: portfolio.strategy,
        risk: portfolio.risk,
        assets: portfolio.assets.map((symbol, index) => ({
          symbol,
          weight: portfolio.weights[index],
        })),
        explanation: [
          "Loaded from saved onchain portfolio history.",
          `Portfolio ID ${portfolio.id} was retrieved from the local registry.`,
          "This view reflects the chain-confirmed allocation previously saved by xPilot.",
        ],
      },
    });
  }

  return (
    <div className="border rounded-xl p-6 mt-6 shadow-sm bg-white space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Saved Portfolio History</h2>
        {owner && (
          <p className="text-sm text-gray-700 mt-1 break-all">Owner: {owner}</p>
        )}
      </div>

      {notice && (
        <div className="rounded-lg border bg-amber-50 p-3 text-sm text-amber-900">
          {notice}
        </div>
      )}

      {loading && (
        <p className="text-sm text-gray-600">Loading saved portfolios...</p>
      )}

      {!loading && portfolios.length === 0 && (
        <p className="text-sm text-gray-600">
          No saved onchain portfolios available on the current local chain.
        </p>
      )}

      {!loading && portfolios.length > 0 && (
        <div className="space-y-4">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="rounded-lg border p-4 space-y-3 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900">
                  Portfolio #{portfolio.id}
                </p>
                <p className="text-sm text-gray-700 capitalize">
                  {portfolio.risk}
                </p>
              </div>

              <p className="text-sm text-gray-800">
                <span className="font-medium">Strategy:</span> {portfolio.strategy}
              </p>

              <p className="text-sm text-gray-800">
                <span className="font-medium">Prompt:</span> {portfolio.prompt}
              </p>

              <div>
                <p className="text-sm font-medium mb-1">Allocations</p>
                <div className="space-y-1">
                  {portfolio.assets.map((asset, index) => (
                    <div
                      key={`${portfolio.id}-${asset}-${index}`}
                      className="flex justify-between text-sm"
                    >
                      <span>{asset}</span>
                      <span>{portfolio.weights[index]}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => handleLoad(portfolio)}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Load into Main View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
