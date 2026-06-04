import { Sparkles, Lightbulb, BookOpen, ListChecks } from "lucide-react";

export interface AboutCalculatorProps {
  /** Short paragraph that explains what the calculator does and who it's for. */
  intro: string;
  /** The exact formula or method, in plain language plus an inline code form. */
  formula?: { label: string; expression: string; explanation?: string };
  /** Bulleted "How to use" steps. */
  howToUse?: string[];
  /** Bulleted insights — "what your result really means". */
  whatItMeans?: string[];
  /** Pro tips, common mistakes, expert-style advice. */
  tips?: string[];
  /** "People also ask" — semantic long-tail keyword coverage. */
  alsoAsk?: { q: string; a: string }[];
}

const Section = ({ icon: Icon, title, children }: { icon: typeof Sparkles; title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
      <Icon size={16} className="text-primary" />
      {title}
    </h3>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const AboutCalculator = ({ intro, formula, howToUse, whatItMeans, tips, alsoAsk }: AboutCalculatorProps) => {
  return (
    <section className="bg-card rounded-2xl border border-border p-5 space-y-5 mt-2" aria-label="About this calculator">
      <Section icon={BookOpen} title="About this calculator">
        <p>{intro}</p>
      </Section>

      {formula && (
        <Section icon={Sparkles} title="Formula used">
          <p className="font-medium text-foreground">{formula.label}</p>
          <code className="block mt-1 px-3 py-2 rounded-lg bg-muted/40 text-xs text-foreground font-mono break-all">
            {formula.expression}
          </code>
          {formula.explanation && <p className="mt-2">{formula.explanation}</p>}
        </Section>
      )}

      {howToUse && howToUse.length > 0 && (
        <Section icon={ListChecks} title="How to use it">
          <ol className="list-decimal pl-5 space-y-1.5">
            {howToUse.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </Section>
      )}

      {whatItMeans && whatItMeans.length > 0 && (
        <Section icon={Lightbulb} title="What your result means">
          <ul className="list-disc pl-5 space-y-1.5">
            {whatItMeans.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>
      )}

      {tips && tips.length > 0 && (
        <Section icon={Sparkles} title="Pro tips">
          <ul className="list-disc pl-5 space-y-1.5">
            {tips.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>
      )}

      {alsoAsk && alsoAsk.length > 0 && (
        <Section icon={BookOpen} title="People also ask">
          <div className="space-y-3">
            {alsoAsk.map((qa, i) => (
              <div key={i}>
                <p className="font-medium text-foreground">{qa.q}</p>
                <p className="mt-0.5">{qa.a}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </section>
  );
};

export default AboutCalculator;
