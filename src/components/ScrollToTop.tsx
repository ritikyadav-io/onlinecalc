import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Save scroll positions per location key so back/forward navigation restores
// the previous scroll position like a normal multi-page site. New navigations
// (PUSH/REPLACE) always scroll to the top of the new page.
const positions = new Map<string, number>();

const ScrollToTop = () => {
  const { pathname, key } = useLocation();
  const navType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"

  useEffect(() => {
    const save = () => positions.set(key, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      save();
      window.removeEventListener("scroll", save);
    };
  }, [key]);

  useEffect(() => {
    if (navType === "POP") {
      const y = positions.get(key) ?? 0;
      // Wait a tick so the new route has rendered before restoring scroll.
      requestAnimationFrame(() => window.scrollTo(0, y));
    } else {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
};

export default ScrollToTop;
