import { getDictionary } from "@/dictionaries";
import { CheckCircle, Download, ShoppingCart } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

export default async function SuccessPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { lang } = params;
  const dict = await getDictionary(lang);

  // Read transaction ID from Tebex URL params (tbx-id or txnId)
  const transactionId =
    searchParams?.["tbx-id"] ||
    searchParams?.txnId ||
    searchParams?.transaction_id ||
    null;

  const t = dict.success || {
    title: "Order Complete!",
    subtitle: "Thank you! Your products are now available in your Portal Account.",
    itemsPurchased: "ITEMS PURCHASED",
    transactionId: "TRANSACTION ID",
    orderSummary: "ORDER SUMMARY",
    subtotal: "Subtotal",
    salesTax: "Sales Tax",
    total: "Total",
    downloadAssets: "Download Assets",
    continueShopping: "Continue Shopping",
    discord: "Discord",
    noItems: "No items to display.",
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        paddingTop: 100,
        paddingBottom: 60,
        backgroundImage: "url('/nadigital.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none" />

      {/* Background Effects */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-[700px] px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
            <CheckCircle className="text-green-500 w-14 h-14" strokeWidth={1.5} />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {t.title}
          </h1>
          <p className="text-[#a1a1aa] text-lg max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden mb-6">
          
          {/* Transaction ID */}
          {transactionId && (
            <div className="px-6 py-5 border-b border-[#27272a] flex items-center justify-between flex-wrap gap-2">
              <span className="text-[#a1a1aa] text-xs font-semibold tracking-wider uppercase">
                {t.transactionId}
              </span>
              <span className="text-white font-mono text-sm bg-[#27272a] px-3 py-1 rounded-lg break-all">
                {transactionId}
              </span>
            </div>
          )}

          {/* Message */}
          <div className="px-6 py-8 text-center">
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              {lang === "pt-br"
                ? "Seu pagamento foi confirmado. Acesse o painel abaixo para baixar seus assets no CFX Portal."
                : "Your payment has been confirmed. Access the panel below to download your assets on the CFX Portal."}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href="https://portal.cfx.re/assets/granted-assets?search=new"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#ff5100] hover:bg-[#e64a00] text-white py-4 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors text-base"
          >
            <Download size={20} />
            {t.downloadAssets}
          </a>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${lang}/products`}
              className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors text-sm"
            >
              <ShoppingCart size={16} />
              {t.continueShopping}
            </Link>

            <a
              href="https://discord.gg/tyKTs4QyYA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors text-sm"
            >
              <FaDiscord size={18} />
              {t.discord}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
