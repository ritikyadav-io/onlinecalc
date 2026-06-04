import { Plus } from "lucide-react";

interface FAQSectionProps {
  items: { q: string; a: string }[];
}

const FAQSection = ({ items }: FAQSectionProps) => (
  <section className="mt-6 sm:mt-10 space-y-6">
    <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-tight text-foreground">Frequently Asked Questions</h2>
    <div className="space-y-2">
      {items.map((item, i) => (
        <details key={i} className="bg-card rounded-xl border border-border group overflow-hidden transition-all duration-200">
          <summary className="text-[15px] font-bold text-foreground p-4 cursor-pointer list-none flex items-center justify-between hover:bg-secondary/50 transition-colors">
            <span>{item.q}</span>
            <Plus size={16} className="text-muted-foreground group-open:rotate-45 transition-transform shrink-0 ml-2" />
          </summary>
          <div className="text-[14px] text-muted-foreground px-4 pb-4 pt-1 leading-relaxed border-t border-border/50">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  </section>
);

export default FAQSection;
