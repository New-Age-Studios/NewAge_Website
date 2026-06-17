import Link from "next/link";
import { ShoppingCart, Gift, ChevronRight, Check } from "lucide-react";
import { getPackage } from "@/lib/tebex";
import { mockScripts as products } from "@/lib/data";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getPackage(id);

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
          <Link href="/scripts" className="hover:text-white transition-colors">Scripts</Link>
          <ChevronRight size={12} />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Left — images + description */}
          <div>
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden mb-6"
              style={{ aspectRatio: "16/9", background: product.cardGradient }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70"
              />
              <div
                className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(249,115,22,0.9)", color: "#fff", fontSize: 11, fontWeight: 800 }}
              >
                IO
              </div>
              {product.badge && (
                <div
                  className="absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-xs"
                  style={{ background: "rgba(0,0,0,0.6)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.4)", fontWeight: 700, backdropFilter: "blur(6px)" }}
                >
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-1">
              {[product.image, product.image].map((src, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shrink-0 relative"
                  style={{ width: 120, height: 80, background: product.cardGradient, border: i === 0 ? "2px solid #f97316" : "2px solid rgba(255,255,255,0.1)" }}
                >
                  <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h2
                className="mb-3"
                style={{ fontSize: 15, fontWeight: 700, color: "#f2f2f2" }}
              >
                Description
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.75 }}>{product.description}</p>
            </div>

            {/* Features */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h2 className="mb-4" style={{ fontSize: 15, fontWeight: 700, color: "#f2f2f2" }}>Features</h2>
              <div className="flex flex-col gap-4">
                {product.features?.map((feat, i) => {
                  const [title, ...rest] = feat.split(":");
                  return (
                    <div key={i} className="flex gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <div>
                        <span style={{ color: "#f2f2f2", fontWeight: 600, fontSize: 13 }}>{title}</span>
                        {rest.length > 0 && (
                          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>:{rest.join(":")}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
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
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p
                className="mb-6"
                style={{ fontSize: "1.75rem", fontWeight: 800, color: "#f97316", fontFamily: "'Barlow', sans-serif" }}
              >
                {product.price}
              </p>

              <button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:brightness-110 active:scale-95 mb-3"
                style={{ background: "#f97316", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>

              <button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:brightness-110 active:scale-95"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
              >
                <Gift size={16} />
                Gift
              </button>

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
                      <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate" style={{ color: "#f2f2f2", fontWeight: 600 }}>{p.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{p.price}</p>
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
