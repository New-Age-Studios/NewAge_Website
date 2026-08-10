import Link from "next/link";
import { ChevronRight, Check, Heart } from "lucide-react";
import { getPackage, getPackages, parseLocalizedDescription } from "@/lib/tebex";
import { getBasketData } from "@/app/actions/cart";
import ClientAddToCart from "@/components/ClientAddToCart";
import ProductGallery from "@/components/ProductGallery";
import { getDictionary } from "@/dictionaries";
import { cookies } from "next/headers";
import { getExchangeRates, formatCurrency } from "@/lib/currency";

export default async function ProductPage({ params }) {
  const { id, lang } = await params;
  const product = await getPackage(id);
  const products = await getPackages();
  const basket = await getBasketData();
  const dict = await getDictionary(lang);
  const cookieStore = await cookies();
  const currencyCode = cookieStore.get("NEXT_CURRENCY")?.value || "USD";
  const rates = await getExchangeRates();

  const inCart = basket?.packages?.some(p => (p.package?.id || p.id) === product.id) || false;

  if (!product) {
    return (
      <div style={{ background: "#141414", minHeight: "100vh", paddingTop: 80, fontFamily: "'Inter', sans-serif" }} className="flex items-center justify-center">
        <div className="text-center">
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{dict.product.not_found}</p>
          <Link href={`/${lang}/scripts`} style={{ color: "#f97316", fontSize: 14, marginTop: 12, display: "inline-block" }}>{dict.product.back_to_scripts}</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#141414", minHeight: "100vh", paddingTop: 80 }}>
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-8 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          <Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.navbar?.home || "Home"}</Link>
          <ChevronRight size={12} />
          <Link href={`/${lang}/scripts?category=${encodeURIComponent(product.category?.name || 'All')}`} className="hover:text-white transition-colors">{product.category?.name || "Scripts"}</Link>
          <ChevronRight size={12} />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-10 items-start w-full max-w-full">
          
          {/* Gallery (Top on Mobile & Desktop) */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 w-full max-w-full overflow-hidden">
            <ProductGallery product={product} />
          </div>

          {/* Purchase Panel (Middle on Mobile, Right Column on Desktop) */}
          <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full max-w-full">

            <div
              className="rounded-2xl p-6"
              style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h1
                className="mb-1"
                style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif" }}
              >
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-5">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {product.category?.name || "SCRIPT"}
                </span>
              </div>

              <p
                className="mb-6"
                style={{ fontSize: "1.75rem", fontWeight: 800, color: "#f97316", fontFamily: "'Barlow', sans-serif" }}
              >
                {product.total_price === 0 ? dict.product.free : formatCurrency(product.total_price, currencyCode, rates)}
              </p>

              <div className="flex flex-col gap-0">
                <ClientAddToCart packageId={product.id} returnPath={`/${lang}/scripts/${product.id}`} dict={dict.product} />
                <ClientAddToCart packageId={product.id} returnPath={`/${lang}/scripts/${product.id}`} isSecondary={true} alreadyInCart={inCart} dict={dict.product} />
              </div>

              {product.total_price === 0 && (
                <a
                  href="https://ko-fi.com/newagestudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-95 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #FF5E5B 0%, #D93835 100%)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}
                >
                  <Heart size={18} fill="currentColor" className="text-white animate-pulse" />
                  {dict.product.donate || "Fazer uma Doação (Ko-fi)"}
                </a>
              )}

              <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex flex-col gap-3">
                  {[
                    { label: dict.product.instant_delivery, detail: dict.product.instant_delivery_desc },
                    { label: dict.product.free_updates, detail: dict.product.free_updates_desc },
                    { label: dict.product.support_24_7, detail: dict.product.support_24_7_desc },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
                      >
                        <Check size={9} strokeWidth={3} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: "#f2f2f2", fontWeight: 600 }}>{item.label}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related scripts */}
            <div className="mt-4 rounded-2xl p-5" style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {dict.product.more_scripts}
              </p>
              <div className="flex flex-col gap-2">
                {products.filter((p) => p.id !== product.id).slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    href={`/${lang}/scripts/${p.id}`}
                    className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5"
                  >
                    <div
                      className="w-10 h-10 rounded-lg shrink-0 overflow-hidden relative"
                      style={{ background: p.cardGradient }}
                    >
                      <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate" style={{ color: "#f2f2f2", fontWeight: 600 }}>{p.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{p.total_price === 0 ? dict.product.free : formatCurrency(p.total_price, currencyCode, rates)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Description (Bottom on Mobile, Left Column on Desktop) */}
          <div className="order-3 lg:col-start-1 lg:row-start-2 w-full max-w-full overflow-hidden">
            <div
              className="rounded-2xl p-4 lg:p-6 mb-6"
              style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div 
                className="tebex-description prose prose-invert max-w-full overflow-hidden break-words"
                style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.75 }}
                dangerouslySetInnerHTML={{ __html: parseLocalizedDescription(product.description, lang) }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
