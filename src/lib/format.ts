/** Indian-style ₹ formatter used across calculators (no decimals). */
export const inr = (n: number) =>
  `₹${Math.round(n).toLocaleString("en-IN")}`;

/** ₹ with 2 decimals for tax / GST type outputs. */
export const inr2 = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Plain percent. */
export const pct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

/** Compact ₹ for chart axes (e.g. ₹1.2L, ₹3Cr). */
export const inrCompact = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1e7) return `₹${(n / 1e7).toFixed(abs >= 1e8 ? 0 : 1)}Cr`;
  if (abs >= 1e5) return `₹${(n / 1e5).toFixed(abs >= 1e6 ? 0 : 1)}L`;
  if (abs >= 1e3) return `₹${(n / 1e3).toFixed(0)}k`;
  return `₹${Math.round(n)}`;
};

/** Parse a YYYY-MM-DD input value as a local date (avoids the UTC offset bug). */
export const parseLocalDate = (iso: string): Date | null => {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  }
  const [, y, mo, d] = m;
  const date = new Date(Number(y), Number(mo) - 1, Number(d));
  return isNaN(date.getTime()) ? null : date;
};
