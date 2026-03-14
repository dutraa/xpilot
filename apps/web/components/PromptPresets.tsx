"use client";

const PRESETS = [
  {
    label: "AI Leaders",
    prompt: "Invest in AI leaders",
    risk: "medium",
  },
  {
    label: "Tech Giants",
    prompt: "Build a tech leaders portfolio",
    risk: "high",
  },
  {
    label: "Safe Portfolio",
    prompt: "Build a safe portfolio",
    risk: "low",
  },
  {
    label: "Balanced Default",
    prompt: "Build me something solid",
    risk: "medium",
  },
];

export default function PromptPresets({
  onSelectPreset,
}: {
  onSelectPreset: (preset: { prompt: string; risk: string }) => void;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Prompt Presets</h2>
        <p className="text-sm text-gray-700 mt-1">
          Quick demo inputs for common xPilot portfolio scenarios.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => onSelectPreset(preset)}
            className="rounded-lg border bg-gray-50 px-4 py-3 text-left hover:bg-gray-100"
          >
            <p className="font-medium text-gray-900">{preset.label}</p>
            <p className="text-sm text-gray-800 mt-1">{preset.prompt}</p>
            <p className="text-xs text-gray-600 mt-2 capitalize">
              Risk: {preset.risk}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
