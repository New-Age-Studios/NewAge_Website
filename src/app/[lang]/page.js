import Link from "next/link";
import { CloudDownload, Heart, ShieldCheck, Smile, Flame, ArrowRight } from "lucide-react";
import { getPackages } from "@/lib/tebex";
import { getDictionary } from "@/dictionaries";
import { cookies } from "next/headers";
import { getExchangeRates, formatCurrency } from "@/lib/currency";

const features = [
  {
    icon: <CloudDownload size={42} strokeWidth={1.5} />,
    title: "Instant Delivery",
    desc: "Available within minutes in your Cfx.re Portal account.",
  },
  {
    icon: <Heart size={42} strokeWidth={1.5} />,
    title: "Free Updates Forever",
    desc: "We promise to never charge you for an update, not even a v2.",
  },
  {
    icon: <ShieldCheck size={42} strokeWidth={1.5} />,
    title: "Secure & Performant",
    desc: "Low resmon usage, secured events & designed for scale.",
  },
  {
    icon: <Smile size={42} strokeWidth={1.5} />,
    title: "Easy Setup",
    desc: "Quick and easy setup, with support available 24/7.",
  },
];

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const cookieStore = await cookies();
  const currencyCode = cookieStore.get("NEXT_CURRENCY")?.value || "USD";
  const rates = await getExchangeRates();
  
  const products = await getPackages();
  
  // Try to find the exact products requested by the user, if not, fallback to first 3 products
  const targetNames = ["los santos river", "vinewood pawn shop", "cayo perico fuel station"];
  let bestSellers = products.filter(p => targetNames.some(t => p.name.toLowerCase().includes(t)));
  if (bestSellers.length < 3) {
    bestSellers = [...bestSellers, ...products.filter(p => !bestSellers.find(b => b.id === p.id))].slice(0, 3);
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#141414", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative flex items-center min-h-[90vh] overflow-hidden pt-16"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Gradient Overlay for text readability (Darker on the left) and fading into the next section at the bottom */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.6) 40%, rgba(20,20,20,0) 100%), linear-gradient(to bottom, rgba(20,20,20,0) 60%, rgba(20,20,20,1) 100%)"
          }}
        />

        <div className="relative z-10 container mx-auto max-w-[1200px] px-6 lg:px-12 py-20 flex flex-col items-start">
          
          {/* Pill Badge */}
          <div 
            className="inline-flex items-center justify-center px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(249,115,22,0.2)", border: "1px solid rgba(249,115,22,0.3)" }}
          >
            <span style={{ color: "#f97316", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", lineHeight: 1, paddingTop: "1px" }}>
              {dict.home.badge}
            </span>
          </div>

          <h1
            className="text-white leading-[1.05] tracking-tight mb-6 max-w-2xl"
            style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", fontWeight: 900, fontFamily: "'Barlow', sans-serif" }}
          >
            {dict.home.title_part1} <br/> {dict.home.title_part2} <span style={{ color: "#f97316" }}>{dict.home.title_highlight}</span>
          </h1>
          
          <p className="mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1.6 }}>
            {dict.home.subtitle}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href={`/${lang}/scripts`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-sm text-white font-bold transition-all hover:brightness-110 active:scale-95"
              style={{ background: "#f97316" }}
            >
              {dict.home.explore_btn}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20" style={{ background: "#141414" }}>
        <div className="container max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            <div className="flex items-start gap-4">
              <div style={{ color: "#f97316", flexShrink: 0 }}><CloudDownload size={42} strokeWidth={1.5} /></div>
              <div>
                <p className="text-base md:text-lg mb-1" style={{ color: "#f2f2f2", fontWeight: 700, letterSpacing: "-0.01em" }}>{dict.home.features.instant_title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{dict.home.features.instant_desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div style={{ color: "#f97316", flexShrink: 0 }}><Heart size={42} strokeWidth={1.5} /></div>
              <div>
                <p className="text-base md:text-lg mb-1" style={{ color: "#f2f2f2", fontWeight: 700, letterSpacing: "-0.01em" }}>{dict.home.features.updates_title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{dict.home.features.updates_desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div style={{ color: "#f97316", flexShrink: 0 }}><ShieldCheck size={42} strokeWidth={1.5} /></div>
              <div>
                <p className="text-base md:text-lg mb-1" style={{ color: "#f2f2f2", fontWeight: 700, letterSpacing: "-0.01em" }}>{dict.home.features.secure_title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{dict.home.features.secure_desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div style={{ color: "#f97316", flexShrink: 0 }}><Smile size={42} strokeWidth={1.5} /></div>
              <div>
                <p className="text-base md:text-lg mb-1" style={{ color: "#f2f2f2", fontWeight: 700, letterSpacing: "-0.01em" }}>{dict.home.features.setup_title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{dict.home.features.setup_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20" style={{ background: "#141414" }}>
        <div className="container max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Flame size={20} />
            <h2 className="text-xl font-semibold">{dict.home.best_sellers}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {bestSellers.map((product) => (
              <Link
                key={product.id}
                href={`/${lang}/scripts/${product.id}`}
                className="group block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden transform-gpu" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 z-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-3">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-sm inline-block self-start"
                    style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", fontWeight: 800, letterSpacing: "0.05em" }}
                  >
                    {product.category?.name?.toUpperCase() || "MAPS"}
                  </span>
                  
                  <div>
                    <p className="text-lg mb-1" style={{ color: "#f2f2f2", fontWeight: 700 }}>{product.name}</p>
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {product.total_price === 0 ? dict.home.free : formatCurrency(product.total_price, currencyCode, rates)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link 
              href={`/${lang}/scripts`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-95"
              style={{ background: "#3d2514", color: "#e8a068" }}
            >
              {dict.home.view_all} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
