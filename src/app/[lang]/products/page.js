import Link from "next/link";
import { Suspense } from "react";
import { getPackages } from "@/lib/tebex";
import ProductFilter from "@/components/ProductFilter";
import { cookies } from "next/headers";
import { getExchangeRates } from "@/lib/currency";
import { getDictionary } from "@/dictionaries";

export default async function ScriptsPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const cookieStore = await cookies();
  const currencyCode = cookieStore.get("NEXT_CURRENCY")?.value || "USD";
  const rates = await getExchangeRates();
  const products = await getPackages();

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif", background: "#141414", minHeight: "100vh", paddingTop: 80 }}
    >
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-12">
        <h1
          className="mb-8"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif" }}
        >
          Products
        </h1>

        <Suspense fallback={<div className="py-20 text-center text-white/50">Carregando produtos...</div>}>
          <ProductFilter products={products} currencyCode={currencyCode} rates={rates} dict={dict.product} />
        </Suspense>
      </div>
    </div>
  );
}
