import Link from "next/link";
import { ChevronDown, HelpCircle, Star } from "lucide-react";

const reviews = [
  {
    text: "I was having an issue, I contacted the team and they walked me step-by-step on how to solve it. It turned out that it was something on my part. After getting information, the team resolved the issue the same day. Will recommend to anyone!",
    author: "@pralay777",
  },
  {
    text: "Absolutely amazing, I'm new to this and the fella talked me through step-by-step on how to configure the mechanic script. Not only did he do that, he also identified issues I had and resolved them quickly. A true legend in the fivem community. Not only that but amazing product!",
    author: "@abi10j",
  },
  {
    text: "I just wanted to let anyone that might see this know that this is the best development company and best scripts I have ever come across. I went out of my way to focus to help me get IO scripts and these guys helped me and I am truly grateful!",
    author: "@govanbern24",
  },
  {
    text: "New to coding and the way IO supported helped me with installation was beyond my expectations of professionalism in customer service. I honestly I have gain my respect and loyalty for scripts. Made me feel like a personal friend more than a customer. Exceptional service.",
    author: "@govanbern24",
  },
];

const trustedLogos = [
  { label: "OCRP", style: { fontWeight: 900, fontSize: 22, letterSpacing: -1 } },
  { label: "qbcore", style: { fontWeight: 800, fontSize: 20 } },
  { label: "W", style: { fontWeight: 900, fontSize: 28, fontStyle: "italic" } },
  { label: "13", style: { fontWeight: 900, fontSize: 26 } },
];

const footerColumns = [
  {
    title: "Pages",
    links: [
      { label: "All Scripts", href: "/scripts" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Documentation", href: "/docs" },
      { label: "Support", href: "/support" },
      { label: "About", href: "/about" },
      { label: "Brand Guide", href: "/brand" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Sale", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refunds", href: "/refunds" },
      { label: "Cookie Consent", href: "/cookies" },
      { label: "Tebex Impressum", href: "/impressum" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Discord", href: "https://discord.gg" },
      { label: "Cfx.re Profile", href: "https://forum.cfx.re" },
      { label: "GitHub", href: "https://github.com" },
      { label: "YouTube", href: "https://youtube.com" },
      { label: "X (formerly Twitter)", href: "https://x.com" },
    ],
  },
  {
    title: "More from IO",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "HUD Themes", href: "/hud-themes" },
      { label: "Configurator", href: "/configurator" },
      { label: "FiveM Artifacts DB", href: "/artifacts" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0a" }}>
      {/* Reviews */}
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-20">
        <div className="text-center mb-10">
          <h2
            className="mb-2"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif" }}
          >
            Reviews
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            We've received 972+ five-star reviews from our customers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="rounded-xl p-5 flex flex-col justify-between gap-4"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={13} fill="#f97316" color="#f97316" />
                  ))}
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.75 }}>{r.text}</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: 600 }}>{r.author}</p>
            </div>
          ))}
        </div>
      </div>

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
            Trusted by the best
          </h2>
          <p className="mb-10" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            We're trusted by the most popular and well-known communities.
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {trustedLogos.map((logo) => (
              <span
                key={logo.label}
                style={{ ...logo.style, color: "rgba(255,255,255,0.25)", fontFamily: "'Barlow', sans-serif", transition: "color 0.2s" }}
                className="hover:!text-white/60 cursor-default select-none"
              >
                {logo.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Support CTA */}
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 pb-16 pt-16">
        <div
          className="rounded-2xl flex flex-col items-center text-center py-14 px-6"
          style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
            style={{ background: "#f97316" }}
          >
            <HelpCircle size={26} color="#fff" strokeWidth={2.5} />
          </div>

          <h2
            className="mb-3"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif" }}
          >
            Got a Question?
          </h2>
          <p
            className="mb-7 max-w-lg"
            style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7 }}
          >
            Our support center offers FAQs, links to helpful guides, and direct contact options
            if you need further assistance.
          </p>

          <Link
            href="/support"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm transition-all hover:brightness-110 active:scale-95"
            style={{ background: "rgba(255,255,255,0.1)", color: "#f2f2f2", border: "1px solid rgba(255,255,255,0.15)", fontWeight: 600 }}
          >
            Get Support
            <span style={{ fontSize: 16 }}>→</span>
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-12"
      >
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#f97316", color: "#fff", fontSize: 10, fontWeight: 800 }}
              >
                IO
              </div>
              <span style={{ color: "#f2f2f2", fontWeight: 700, fontSize: 15 }}>Scripts</span>
            </div>

            <div className="flex items-center gap-1.5 mb-5">
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>Powered by</span>
              <span
                className="flex items-center gap-1 px-1.5 py-0.5 rounded"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>⬡</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>tebex</span>
              </span>
            </div>

            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.65, maxWidth: 200 }}>
              The most popular vehicle scripts for your FiveM server.
            </p>

            <div className="mt-5">
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginBottom: 6 }}>Currency:</p>
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
              >
                <span>🇧🇷</span>
                <span style={{ fontWeight: 600 }}>BRL</span>
                <ChevronDown size={12} />
              </button>
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
          Copyright © 2026, IO Scripts. Not affiliated with or endorsed by Rockstar North, Take-Two Interactive or other rights holders. FiveM is a copyright and registered
          trademark of Take-Two Interactive Software, Inc. Our checkout process is owned &amp; operated by Tebex Limited, who handle product fulfilment, billing support and refunds.
          Displayed prices may be estimates using a conversion rate updated once per day. Checkout will always be in USD, GBP, EUR, CAD or AUD; so final price may differ depending
          on bank/payment processor exchange rate.
        </p>
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 6 }}>
          *Achievement statistics are based on cumulative player and server counts from the first 9 scripts listed in 5Metrics prefixed with{" "}
          <span style={{ color: "rgba(255,255,255,0.3)" }}>io</span>.
        </p>
      </div>
    </footer>
  );
}
