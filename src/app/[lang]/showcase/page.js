import Link from "next/link";
import { ChevronRight, Play, Server, Shield, Zap } from "lucide-react";
import { getDictionary } from "@/dictionaries";

export const metadata = {
  title: "Showcase Server | NewAge Studios",
};

export default async function ShowcasePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        fontFamily: "'Inter', sans-serif", 
        minHeight: "100vh", 
        paddingTop: 80,
        backgroundImage: "url('/background_showcase.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }} 
    >
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none" />

      {/* Background Effects */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-12 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-10 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          <Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.navbar?.home || "Home"}</Link>
          <ChevronRight size={12} />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{dict.navbar?.showcase || "Showcase"}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
              <Server size={14} className="text-orange-500" />
              <span className="text-xs font-bold text-orange-500 tracking-wide uppercase">{dict.showcase.live_server}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1]" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {dict.showcase.title_part1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">{dict.showcase.title_part2}</span>
            </h1>
            
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 500 }}>
              {dict.showcase.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="fivem://connect/cfx.re/join/lerjmz7"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)]"
                style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}
              >
                <Play size={18} fill="currentColor" />
                {dict.showcase.connect_btn}
              </a>
              <div className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                IP: <span className="text-white">cfx.re/join/lerjmz7</span>
              </div>
            </div>
            
            <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              {dict.showcase.requires_fivem}
            </p>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-4 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10 pointer-events-none" />
            
            <div className="p-6 rounded-2xl relative overflow-hidden group" style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}>
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{dict.showcase.features.updated_title}</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{dict.showcase.features.updated_desc}</p>
            </div>

            <div className="p-6 rounded-2xl relative overflow-hidden group" style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}>
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{dict.showcase.features.safe_title}</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{dict.showcase.features.safe_desc}</p>
            </div>
            
            <div className="p-6 rounded-2xl relative overflow-hidden opacity-50" style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.05)" }}>
               <h3 className="text-lg font-bold text-white mb-2">{dict.showcase.features.more_coming}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
