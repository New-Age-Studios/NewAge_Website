"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

import { currencies } from "@/lib/currency";

export default function CurrencySelector({ initialCurrencyCode = "USD" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(currencies.find(c => c.code === initialCurrencyCode) || currencies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setSearchTerm("");
        }}
        className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/10 w-[84px]"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
      >
        <div className="flex items-center gap-1.5">
          <span>{active.flag}</span>
          <span style={{ fontWeight: 600 }}>{active.code}</span>
        </div>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute bottom-full left-0 mb-2 w-48 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ 
            background: "#141414", 
            border: "1px solid rgba(255,255,255,0.1)",
            zIndex: 50
          }}
        >
          <div className="p-2 border-b border-white/5 bg-white/5">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 text-white text-xs rounded-md pl-8 pr-3 py-2 outline-none border border-white/10 focus:border-white/20 transition-colors"
              />
            </div>
          </div>
          <div 
            className="py-1 max-h-[260px] overflow-y-auto"
            style={{ 
              scrollbarWidth: 'thin', 
              scrollbarColor: 'rgba(255,255,255,0.15) transparent' 
            }}
          >
            {currencies
              .filter(c => c.code.toLowerCase().includes(searchTerm.toLowerCase()) || c.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((cur) => (
              <button
                key={cur.code}
                onClick={() => {
                  setActive(cur);
                  setIsOpen(false);
                  document.cookie = `NEXT_CURRENCY=${cur.code}; path=/; max-age=31536000`;
                  window.location.reload();
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs transition-colors hover:bg-white/5"
                style={{ color: active.code === cur.code ? "#f97316" : "rgba(255,255,255,0.7)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{cur.flag}</span>
                  <span style={{ fontWeight: active.code === cur.code ? 600 : 400 }}>{cur.code}</span>
                </div>
                <span className="opacity-40 font-mono">{cur.symbol}</span>
              </button>
            ))}
            {currencies.filter(c => c.code.toLowerCase().includes(searchTerm.toLowerCase()) || c.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
              <div className="py-4 text-center text-xs text-white/40">No currencies found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
