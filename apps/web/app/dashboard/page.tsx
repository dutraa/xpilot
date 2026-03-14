const currentAllocation = [
  { symbol: 'NVDAx', current: 39, target: 35 },
  { symbol: 'MSFTx', current: 24, target: 25 },
  { symbol: 'METAx', current: 18, target: 20 },
  { symbol: 'GOOGLx', current: 19, target: 20 }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Dashboard</p>
            <h1 className="text-4xl font-black text-white">AI Growth Portfolio</h1>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            Autopilot advisory active
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Target vs current allocation</h2>
              <button className="rounded-2xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Simulate rebalance</button>
            </div>

            <div className="space-y-3">
              {currentAllocation.map((item) => (
                <div key={item.symbol} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-white">{item.symbol}</span>
                    <span className="text-sm text-slate-400">Drift {item.current - item.target > 0 ? '+' : ''}{item.current - item.target}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                    <div>Current: <span className="font-semibold text-white">{item.current}%</span></div>
                    <div>Target: <span className="font-semibold text-white">{item.target}%</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Latest rationale</p>
              <h3 className="mt-2 text-xl font-bold text-white">Why xPilot suggests a rebalance</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                NVIDIA has outperformed the rest of the basket and drifted 4% above its target allocation. A rebalance would reduce concentration while preserving the portfolio&apos;s moderate-risk profile.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Execution log</p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-slate-950/70 p-4">Portfolio profile created on Sepolia</div>
                <div className="rounded-2xl bg-slate-950/70 p-4">Weekly review window opened</div>
                <div className="rounded-2xl bg-slate-950/70 p-4">Simulated rebalance available for approval</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
