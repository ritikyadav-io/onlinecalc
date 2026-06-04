import { useNavigate } from "react-router-dom";
import { mainTools, moreTools } from "@/lib/tools";

interface RelatedToolsProps {
  currentPath: string;
  count?: number;
}

const RelatedTools = ({ currentPath, count = 4 }: RelatedToolsProps) => {
  const navigate = useNavigate();
  const all = [...mainTools, ...moreTools].filter((t) => t.to !== currentPath);
  const related = all.sort(() => Math.random() - 0.5).slice(0, count);

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-3">Related Tools</p>
      <div className="grid grid-cols-2 gap-3">
        {related.map((t) => (
          <button
            key={t.to}
            onClick={() => navigate(t.to)}
            className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow text-left"
          >
            <t.icon size={20} className={t.color} />
            <div className="min-w-0">
              <p className="text-base font-medium text-foreground truncate">{t.title}</p>
              <p className="text-sm text-muted-foreground truncate">{t.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
