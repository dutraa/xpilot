import Link from 'next/link';
import { PromptForm } from '@/components/PromptForm';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(to_bottom,_#020617,_#020617)]">
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
              xPilot • AI Advisor for Tokenized Stocks
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white md:text-6xl">
              xStocks put equities onchain. xPilot makes them autonomous.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Turn a natural-language investing goal into a non-custodial strategy profile with explainable recommendations, risk guardrails, and future rebalance suggestions.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="hidden rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-500 lg:inline-flex"
          >
            Open dashboard
          </Link>
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <Feature title="Non-custodial" body="Users stay in control. xPilot advises; the wallet owner executes." />
          <Feature title="Risk-aware" body="Guardrails cap concentration and keep portfolios inside defined profiles." />
          <Feature title="Multi-agent ready" body="The architecture is intentionally designed to evolve into specialized agent collaboration later." />
        </div>

        <PromptForm />
      </section>
    </main>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
    </div>
  );
}
