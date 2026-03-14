'use client';

import { useState } from 'react';
import type { Recommendation, RiskLevel } from '@/lib/types';
import { demoRecommendation } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_AI_API_URL ?? 'http://localhost:8000';

export function PromptForm() {
  const [prompt, setPrompt] = useState('Invest $1,000 into AI companies with moderate risk.');
  const [amount, setAmount] = useState(1000);
  const [risk, setRisk] = useState<RiskLevel>('moderate');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, amount, risk })
      });

      if (!res.ok) {
        throw new Error('Recommendation service unavailable.');
      }

      const data = (await res.json()) as Recommendation;
      setRecommendation(data);
    } catch (err) {
      console.error(err);
      setRecommendation({ ...demoRecommendation, amount, risk });
      setError('Using local demo recommendation because the API was unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">xPilot Input</p>
          <h2 className="text-3xl font-bold text-white">Turn a plain-English goal into a portfolio</h2>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-slate-300">Investment Prompt</span>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-36 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-300">Amount (USD)</span>
            <input
              type="number"
              min={100}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-300">Risk</span>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value as RiskLevel)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 disabled:opacity-60"
        >
          {loading ? 'Generating…' : 'Generate Portfolio'}
        </button>

        {error ? <p className="mt-4 text-sm text-amber-300">{error}</p> : null}
      </form>

      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-950/40 to-slate-950 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">What xPilot does</p>
        <h3 className="mt-2 text-2xl font-bold text-white">AI advisor, not custody</h3>
        <div className="mt-6 space-y-4 text-slate-300">
          <div className="rounded-2xl bg-slate-900/70 p-4">1. Analyze user goal</div>
          <div className="rounded-2xl bg-slate-900/70 p-4">2. Build risk-aware xStocks allocation</div>
          <div className="rounded-2xl bg-slate-900/70 p-4">3. Suggest future rebalances</div>
          <div className="rounded-2xl bg-slate-900/70 p-4">4. Keep the wallet owner in control</div>
        </div>

        {recommendation ? (
          <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-200">
            Recommendation ready. Scroll down to review it.
          </div>
        ) : null}
      </div>

      {recommendation ? (
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Recommendation Preview</h3>
            <a href="/dashboard" className="text-sm text-blue-300 underline underline-offset-4">
              View dashboard shell
            </a>
          </div>
          <div className="max-w-3xl">
            <PortfolioCard recommendation={recommendation} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PortfolioCard({ recommendation }: { recommendation: Recommendation }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Strategy</p>
          <h3 className="text-2xl font-bold text-white">{recommendation.strategy}</h3>
        </div>
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
          {recommendation.risk}
        </span>
      </div>
      <div className="space-y-3">
        {recommendation.assets.map((asset) => (
          <div key={asset.symbol} className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3">
            <span className="font-medium text-slate-200">{asset.symbol}</span>
            <span className="text-lg font-semibold text-white">{asset.weight}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
