interface ComparisonTableProps {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}

const ComparisonTable = ({ title, headers, rows, caption }: ComparisonTableProps) => (
  <section aria-label={title} className="mt-8">
    <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-3 sm:px-4 py-3 text-[13px] font-semibold text-foreground whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border">
                {r.map((c, j) => (
                  <td
                    key={j}
                    className={`px-3 sm:px-4 py-3 align-top text-[13px] sm:text-[14px] ${
                      j === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p className="px-4 py-3 text-[12px] text-muted-foreground border-t border-border">{caption}</p>
      )}
    </div>
  </section>
);

export default ComparisonTable;
