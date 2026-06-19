import Link from "next/link";
import { HelpCircle } from "lucide-react";
import CurrencySelector from "@/components/CurrencySelector";

const partnerLogos = [
  { src: "/mri.png", alt: "MRI", h: "h-28 md:h-32" },
  { src: "/logo-orus.png", alt: "Orus", h: "h-24 md:h-28" },
  { src: "/na-studios.svg", alt: "NA Studios", h: "h-20 md:h-24" },
  { src: "/retengenharia.png", alt: "Ret Engenharia", h: "h-16 md:h-20" },
];

// Repeat logos to ensure the track is wide enough to scroll seamlessly
const carouselLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

export default function Footer({ lang = "en", dict = {}, currencyCode = "USD" }) {
  const footerColumns = [
    {
      title: dict.cols?.pages || "Pages",
      links: [
        { label: dict.links?.home || "Home", href: `/${lang}` },
        { label: dict.links?.products || "Products", href: `/${lang}/scripts` },
        { label: dict.links?.cart || "Cart", href: `/${lang}/cart` },
      ],
    },
    {
      title: dict.cols?.legal || "Legal",
      links: [
        { label: dict.links?.terms || "Terms of Sale", href: `/${lang}/terms` },
        { label: dict.links?.privacy || "Privacy Policy", href: `/${lang}/privacy` },
        { label: dict.links?.refunds || "Refunds", href: `/${lang}/refunds` },
        { label: dict.links?.impressum || "Tebex Impressum", href: "https://checkout.tebex.io/impressum" },
      ],
    },
    {
      title: dict.cols?.socials || "Socials",
      links: [
        { label: dict.links?.discord || "Discord", href: "https://discord.gg/FbbVp5tcEZ" },
        { label: dict.links?.cfx || "Cfx.re Profile", href: "https://forum.cfx.re/u/newagestudios" },
        { label: dict.links?.github || "GitHub", href: "https://github.com/New-Age-Studios" },
        { label: dict.links?.youtube || "YouTube", href: "https://www.youtube.com/@NewAgeStudiosOficial" },
      ],
    },
    {
      title: dict.cols?.more || "More from New Age",
      links: [
        { label: dict.links?.blog || "Blog", href: `/${lang}/blog` },
        { label: dict.links?.map_packages || "Map Packages", href: `/${lang}/scripts` },
        { label: dict.links?.community || "Community", href: "https://discord.gg/newage" },
      ],
    },
  ];

  return (
    <footer style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Trusted by the best */}
      <div
        className="py-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 text-center">
          <h2
            className="mb-2"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif" }}
          >
            {dict.trusted_title || "Trusted by the best"}
          </h2>
          <p className="mb-10" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            {dict.trusted_desc || "We're trusted by the most popular and well-known communities."}
          </p>
          <div className="logo-slider">
            <div className="logo-track">
              {/* Render twice for a seamless infinite loop (transform -50%) */}
              {[...carouselLogos, ...carouselLogos].map((logo, i) => (
                <div key={i} className="flex items-center justify-center shrink-0">
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className={`${logo.h} object-contain partner-logo`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ background: "#191919" }}>
        <div
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-12"
        >
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center justify-start">
              <Link href={`/${lang}`}>
                <img 
                  src="/na-studios.svg" 
                  alt="New Age Studios" 
                  className="h-8 md:h-10 object-contain"
                  style={{ filter: "brightness(0) invert(1)" }} 
                />
              </Link>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 500 }}>{dict.powered_by || "Powered by"}</span>
              <div className="flex items-center">
                <img src="/tebex-logo.webp" alt="Tebex" className="h-8 opacity-80" />
              </div>
            </div>

            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.65, maxWidth: 220 }}>
              {dict.about || "O estúdio focado em levar máxima imersão, qualidade visual e alta performance para revolucionar o mundo do Roleplay no FiveM."}
            </p>

            <div className="mt-5">
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginBottom: 6 }}>{dict.currency || "Currency:"}</p>
              <CurrencySelector initialCurrencyCode={currencyCode} />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p
                  className="mb-4"
                  style={{ color: "#f2f2f2", fontWeight: 700, fontSize: 13 }}
                >
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-xs transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-6"
      >
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, lineHeight: 1.7 }}>
          {dict.copyright || "Copyright © 2026, New Age Studios. Not affiliated with or endorsed by Rockstar North, Take-Two Interactive or other rights holders. FiveM is a copyright and registered trademark of Take-Two Interactive Software, Inc. Our checkout process is owned & operated by Tebex Limited, who handle product fulfilment, billing support and refunds. Displayed prices may be estimates using a conversion rate updated once per day. Checkout will always be in USD, GBP, EUR, CAD, AUD or BRL; so final price may differ depending on bank/payment processor exchange rate."}
        </p>
        </div>
      </div>
    </footer>
  );
}
