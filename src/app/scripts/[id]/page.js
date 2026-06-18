import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import { getPackage, getPackages } from "@/lib/tebex";
import { getBasketData } from "@/app/actions/cart";
import ClientAddToCart from "@/components/ClientAddToCart";
import ProductGallery from "@/components/ProductGallery";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getPackage(id);
  const products = await getPackages();
  const basket = await getBasketData();

  const inCart = basket?.packages?.some(p => (p.package?.id || p.id) === product.id) || false;

  if (!product) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", paddingTop: 80, fontFamily: "'Inter', sans-serif" }} className="flex items-center justify-center">
        <div className="text-center">
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Product not found.</p>
          <Link href="/scripts" style={{ color: "#f97316", fontSize: 14, marginTop: 12, display: "inline-block" }}>← Back to Scripts</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0a", minHeight: "100vh", paddingTop: 80 }}>
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-8 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/scripts?category=${encodeURIComponent(product.category?.name || 'All')}`} className="hover:text-white transition-colors">{product.category?.name || "Scripts"}</Link>
          <ChevronRight size={12} />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Left — images + description */}
          <div>
            <ProductGallery product={product} />

            {/* Description */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div 
                className="tebex-description"
                style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.75 }}
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            </div>
          </div>

          {/* Right — purchase panel */}
          <div className="lg:sticky" style={{ top: 90 }}>
            <div
              className="rounded-2xl p-6"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
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
                {product.total_price === 0 ? "FREE" : `$${product.total_price}`}
              </p>

              <div className="flex flex-col gap-0">
                <ClientAddToCart packageId={product.id} returnPath={`/scripts/${product.id}`} />
                <ClientAddToCart packageId={product.id} returnPath={`/scripts/${product.id}`} isSecondary={true} alreadyInCart={inCart} />
              </div>

              <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Instant delivery", detail: "Via Tebex automated system" },
                    { label: "Free lifetime updates", detail: "Always on the latest version" },
                    { label: "24/7 support", detail: "Discord community & docs" },
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
            <div className="mt-4 rounded-2xl p-5" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                More Scripts
              </p>
              <div className="flex flex-col gap-2">
                {products.filter((p) => p.id !== product.id).slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    href={`/scripts/${p.id}`}
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
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{p.total_price === 0 ? "FREE" : `$${p.total_price}`}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
