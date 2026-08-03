import type { ProviderId } from "../pages/types";
import { PROVIDER_LIST } from "../providers/registry";

interface ProviderSelectorProps {
  value: ProviderId;
  onChange: (id: ProviderId) => void;
}

export function ProviderSelector({ value, onChange }: ProviderSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ProviderId)}
      aria-label="Choose a shortening provider"
      className="h-11 rounded-xl border border-line bg-surface px-3 text-sm font-medium text-ink outline-none transition"
    >
      {PROVIDER_LIST.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
