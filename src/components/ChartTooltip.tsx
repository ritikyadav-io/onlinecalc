interface TooltipPayloadItem {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
  payload?: { fill?: string } & Record<string, unknown>;
}

interface Props {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  /** Format the numeric value (e.g. currency, percent). */
  formatValue?: (v: number, name?: string) => string;
  /** Optional title shown above the label (e.g. "Year 5"). */
  titlePrefix?: string;
  /** Override the per-row label (defaults to dataKey/name). */
  labelMap?: Record<string, string>;
}

/**
 * Pretty, theme-aware Recharts tooltip used across every chart calculator
 * for a consistent, interactive feel — bold value, dot swatch, soft shadow.
 */
const ChartTooltip = ({ active, payload, label, formatValue, titlePrefix, labelMap }: Props) => {
  if (!active || !payload || !payload.length) return null;
  const fmt = formatValue ?? ((v: number) => v.toLocaleString());

  return (
    <div
      role="tooltip"
      className="rounded-xl border border-border bg-popover/95 backdrop-blur-sm shadow-xl px-3 py-2 text-popover-foreground"
      style={{ minWidth: 120 }}
    >
      {label != null && (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          {titlePrefix ? `${titlePrefix} ${label}` : label}
        </p>
      )}
      <div className="space-y-1">
        {payload.map((p, i) => {
          const key = String(p.dataKey ?? p.name ?? i);
          const name = labelMap?.[key] ?? (p.name as string) ?? key;
          const v = typeof p.value === "number" ? p.value : Number(p.value ?? 0);
          return (
            <div key={i} className="flex items-center gap-2 text-[13px]">
              <span
                aria-hidden
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: (p.color as string) || (p.payload as { fill?: string })?.fill || "currentColor" }}
              />
              <span className="text-muted-foreground">{name}</span>
              <span className="ml-auto font-bold text-foreground">{fmt(v, name)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartTooltip;
