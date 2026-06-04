import React from "react";

interface AdSensePlaceholderProps {
  type: "leaderboard" | "rectangle" | "mobile-banner" | "half-page";
  slot: string;
}

const AdSensePlaceholder: React.FC<AdSensePlaceholderProps> = ({ type, slot }) => {
  // Define size dimensions and responsive styling classes
  const config = {
    leaderboard: {
      width: "728px",
      height: "90px",
      // Leaderboard ads are for tablet/desktop; hide on mobile
      className: "hidden sm:flex w-full max-w-[728px] h-[90px]",
    },
    "mobile-banner": {
      width: "320px",
      height: "100px",
      // Mobile banners are only for mobile; hide on tablet/desktop
      className: "flex sm:hidden w-full max-w-[320px] h-[100px]",
    },
    rectangle: {
      width: "336px",
      height: "280px",
      className: "flex w-full max-w-[336px] h-[280px]",
    },
    "half-page": {
      width: "300px",
      height: "600px",
      className: "flex w-full max-w-[300px] h-[600px]",
    },
  };

  const current = config[type] || config.rectangle;

  return (
    <div
      className={`mx-auto items-center justify-center flex-col bg-muted/20 border border-dashed border-border/80 rounded-xl relative overflow-hidden transition-colors hover:bg-muted/30 ${current.className}`}
      style={{
        width: "100%",
        height: current.height,
        aspectRatio: `${current.width.replace("px", "")} / ${current.height.replace("px", "")}`,
      }}
      data-ad-slot={slot}
    >
      <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground/60 select-none">
        Advertisement
      </span>
      <span className="text-[10px] text-muted-foreground/40 mt-1 select-none font-medium">
        Slot #{slot} ({current.width} × {current.height})
      </span>
      {/* Real AdSense tag script can be loaded dynamically in production */}
      {/* 
        <ins className="adsbygoogle"
             style={{ display: "inline-block", width: current.width, height: current.height }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}></ins>
      */}
    </div>
  );
};

export default AdSensePlaceholder;
