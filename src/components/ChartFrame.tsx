import { ReactNode } from "react";

interface ChartFrameProps {
  height?: number;
  children: ReactNode;
  className?: string;
}

/**
 * Reserves explicit height for recharts containers to prevent CLS (layout shift)
 * before the chart measures and mounts on mobile.
 */
const ChartFrame = ({ height = 180, children, className = "" }: ChartFrameProps) => (
  <div
    className={`w-full ${className}`}
    style={{ height: `${height}px`, minHeight: `${height}px`, contain: "layout paint" }}
  >
    {children}
  </div>
);

export default ChartFrame;
