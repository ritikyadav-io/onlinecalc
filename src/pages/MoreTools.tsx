import ToolCard from "@/components/ToolCard";
import { moreTools } from "@/lib/tools";

const MoreTools = () => {
  return (
    <div className="page-container">
      <h1 className="tool-title mb-5">More Tools</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {moreTools.map((tool, i) => (
          <ToolCard key={tool.to} {...tool} index={i} />
        ))}
      </div>
    </div>
  );
};

export default MoreTools;
