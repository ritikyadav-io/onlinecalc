import { useNavigate } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  to: string;
  color?: string;
  index?: number;
}

export const getToolMetadata = (title: string): { category: string; popular: boolean } => {
  const t = title.toLowerCase();
  let category = "Finance";
  let popular = false;

  if (t.includes("emi") || t.includes("loan") || t.includes("rent vs buy")) {
    category = "Loans";
    popular = t.includes("emi") || t.includes("loan");
  } else if (t.includes("gst") || t.includes("tax") || t.includes("hra")) {
    category = "Tax";
    popular = t.includes("gst") || t.includes("tax");
  } else if (t.includes("sip") || t.includes("fd") || t.includes("ppf") || t.includes("compound")) {
    category = "Investment";
    popular = t.includes("sip") || t.includes("fd");
  } else if (t.includes("bmi") || t.includes("calorie") || t.includes("ovulation")) {
    category = "Health";
    popular = t.includes("bmi");
  } else if (t.includes("salary")) {
    category = "Salary";
    popular = true;
  } else if (t.includes("attendance") || t.includes("marks") || t.includes("cgpa") || t.includes("backlog") || t.includes("bunk")) {
    category = "Student";
    popular = t.includes("cgpa") || t.includes("attendance");
  }

  return { category, popular };
};

const ToolCard = ({ icon: Icon, title, subtitle, to, color = "text-primary", index = 0 }: ToolCardProps) => {
  const navigate = useNavigate();
  const { category, popular } = getToolMetadata(title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.012, duration: 0.2 }}
      className={`relative group bg-card border border-border/75 hover:border-primary/45 rounded-[16px] sm:rounded-[20px] p-3 sm:p-4 flex flex-col justify-between h-[135px] sm:h-[160px] cursor-pointer shadow-sm hover:shadow-md transition-all duration-250 active:scale-[0.99] ${
        popular ? "ring-1 ring-primary/10" : ""
      }`}
      onClick={() => navigate(to)}
    >
      {/* Top Row: Icon (Left) & Single Badge (Right) */}
      <div className="flex items-center justify-between w-full shrink-0">
        <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors shrink-0">
          <Icon className={`${color} w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] group-hover:scale-105 transition-transform`} />
        </div>
        <span className={`text-[8px] sm:text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full border shrink-0 ${
          popular ? "bg-primary/15 text-primary border-primary/20" : "bg-secondary text-muted-foreground/80 border-border/20"
        }`}>
          {popular ? "Popular" : category}
        </span>
      </div>

      {/* Center Row: Name (Centered) & Description */}
      <div className="flex-1 flex flex-col justify-center min-w-0 py-0.5 text-left">
        <p className="text-[13px] sm:text-[15px] font-extrabold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </p>
        <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-normal mt-0.5 line-clamp-1 sm:line-clamp-2">
          {subtitle}
        </p>
      </div>

      {/* Bottom Row: CTA Arrow (Bottom Right) */}
      <div className="flex justify-end w-full shrink-0">
        <div className="p-1 sm:p-1.5 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
          <ArrowRight className="w-2.5 h-2.5 sm:w-[13px] sm:h-[13px] group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;
