"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react";
import { FaDiscord, FaYoutube } from "react-icons/fa";

export default function DocsSearch({ nav = [], lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Flatten the navigation tree into searchable items
  const searchableItems = useMemo(() => {
    const items = [];
    for (const section of nav) {
      if (section.items) {
        for (const item of section.items) {
          if (!item.external && item.slug !== undefined) {
            items.push({ ...item, category: section.title || "General" });
            if (item.items) {
              for (const sub of item.items) {
                if (!sub.external && sub.slug !== undefined) {
                  items.push({ ...sub, category: item.title });
                }
              }
            }
          }
        }
      }
    }
    return items;
  }, [nav]);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query) return searchableItems.slice(0, 8); // show max 8 by default
    const q = query.toLowerCase();
    return searchableItems
      .filter((it) => it.title.toLowerCase().includes(q) || (it.category && it.category.toLowerCase().includes(q)))
      .slice(0, 10);
  }, [query, searchableItems]);

  const handleSelect = (slug) => {
    setIsOpen(false);
    setQuery("");
    inputRef.current?.blur();
    router.push(`/${lang}/docs/${slug}`);
  };

  return (
    <div className="relative z-50 w-full" ref={containerRef}>
      <div
        className="flex items-center gap-2 bg-[#1b1816] border border-[#3c3127] rounded-md px-2.5 py-1 cursor-text hover:border-[#ff5100]/30 focus-within:border-[#ff5100]/50 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <Search size={13} className="text-white/40 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-[12px] text-white w-full placeholder:text-white/40"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b1816] border border-[#3c3127] rounded-md shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[350px]">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-6 text-center text-[13px] text-white/50">
              No results found for "{query}"
            </div>
          ) : (
            <div className="overflow-y-auto py-1 custom-scrollbar">
              {filteredItems.map((it, idx) => {
                let Icon = null;
                if (it.icon === "FaDiscord") Icon = FaDiscord;
                else if (it.icon === "FaYoutube") Icon = FaYoutube;
                else if (it.icon && LucideIcons[it.icon]) Icon = LucideIcons[it.icon];

                return (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 text-left transition-colors"
                    onClick={() => handleSelect(it.slug)}
                  >
                    {Icon ? (
                      <div className="flex items-center justify-center w-6 h-6 rounded bg-[#2a241f] border border-[#3c3127] text-[#ff5100] shrink-0">
                        <Icon size={12} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded shrink-0" />
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[13px] text-white font-medium truncate">{it.title}</span>
                      <span className="text-[11px] text-white/40 truncate">{it.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
