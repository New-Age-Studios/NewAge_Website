import { Tabs, Tab } from "@/components/docs/Tabs";
import { AlertTriangle, Info, XCircle, LifeBuoy } from "lucide-react";
import { Pre } from "@/components/docs/Pre";
import { VideoPlaceholder } from "@/components/docs/VideoPlaceholder";
import Link from "next/link";

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

import { useParams } from 'next/navigation';

export function Support() {
  const params = useParams();
  const lang = params?.lang || 'en';
  const isPt = lang === 'pt-br';

  return (
    <div className="relative docs-callout mt-12 mb-8 border border-[#ff5100]/30 bg-gradient-to-r from-[#ff5100]/15 to-[#ff5100]/5 rounded-xl p-6 md:p-8 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5100]/20 blur-[80px] pointer-events-none rounded-full translate-x-1/4 -translate-y-1/4" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
        {/* Left Content */}
        <div className="flex-1">
          <div className="mb-2">
            <h4 className="text-white font-black text-xl tracking-wide uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {isPt ? 'PRECISA DE MAIS AJUDA?' : 'Need additional help?'}
            </h4>
          </div>
          <p className="text-[#a1a1aa] text-sm mb-6 leading-relaxed max-w-lg mt-3">
            {isPt 
              ? 'Se você precisar de mais suporte, encontrar algum bug ou tiver dúvidas sobre este produto, nossa equipe de suporte está sempre pronta para ajudar.' 
              : 'If you need further support, encounter any bugs, or have questions regarding this product, our support team is always ready to assist you.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link 
              href={`/${lang}/support`}
              className="!no-underline !text-white text-xs font-bold tracking-wide bg-[#ff5100] px-5 py-2.5 rounded-lg transition-all hover:bg-[#e64a00] shadow-[0_0_15px_rgba(255,81,0,0.3)] hover:shadow-[0_0_20px_rgba(255,81,0,0.5)]"
              style={{ textDecoration: 'none', borderBottom: 'none' }}
            >
              {isPt ? 'VISITAR CENTRAL DE AJUDA' : 'VISIT SUPPORT CENTER'}
            </Link>
            <a 
              href="https://discord.gg/tyKTs4QyYA" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="!no-underline !text-white text-xs font-bold tracking-wide bg-[#18181b] border border-[#27272a] px-5 py-2.5 rounded-lg transition-colors hover:bg-[#27272a]"
              style={{ textDecoration: 'none', borderBottom: 'none' }}
            >
              {isPt ? 'ABRIR TICKET NO DISCORD' : 'OPEN DISCORD TICKET'}
            </a>
          </div>
        </div>

        {/* Mascot Image (pipinhoe) */}
        <div className="hidden md:flex w-40 shrink-0 justify-center transition-transform duration-500 hover:scale-110 hover:-translate-y-2">
          <img 
            src="/pipinhoe.png" 
            alt="Support Mascot" 
            className="w-full object-contain"
            style={{ filter: "drop-shadow(0 10px 15px rgba(255,81,0,0.4))" }}
          />
        </div>
      </div>
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
  Support,
};
