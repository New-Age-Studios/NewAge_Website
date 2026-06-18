import Link from "next/link";
import { ChevronRight, MessageSquare, Headphones } from "lucide-react";
import ContactModal from "@/components/ContactModal";
import { getDictionary } from "@/dictionaries";

export const metadata = {
  title: "Support | NewAge Studios",
};

export default async function SupportPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0a", minHeight: "100vh", paddingTop: 80 }} className="relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-12 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-10 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          <Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.navbar?.home || "Home"}</Link>
          <ChevronRight size={12} />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{dict.navbar?.support || "Support"}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-stretch">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
              <Headphones size={14} className="text-orange-500" />
              <span className="text-xs font-bold text-orange-500 tracking-wide uppercase">{dict.support.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1]" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {dict.support.title_part1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">{dict.support.title_part2}</span>
            </h1>
            
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 500 }}>
              {dict.support.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a 
                href="https://discord.gg/FbbVp5tcEZ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(88,101,242,0.3)] hover:shadow-[0_0_60px_rgba(88,101,242,0.5)]"
                style={{ background: "#5865F2" }} 
              >
                <MessageSquare size={18} fill="currentColor" />
                {dict.support.join_discord}
              </a>
              <ContactModal dict={dict.support.email_modal} />
            </div>

             {/* Quick Steps */}
            <div className="grid sm:grid-cols-2 gap-4">
               <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                 <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 text-white font-bold" style={{ background: "rgba(255,255,255,0.1)" }}>1</div>
                 <h3 className="font-bold text-white mb-1">{dict.support.step1_title}</h3>
                 <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{dict.support.step1_desc}</p>
               </div>
               <div className="p-5 rounded-xl relative overflow-hidden" style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.2)" }}>
                 <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/20 blur-2xl rounded-full" />
                 <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 text-white font-bold relative z-10" style={{ background: "#f97316" }}>2</div>
                 <h3 className="font-bold text-white mb-1 relative z-10">{dict.support.step2_title}</h3>
                 <p className="text-sm relative z-10 mb-4" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{dict.support.step2_desc}</p>
                 <a 
                   href="https://discord.com/channels/1244486956302336051/1328073694433509537" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-xs font-bold transition-colors hover:text-orange-400 relative z-10 uppercase tracking-widest"
                   style={{ color: "#f97316" }}
                 >
                   {dict.support.go_to_channel} <ChevronRight size={12} strokeWidth={3} />
                 </a>
               </div>
            </div>
          </div>

          {/* Right Side - Discord Widget */}
          <div className="relative">
            {/* Glow behind widget */}
            <div className="absolute inset-0 bg-[#5865F2] blur-[80px] opacity-10 rounded-full pointer-events-none" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col" style={{ border: "1px solid rgba(255,255,255,0.05)", background: "#141414" }}>
              {/* Fake window header */}
              <div className="flex items-center justify-between px-4 py-3 border-b shrink-0" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)" }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-medium text-white/30 uppercase tracking-widest">{dict.support.live_status}</span>
              </div>
              
              <iframe 
                src="https://discord.com/widget?id=1244486956302336051&theme=dark" 
                width="100%" 
                allowtransparency="true" 
                frameBorder="0" 
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="w-full flex-1 bg-[#1e2124]"
                style={{ display: "block", minHeight: "560px" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
