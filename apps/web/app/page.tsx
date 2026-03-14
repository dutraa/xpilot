"use client";

import { useState } from "react";
import PromptBox from "../components/PromptBox";
import PortfolioCard from "../components/PortfolioCard";
import SavedPortfolioHistory from "../components/SavedPortfolioHistory";
import StatusPanel from "../components/StatusPanel";
import PromptPresets from "../components/PromptPresets";
import AutopilotPanel from "../components/AutopilotPanel";
import { LoadedPortfolioFromChain, PortfolioResponse } from "../lib/types";

export default function Home() {
  const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);
  const [lastPrompt, setLastPrompt] = useState("");
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  const [loadedPortfolioId, setLoadedPortfolioId] = useState<string | null>(
    null
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedPreset, setSelectedPreset] = useState<
    | {
        prompt: string;
        risk: string;
        key: number;
      }
    | null
  >(null);

  const showLoadingBanner = isGenerating || isSaving;

  function handleResetDemoState() {
    setPortfolio(null);
    setLastPrompt("");
    setLoadedPortfolioId(null);
    setErrorMessage(null);
    setIsGenerating(false);
    setIsSaving(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="mb-4">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">xPilot</h1>
          <p className="text-lg text-gray-800">AI Advisor for Tokenized Stocks</p>
          <p className="text-sm text-gray-700 mt-2">
            Turn a natural-language investing goal into a structured xStocks portfolio.
          </p>
        </div>

        <StatusPanel />

        <PromptPresets
          onSelectPreset={(preset) => {
            setSelectedPreset({
              ...preset,
              key: Date.now(),
            });
          }}
        />

        <div className="flex justify-end">
          <button
            onClick={handleResetDemoState}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            Reset Demo State
          </button>
        </div>

        {showLoadingBanner && (
          <div className="rounded-lg border bg-yellow-50 p-4 text-sm text-yellow-900">
            {isGenerating && "xPilot is generating a portfolio recommendation..."}
            {!isGenerating && isSaving &&
              "xPilot is saving the portfolio onchain..."}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-lg border bg-red-50 p-4 text-sm text-red-900">
            {errorMessage}
          </div>
        )}

        <PromptBox
          preset={selectedPreset}
          onResult={(result: PortfolioResponse, prompt: string) => {
            setPortfolio(result);
            setLastPrompt(prompt);
            setLoadedPortfolioId(null);
            setErrorMessage(null);
          }}
          onLoadingChange={setIsGenerating}
          onError={setErrorMessage}
        />

        {loadedPortfolioId && (
          <div className="rounded-lg border bg-blue-50 p-4 text-sm">
            Loaded saved onchain portfolio #{loadedPortfolioId} into the main view.
          </div>
        )}

        {portfolio && (
          <>
            <PortfolioCard
              portfolio={portfolio}
              prompt={lastPrompt}
              onSaved={() => setHistoryRefreshKey((prev) => prev + 1)}
              onSaveLoadingChange={setIsSaving}
              onSaveError={setErrorMessage}
            />
            <AutopilotPanel portfolio={portfolio} />
          </>
        )}

        <SavedPortfolioHistory
          key={historyRefreshKey}
          onLoadPortfolio={(loaded: LoadedPortfolioFromChain) => {
            setPortfolio(loaded.portfolio);
            setLastPrompt(loaded.prompt);
            setLoadedPortfolioId(loaded.savedPortfolioId);
            setErrorMessage(null);
          }}
        />
      </div>
    </main>
  );
}
