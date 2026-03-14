"use client";

import { useState } from "react";
import { PortfolioResponse, SavedPortfolio } from "../lib/types";

export default function PortfolioCard({
  portfolio,
  prompt,
  onSaved,
  onSaveLoadingChange,
  onSaveError,
}: {
  portfolio: PortfolioResponse;
  prompt: string;
  onSaved?: () => void;
  onSaveLoadingChange?: (loading: boolean) => void;
  onSaveError?: (message: string | null) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<
    | null
    | {
        txHash: string;
        blockNumber: string;
        portfolioId: string | null;
      }
  >(null);
  const [savedPortfolio, setSavedPortfolio] = useState<SavedPortfolio | null>(
    null
  );

  async function handleSave() {
    setSaving(true);
    setSaveResult(null);
    setSavedPortfolio(null);
    onSaveLoadingChange?.(true);
    onSaveError?.(null);

    try {
      const response = await fetch("/api/save-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          strategy: portfolio.strategy,
          risk: portfolio.risk,
          assets: portfolio.assets,
        }),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      const data = await response.json();

      setSaveResult({
        txHash: data.txHash,
        blockNumber: data.blockNumber,
        portfolioId: data.portfolioId,
      });

      if (data.portfolioId !== null) {
        const readResponse = await fetch(
          `/api/get-portfolio/${data.portfolioId}`
        );

        if (!readResponse.ok) {
          throw new Error("Readback failed");
        }

        const readData = await readResponse.json();
        setSavedPortfolio(readData.portfolio);

        if (onSaved) {
          onSaved();
        }
      }
    } catch (error) {
      console.error(error);
      onSaveError?.("Saving portfolio onchain failed. Please try again.");
    }

    setSaving(false);
    onSaveLoadingChange?.(false);
  }

  return (
    <div className="border rounded-xl p-6 mt-6 shadow-sm bg-white space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-600 mb-2">
          AI Advisor Output
        </p>
        <h2 className="text-2xl font-bold text-gray-900">{portfolio.strategy}</h2>
        <p className="text-sm text-gray-700 mt-1">
          Risk Profile: <span className="font-medium capitalize">{portfolio.risk}</span>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Allocations</h3>
        <div className="space-y-2">
          {portfolio.assets.map((asset) => (
            <div key={asset.symbol} className="space-y-1 border-b py-3">
              <div className="flex justify-between text-sm text-gray-800">
                <span className="font-medium">{asset.symbol}</span>
                <span>{asset.weight}%</span>
              </div>

              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-black"
                  style={{ width: `${asset.weight}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Agent Reasoning
        </h3>
        <div className="rounded-lg border bg-gray-50 p-4">
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
            {portfolio.explanation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {saving ? "Saving Onchain..." : "Save Portfolio Onchain"}
        </button>
      </div>

      {saveResult && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm space-y-1">
          <p className="font-semibold text-green-900">
            Portfolio saved successfully
          </p>
          <p className="text-gray-800">
            Portfolio ID: {saveResult.portfolioId ?? "Unavailable"}
          </p>
          <p className="text-gray-800">Block: {saveResult.blockNumber}</p>
          <p className="break-all text-gray-800">Tx: {saveResult.txHash}</p>
        </div>
      )}

      {savedPortfolio && (
        <div className="rounded-lg border bg-white p-4 text-sm space-y-3 text-gray-800">
          <p className="font-semibold text-base">Saved Onchain Record</p>
          <p>
            <span className="font-medium text-gray-900">ID:</span> {savedPortfolio.id}
          </p>
          <p>
            <span className="font-medium text-gray-900">Strategy:</span>{" "}
            {savedPortfolio.strategy}
          </p>
          <p>
            <span className="font-medium text-gray-900">Risk:</span> {savedPortfolio.risk}
          </p>
          <p className="break-all">
            <span className="font-medium text-gray-900">Owner:</span> {savedPortfolio.owner}
          </p>
          <p>
            <span className="font-medium text-gray-900">Prompt:</span> {savedPortfolio.prompt}
          </p>

          <div>
            <p className="font-medium mb-2 text-gray-900">Saved Allocations</p>
            <div className="space-y-2">
              {savedPortfolio.assets.map((asset, index) => (
                <div
                  key={`${asset}-${index}`}
                  className="space-y-1 border-b py-3"
                >
                  <div className="flex justify-between text-sm text-gray-800">
                    <span className="font-medium">{asset}</span>
                    <span>{savedPortfolio.weights[index]}%</span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-black"
                      style={{ width: `${savedPortfolio.weights[index]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
