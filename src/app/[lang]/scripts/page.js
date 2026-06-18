import Link from "next/link";
import { Suspense } from "react";
import { getPackages } from "@/lib/tebex";
import ProductFilter from "@/components/ProductFilter";

export default async function ScriptsPage() {
  const products = await getPackages();

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0a", minHeight: "100vh", paddingTop: 80 }}
    >
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-12">
        <h1
          className="mb-8"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif" }}
        >
          Products
        </h1>

        <Suspense fallback={<div className="py-20 text-center text-white/50">Carregando produtos...</div>}>
          <ProductFilter products={products} />
        </Suspense>
      </div>
    </div>
  );
}
