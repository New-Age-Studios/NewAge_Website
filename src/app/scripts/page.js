import Link from "next/link";
import { getPackages } from "@/lib/tebex";

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
          Scripts
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/scripts/${product.id}`}
              className="group block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <div
                  className="absolute inset-0"
                  style={{ background: product.cardGradient }}
                />
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <div
                    className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs"
                    style={{ background: "rgba(0,0,0,0.6)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.4)", fontWeight: 700, backdropFilter: "blur(6px)" }}
                  >
                    {product.badge}
                  </div>
                )}
                {/* IO logo watermark */}
                <div
                  className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(249,115,22,0.9)", color: "#fff", fontSize: 10, fontWeight: 800 }}
                >
                  IO
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: "#f2f2f2", fontWeight: 600 }}>{product.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{product.category}</p>
                </div>
                <span
                  className="text-sm px-2.5 py-1 rounded-md"
                  style={{ background: "rgba(249,115,22,0.12)", color: "#f97316", fontWeight: 700, border: "1px solid rgba(249,115,22,0.2)" }}
                >
                  {product.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
