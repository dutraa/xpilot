import type { Recommendation } from '@/lib/types';

export function PortfolioCard({ recommendation }: { recommendation: Recommendation }) {
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

      <div className="mt-6">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-400">Why this portfolio</p>
        <ul className="space-y-2 text-sm text-slate-300">
          {recommendation.reasoning.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
        <span className="font-semibold text-white">Rebalance trigger:</span> {recommendation.rebalanceTrigger}
      </div>
    </div>
  );
}
