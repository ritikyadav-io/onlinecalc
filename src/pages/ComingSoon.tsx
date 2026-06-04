import { useLocation } from "react-router-dom";
import { Construction } from "lucide-react";

const ComingSoon = () => {
  const location = useLocation();
  const name = location.pathname.slice(1).replace(/-/g, " ");

  return (
    <div className="page-container flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Construction size={32} className="text-muted-foreground mb-3" />
      <p className="text-sm font-semibold capitalize text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
    </div>
  );
};

export default ComingSoon;
