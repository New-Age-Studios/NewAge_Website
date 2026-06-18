"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/currency";

export default function ProductFilter({ products, currencyCode = "USD", rates = {}, dict = {} }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    } else {
      setActiveCategory("All");
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    router.push(cat === "All" ? "/scripts" : `/scripts?category=${encodeURIComponent(cat)}`, { scroll: false });
  };

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category?.name).filter(Boolean)))];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category?.name === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className="px-5 py-2 rounded-xl text-sm transition-all"
            style={{ 
              fontWeight: 600,
              background: activeCategory === cat ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.03)",
              color: activeCategory === cat ? "#f97316" : "rgba(255,255,255,0.5)",
              border: `1px solid ${activeCategory === cat ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.05)"}`
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/scripts/${product.id}`}
            className="group block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
            style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)" }}
              />
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: "#f2f2f2", fontWeight: 600 }}>{product.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{product.category?.name || "SCRIPT"}</p>
              </div>
              <span
                className="text-sm px-2.5 py-1 rounded-md"
                style={{ background: "rgba(249,115,22,0.12)", color: "#f97316", fontWeight: 700, border: "1px solid rgba(249,115,22,0.2)" }}
              >
                {product.total_price === 0 ? (dict.free || "FREE") : formatCurrency(product.total_price, currencyCode, rates)}
              </span>
            </div>
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-20" style={{ color: "rgba(255,255,255,0.3)" }}>
            No products found in this category.
          </div>
        )}
      </div>
    </>
  );
}
