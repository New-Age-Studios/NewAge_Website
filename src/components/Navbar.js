"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, ChevronDown, History, LogOut, Globe } from "lucide-react";
import { useState, useTransition, useEffect, useRef } from "react";
import { initiateLogin, getBasketData, logout, getAvailableAuthMethods } from "@/app/actions/cart";

export default function Navbar({ lang = "en", dict = {} }) {
  const navLinks = [
    { label: dict.home || "Home", href: `/${lang}` },
    { label: dict.products || "Products", href: `/${lang}/products` },
    { label: dict.showcase || "Showcase", href: `/${lang}/showcase` },
    { label: dict.docs || "Docs", href: `/${lang}/docs` },
    { label: dict.support || "Support", href: `/${lang}/support` },
  ];
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [basketData, setBasketData] = useState(null);
  const [authMethods, setAuthMethods] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [manageOrdersOpen, setManageOrdersOpen] = useState(false);
  const [showDiscordPrompt, setShowDiscordPrompt] = useState(false);
  
  const dropdownRef = useRef(null);

  const refreshBasket = () => {
    getBasketData().then(data => {
      setBasketData(data);
      if (data?.username) {
        getAvailableAuthMethods(window.location.pathname).then(methods => {
          setAuthMethods(methods);
          const needsDiscord = methods.some(m => m.name === "Discord");
          if (needsDiscord && !localStorage.getItem("discordPromptShown")) {
            setShowDiscordPrompt(true);
            localStorage.setItem("discordPromptShown", "true");
          }
        }).catch(console.error);
      }
    }).catch(console.error);
  };

  useEffect(() => {
    refreshBasket();
    
    // Close dropdown on click outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = (provider = "FiveM") => {
    startTransition(() => {
      initiateLogin(window.location.pathname, provider);
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      setBasketData(null);
      setAuthMethods([]);
      setDropdownOpen(false);
      localStorage.removeItem("discordPromptShown");
    });
  };

  const username = basketData?.username;
  const packagesCount = basketData?.packages?.length || 0;

  return (
    <>
      <nav
        style={{ fontFamily: "'Inter', sans-serif" }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
      >
        <div
          className="absolute inset-0"
          style={{ background: "transparent" }}
        />

        <div className="relative flex items-center justify-between w-full max-w-[1200px] mx-auto">
          {/* Logo (Left) */}
          <div className="flex justify-start shrink-0 w-[180px] lg:w-[220px]">
            <Link href={`/${lang}`} className="flex items-center shrink-0">
              <img 
                src="/na-studios.svg" 
                alt="New Age Studios" 
                className="h-10 md:h-12 object-contain"
                style={{ filter: "brightness(0) invert(1)" }} 
              />
            </Link>
          </div>

          {/* Desktop links (Center) */}
          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 flex-1 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-base px-4 py-2 rounded-xl transition-all hover:bg-white/10"
                style={{
                  color: pathname?.startsWith(link.href) && link.href !== "/" && !link.href.startsWith("http") ? "#ffffff" : "rgba(255,255,255,0.85)",
                  fontWeight: 600,
                  letterSpacing: "0.01em"
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side (Right) */}
          <div className="hidden md:flex items-center justify-end gap-3 shrink-0 relative w-[240px] lg:w-[320px]" ref={dropdownRef}>
            
            {/* Language Switcher */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1.5 p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                title="Switch Language"
              >
                <Globe size={18} />
                <span className="text-sm font-semibold uppercase">{lang === 'pt-br' ? 'PT' : 'EN'}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-32 rounded-xl shadow-2xl py-2 flex flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                   style={{ background: "#1f1f1f", border: "1px solid rgba(255,255,255,0.1)" }}>
                <button 
                  onClick={() => {
                    document.cookie = "NEXT_LOCALE=en; path=/; max-age=31536000";
                    window.location.href = window.location.pathname.replace(/^(\/(en|pt-br))/, '/en');
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-white/10"
                  style={{ color: lang === 'en' ? '#f97316' : '#fff' }}
                >
                  English
                </button>
                <button 
                  onClick={() => {
                    document.cookie = "NEXT_LOCALE=pt-br; path=/; max-age=31536000";
                    window.location.href = window.location.pathname.replace(/^(\/(en|pt-br))/, '/pt-br');
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-white/10"
                  style={{ color: lang === 'pt-br' ? '#f97316' : '#fff' }}
                >
                  Português
                </button>
              </div>
            </div>

            {username ? (
              <div className="relative flex items-center gap-2">
                {/* User Button */}
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#f97316", color: "#fff", fontSize: 13, fontWeight: 800 }}>
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-base font-semibold text-white ml-1">{username}</span>
                  <ChevronDown size={16} className="text-white/60 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div 
                    className="absolute top-full right-12 mt-2 w-64 rounded-xl shadow-2xl py-2 flex flex-col"
                    style={{ background: "#1f1f1f", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <button 
                      onClick={() => {
                        setDropdownOpen(false);
                        setManageOrdersOpen(true);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors w-full text-left"
                    >
                      <History size={16} />
                      Manage Orders
                    </button>
                    {authMethods.some(m => m.name === "Discord") && (
                      <button 
                        onClick={() => handleLogin("Discord")}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-[#5865F2] transition-colors w-full text-left"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                        </svg>
                        Connect Discord
                      </button>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors text-left"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}

                {/* Cart Button */}
                <Link
                  href="/cart"
                  className="relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff" }}
                >
                  <ShoppingCart size={20} />
                  {packagesCount > 0 && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center" style={{ fontSize: 11, fontWeight: 800 }}>
                      {packagesCount}
                    </div>
                  )}
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogin}
                  disabled={isPending}
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-base font-semibold whitespace-nowrap transition-colors hover:bg-white/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", cursor: isPending ? "not-allowed" : "pointer" }}
                >
                  {isPending ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <img src="/tebexsmall.svg" alt="Tebex Logo" className="h-5 w-auto object-contain" />
                  )}
                  {isPending ? "Connecting..." : "Login with FiveM"}
                </button>
                <Link
                  href="/cart"
                  className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff" }}
                >
                  <ShoppingCart size={18} />
                  {packagesCount > 0 && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center" style={{ fontSize: 9, fontWeight: 800 }}>
                      {packagesCount}
                    </div>
                  )}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto relative z-10 text-white"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="absolute top-full left-0 right-0 flex flex-col py-4 gap-1"
            style={{ background: "rgba(20,20,20,0.98)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-2.5 text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Manage Orders Modal */}
      {manageOrdersOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setManageOrdersOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-[500px] bg-[#141414] rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)", height: "80vh", maxHeight: "650px" }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1a1a1a]">
              <div className="flex items-center gap-2 text-white">
                <History size={18} className="text-orange-500" />
                <span className="font-bold text-sm">Manage Orders</span>
              </div>
              <button 
                onClick={() => setManageOrdersOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Iframe Body */}
            <div className="flex-1 w-full relative bg-white">
              <iframe 
                src="https://portal.tebex.io/enter-email" 
                className="absolute inset-0 w-full h-full border-none"
                title="Tebex Portal"
              />
            </div>
          </div>
        </div>
      )}

      {/* Discord Prompt Modal */}
      {showDiscordPrompt && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDiscordPrompt(false)} />
          
          <div className="relative w-full max-w-[400px] bg-[#1a1a1a] rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center" style={{ background: "rgba(88,101,242,0.15)" }}>
              <svg viewBox="0 0 24 24" fill="#5865F2" className="w-8 h-8">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Connect Your Discord</h3>
            <p className="text-sm text-white/50 mb-8 leading-relaxed">
              Link your Discord account to automatically receive your roles, access exclusive channels, and claim customer benefits.
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={() => {
                  setShowDiscordPrompt(false);
                  handleLogin("Discord");
                }}
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:brightness-110 active:scale-95"
                style={{ background: "#5865F2" }}
              >
                Connect Discord
              </button>
              <button 
                onClick={() => setShowDiscordPrompt(false)}
                className="w-full py-3.5 rounded-xl font-bold text-white/50 transition-all hover:text-white hover:bg-white/5 active:scale-95"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
