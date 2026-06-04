import { useLocation, Navigate } from "react-router-dom";
import { getVariantBySlug } from "@/lib/seoVariants";
import CGPACalculator from "./CGPACalculator";
import AttendanceTracker from "./AttendanceTracker";
import PercentageCalculator from "./PercentageCalculator";
import RequiredMarks from "./RequiredMarks";

const ProgrammaticTool = () => {
  const slug = useLocation().pathname.replace(/^\//, "").replace(/\/$/, "");
  const variant = getVariantBySlug(slug);
  if (!variant) return <Navigate to="/404" replace />;

  const seo = {
    title: variant.title,
    description: variant.description,
    path: `/${variant.slug}`,
    h1: variant.h1,
    intro: variant.intro,
    faq: variant.faq,
  };

  switch (variant.tool) {
    case "cgpa": return <CGPACalculator seo={seo} />;
    case "attendance": return <AttendanceTracker seo={seo} />;
    case "percentage": return <PercentageCalculator seo={seo} />;
    case "required-marks": return <RequiredMarks seo={seo} />;
    default: return <Navigate to="/404" replace />;
  }
};

export default ProgrammaticTool;
