"use client";

import { useEffect, useState } from "react";
import { generatePortfolio } from "../lib/api";
import { PortfolioResponse } from "../lib/types";

export default function PromptBox({
  onResult,
  onLoadingChange,
  onError,
  preset,
}: {
  onResult: (portfolio: PortfolioResponse, prompt: string) => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (message: string | null) => void;
  preset?: {
    prompt: string;
    risk: string;
    key: number;
  } | null;
}) {
  const [prompt, setPrompt] = useState("");
  const [risk, setRisk] = useState("medium");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!preset) return;
    setPrompt(preset.prompt);
    setRisk(preset.risk);
  }, [preset?.key, preset?.prompt, preset?.risk]);

  async function handleSubmit() {
    if (!prompt.trim()) return;

    setLoading(true);
    onLoadingChange?.(true);
    onError?.(null);

    try {
      const portfolio = await generatePortfolio(prompt, risk);
      onResult(portfolio, prompt);
    } catch (err) {
      console.error(err);
      onError?.("Portfolio generation failed. Please try again.");
    }

    setLoading(false);
    onLoadingChange?.(false);
  }

  return (
    <div className="space-y-4 border rounded-xl p-6 shadow-sm bg-white">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Investment Prompt
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 min-h-[120px] bg-white text-gray-900 placeholder:text-gray-400"
          placeholder="Example: Invest in AI leaders with moderate risk"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Risk Profile
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Portfolio"}
      </button>
    </div>
  );
}
