"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { FaDiscord, FaYoutube } from "react-icons/fa";
import DocsSearch from "./DocsSearch";

function SidebarItem({ it, lang, pathname }) {
  const [isOpen, setIsOpen] = useState(pathname.includes(it.slug));
  const href = it.external ? it.href : `/${lang}/docs${it.slug ? `/${it.slug}` : ""}`;
  const active = !it.external && pathname === href;
  
  let Icon = null;
  if (it.icon === "FaDiscord") Icon = FaDiscord;
  else if (it.icon === "FaYoutube") Icon = FaYoutube;
  else if (it.icon && LucideIcons[it.icon]) Icon = LucideIcons[it.icon];
  
  const hasSubpages = it.items && it.items.length > 0;

  const content = (
    <>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} />}
        <span className="text-[14px]">{it.title}</span>
      </div>
      
      {it.isComingSoon ? (
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#ff5100]/20 text-[#ff5100] uppercase tracking-wider">
          Soon
        </span>
      ) : hasSubpages ? (
        <div className="opacity-50 transition-transform duration-200">
          <LucideIcons.ChevronRight size={14} className={isOpen ? "rotate-90" : ""} />
        </div>
      ) : (
        it.external ? (
          <LucideIcons.ArrowUpRight size={14} className="opacity-40" />
        ) : (
          <LucideIcons.ChevronRight size={14} className="opacity-40" />
        )
      )}
    </>
  );

  return (
    <div className="flex flex-col mb-0.5">
      {it.isComingSoon ? (
        <div className="docs-sidebar-link w-full justify-between opacity-60 cursor-not-allowed select-none pointer-events-none">
          {content}
        </div>
      ) : (
        <Link 
          href={href} 
          className={`docs-sidebar-link w-full justify-between ${active ? " active" : ""}`}
          target={it.external ? "_blank" : undefined}
          rel={it.external ? "noopener noreferrer" : undefined}
          onClick={() => {
            if (hasSubpages) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {content}
        </Link>
      )}

      {hasSubpages && isOpen && (
        <div className="flex flex-col ml-3 pl-3 border-l border-[#ff5100]/30 mt-1 mb-1">
          {it.items.map((sub, i) => {
            const subHref = `/${lang}/docs/${sub.slug}`;
            const subActive = pathname === subHref;
            const SubIcon = sub.icon && LucideIcons[sub.icon] ? LucideIcons[sub.icon] : null;
            return (
              <Link key={i} href={subHref} className={`docs-sidebar-link py-1.5 ${subActive ? " active" : ""}`}>
                {SubIcon && <SubIcon size={14} className="text-[#ff5100]" />}
                <span className="text-[13px]">{sub.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function DocsSidebar({ lang, nav = [] }) {
  const pathname = usePathname();
  
  return (
    <nav className="docs-sidebar">
      <div className="mb-6 px-1 xl:hidden">
        <DocsSearch nav={nav} lang={lang} />
      </div>
      {nav.map((sec, idx) => (
        <div key={idx} className="docs-sidebar-section">
          {sec.title && <p className="docs-sidebar-title">{sec.title}</p>}
          {sec.items.map((it, i) => (
            <SidebarItem key={i} it={it} lang={lang} pathname={pathname} />
          ))}
        </div>
      ))}
    </nav>
  );
}
