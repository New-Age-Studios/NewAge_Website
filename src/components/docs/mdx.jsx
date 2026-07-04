import { Tabs, Tab } from "@/components/docs/Tabs";
import { AlertTriangle, Info, XCircle } from "lucide-react";
import { Pre } from "@/components/docs/Pre";
import { VideoPlaceholder } from "@/components/docs/VideoPlaceholder";

export function Callout({ type = "info", title, children }) {
  const Icon = type === "warn" ? AlertTriangle : type === "error" ? XCircle : Info;
  const iconColor = type === "warn" ? "text-[#fb8f1d]" : type === "error" ? "text-red-500" : "text-[#888888]";

  return (
    <div className={`docs-callout docs-callout-${type}`}>
      {title && (
        <div className={`docs-callout-header flex items-center gap-2 mb-3 ${iconColor}`}>
          <Icon size={18} />
          <span className="text-white italic font-bold">{title}</span>
        </div>
      )}
      <div className={`docs-callout-content text-[15px] ${!title ? 'flex gap-3' : ''}`}>
        {!title && (
          <div className={`shrink-0 mt-[2px] ${iconColor}`}>
            <Icon size={18} />
          </div>
        )}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export function Cover({ src, alt = "Cover image" }) {
  return (
    <div className="w-full h-[250px] sm:h-[300px] mb-8 overflow-hidden rounded-xl">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/** Components available to every MDX doc without importing. */
export const docsMdxComponents = {
  Callout,
  Tabs,
  Tab,
  pre: Pre,
  Cover,
  VideoPlaceholder,
};
