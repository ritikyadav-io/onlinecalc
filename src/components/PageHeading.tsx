import { ReactNode } from "react";

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

/**
 * Standard, visible page heading used on every calculator/tool page.
 * Provides a real on-screen H1 (instead of sr-only) so mobile users see
 * a proper headline above the tool, and search engines / AI crawlers
 * see semantically correct heading hierarchy.
 */
const PageHeading = ({ title, subtitle, icon }: PageHeadingProps) => (
  <header className="mb-4 sm:mb-6 text-center sm:text-left">
    <h1 className="text-[22px] sm:text-[30px] lg:text-[34px] font-extrabold tracking-tight text-foreground leading-tight flex items-center gap-2 justify-center sm:justify-start">
      {icon}
      <span>{title}</span>
    </h1>
    {subtitle && (
      <p className="text-[13px] sm:text-[15px] text-muted-foreground mt-1.5 leading-snug max-w-2xl mx-auto sm:mx-0">
        {subtitle}
      </p>
    )}
  </header>
);

export default PageHeading;
