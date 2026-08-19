"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { FaDiscord, FaYoutube } from "react-icons/fa";
import DocsSearch from "./DocsSearch";

function SidebarItem({ it, lang, pathname, setMobileOpen }) {
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
            } else if (setMobileOpen) {
              setMobileOpen(false);
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
              <Link 
                key={i} 
                href={subHref} 
                className={`docs-sidebar-link py-1.5 ${subActive ? " active" : ""}`}
                onClick={() => {
                  if (setMobileOpen) setMobileOpen(false);
                }}
              >
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

export default function DocsSidebar({ lang, nav = [], dict }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Swipe gestures for mobile sidebar
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Horizontal swipe threshold
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX > 0 && touchStartX < 50) {
          // Swipe right from the left edge opens it
          setMobileOpen(true);
        } else if (deltaX < 0 && mobileOpen) {
          // Swipe left while open closes it
          setMobileOpen(false);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mobileOpen]);
  return (
    <>
      {/* Mobile Top Bar (Replaces main Navbar on mobile) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 z-[90] flex items-center justify-between px-4 sm:px-6 bg-[#09090b]/90 backdrop-blur-md border-b border-white/5">
        
        {/* Menu Toggle (Left) */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 text-white font-medium text-[15px] transition-colors hover:text-white/80"
          >
            <LucideIcons.Menu size={22} className="text-[#ff5100]" />
            {lang === 'pt-br' ? 'Menu' : 'Menu'}
          </button>
        </div>

        {/* Center: Empty to balance flex */}
        <div className="flex-1 flex justify-center"></div>

        {/* Logo (Right) */}
        <div className="flex-1 flex justify-end">
          <img 
            src="/na-studios.svg" 
            alt="New Age" 
            className="h-[22px] object-contain" 
            style={{ filter: "brightness(0) invert(1)" }} 
          />
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Drawer */}
      <nav 
        className={`docs-sidebar fixed inset-y-0 left-0 z-[110] w-[300px] bg-[#1a1a1a] lg:bg-transparent border-r border-white/10 lg:border-none p-6 lg:p-0 overflow-y-auto lg:overflow-visible transform transition-transform duration-300 lg:transform-none lg:relative lg:z-auto lg:w-auto ${
          mobileOpen ? "translate-x-0 shadow-[0_0_50px_rgba(0,0,0,0.8)]" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <div className="flex items-center">
            <Link href={`/${lang}`} onClick={() => setMobileOpen(false)}>
               <img 
                 src="/na-studios.svg" 
                 alt="New Age Studios" 
                 className="h-8 object-contain"
                 style={{ filter: "brightness(0) invert(1)" }} 
               />
            </Link>
          </div>
          <button 
            onClick={() => setMobileOpen(false)} 
            className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white border border-white/10 transition-all hover:bg-white/10"
          >
            <LucideIcons.X size={18} />
          </button>
        </div>

        <div className="mb-6 px-1 xl:hidden">
          <DocsSearch nav={nav} lang={lang} />
        </div>

        <div className="docs-sidebar-section xl:hidden mb-2">
          <Link 
            href={`/${lang}`}
            onClick={() => setMobileOpen(false)}
            className="docs-sidebar-link w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <LucideIcons.Home size={16} />
              <span className="text-[14px]">{dict?.back_home || (lang === 'pt-br' ? 'Página Inicial' : 'Home Page')}</span>
            </div>
            <LucideIcons.ChevronRight size={14} className="opacity-40" />
          </Link>
        </div>

        {nav.map((sec, idx) => (
          <div key={idx} className="docs-sidebar-section">
            {sec.title && <p className="docs-sidebar-title">{sec.title}</p>}
            {sec.items.map((it, i) => (
              <SidebarItem key={i} it={it} lang={lang} pathname={pathname} setMobileOpen={setMobileOpen} />
            ))}
          </div>
        ))}
      </nav>
    </>
  );
}
