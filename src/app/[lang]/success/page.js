import { getDictionary } from "@/dictionaries";
import { CheckCircle, Download, ShoppingCart } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";
import { getBasketData } from "@/app/actions/cart";
import ClearCartOnSuccess from "@/components/ClearCartOnSuccess";

export default async function SuccessPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { lang } = params;
  const dict = await getDictionary(lang);
  
  // Try to get basket data if it's still available, otherwise use defaults
  const basket = await getBasketData();
  const username = basket?.username || "Player";
  
  // Transaction ID might be passed in URL by Tebex, e.g. ?txnId=... or we mock it
  const transactionId = searchParams?.txnId || searchParams?.transaction_id || `tbx-${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 8)}`;
  
  const items = basket?.packages || [];
  const currency = basket?.currency || "USD";
  const subtotal = basket?.price || 0;
  
  const t = dict.success || {
    title: "Order Complete!",
    subtitle: "Thank you, {username}! Your products are now available in your Portal Account.",
    itemsPurchased: "ITEMS PURCHASED",
    transactionId: "TRANSACTION ID",
    orderSummary: "ORDER SUMMARY",
    subtotal: "Subtotal",
    salesTax: "Sales Tax",
    total: "Total",
    downloadAssets: "Download Assets",
    continueShopping: "Continue Shopping",
    discord: "Discord",
    noItems: "No items to display."
  };

  const subtitle = t.subtitle.replace("{username}", `<strong class="text-white">${username}</strong>`);

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
        backgroundAttachment: "fixed"
      }}
    >
      <ClearCartOnSuccess />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none" />

      {/* Background Effects */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Background Grid Pattern (similar to screenshot) */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto max-w-[1000px] px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
            <CheckCircle className="text-green-500 w-12 h-12" strokeWidth={2} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {t.title}
          </h1>
          <p className="text-[#a1a1aa] text-lg max-w-2xl" dangerouslySetInnerHTML={{ __html: subtitle }} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Left Column: Items */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#18181b] border border-[#27272a] rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-[#27272a]">
                <h2 className="text-[#a1a1aa] text-xs font-semibold tracking-wider uppercase">{t.itemsPurchased}</h2>
              </div>
              
              <div className="p-6">
                {items.length > 0 ? (
                  <div className="space-y-6">
                    {items.map((pkg, idx) => {
                      const pkgName = pkg.package?.name || pkg.name || 'Unknown Item';
                      const pkgImage = pkg.package?.image || pkg.image;
                      const pkgPrice = pkg.package?.price ?? pkg.price ?? 0;
                      
                      return (
                        <div key={idx} className="flex gap-4">
                          <div className="w-32 h-20 bg-[#27272a] rounded-md overflow-hidden flex-shrink-0">
                            {pkgImage && (
                              <img src={pkgImage} alt={pkgName} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="text-white font-bold">{pkgName}</h3>
                              <span className="text-[#a1a1aa] text-sm">{currency} {Number(pkgPrice).toFixed(2)}</span>
                            </div>
                            <p className="text-[#a1a1aa] text-sm line-clamp-2">
                              {/* In a real scenario we'd strip HTML from pkg.description here if needed */}
                              Purchased package from New Age Studios.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#a1a1aa]">
                    <p>{t.noItems}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Details & Actions */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Transaction ID */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6">
              <h2 className="text-[#a1a1aa] text-xs font-semibold tracking-wider uppercase mb-2">{t.transactionId}</h2>
              <p className="text-white font-mono text-sm break-all">{transactionId}</p>
            </div>

            {/* Order Summary */}
            <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6">
              <h2 className="text-[#a1a1aa] text-xs font-semibold tracking-wider uppercase mb-4">{t.orderSummary}</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#a1a1aa]">{t.subtotal}</span>
                  <span className="text-[#a1a1aa]">{currency} {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#a1a1aa]">{t.salesTax}</span>
                  <span className="text-[#a1a1aa]">{currency} 0.00</span>
                </div>
                <div className="border-t border-[#27272a] pt-3 mt-3 flex justify-between font-bold">
                  <span className="text-white">{t.total}</span>
                  <span className="text-white">{currency} {subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a 
                href="https://portal.cfx.re/assets/granted-assets?search=new"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#ff5100] hover:bg-[#e64a00] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
              >
                <Download size={18} />
                {t.downloadAssets}
              </a>
              
              <div className="flex flex-col xl:flex-row gap-3">
                <Link 
                  href={`/${lang}/products`}
                  className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-white py-3 px-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm whitespace-nowrap"
                >
                  <ShoppingCart size={16} />
                  {t.continueShopping}
                </Link>
                
                <a 
                  href="https://discord.gg/tyKTs4QyYA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-white py-3 px-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm whitespace-nowrap"
                >
                  <FaDiscord size={18} />
                  {t.discord}
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
