"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Subscription", href: "/subscription" },
  { label: "Scripts", href: "/scripts" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Docs", href: "/docs" },
  { label: "Support", href: "/support" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
    >
      <div
        className="absolute inset-0 border-b"
        style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.07)" }}
      />

      <div className="relative flex items-center gap-8 w-full max-w-[1200px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white shrink-0" style={{ fontSize: 13, fontWeight: 800 }}>
          IO
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors"
              style={{
                color: pathname?.startsWith(link.href) && link.href !== "/" ? "#f97316" : "rgba(255,255,255,0.7)",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors"
            style={{ background: "rgba(255,255,255,0.08)", color: "#f2f2f2", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            NewAgeStudios
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
            style={{ background: "rgba(255,255,255,0.08)", color: "#f2f2f2", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ShoppingCart size={15} />
          </button>
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
          style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
  );
}
