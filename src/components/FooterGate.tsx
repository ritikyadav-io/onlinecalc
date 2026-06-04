import { useLocation } from "react-router-dom";
import Footer from "./Footer";

// Footer only appears on non-tool pages to keep tool UI focused and to
// prevent the floating action buttons from overlapping with footer content.
const FOOTER_ROUTES = new Set<string>([
  "/",
  "/about",
  "/privacy",
  "/contact",
  "/blog",
  "/dashboard",
  "/more",
  "/terms",
  "/disclaimer",
]);

const FooterGate = () => {
  const { pathname } = useLocation();
  const show =
    FOOTER_ROUTES.has(pathname) ||
    pathname.startsWith("/blog/"); // blog post + category pages
  if (!show) return null;
  return <Footer />;
};

export default FooterGate;
