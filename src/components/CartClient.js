"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Check, Trash2, ShieldCheck, Gift } from "lucide-react";
import { goToCheckout, removePackage, applyCoupon, removeCoupon } from "@/app/actions/cart";
import { useRouter } from "next/navigation";

export default function CartClient({ initialBasket, suggestedProducts, allPackages }) {
  const router = useRouter();
  const [basket, setBasket] = useState(initialBasket);
  const [isPending, startTransition] = useTransition();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  useEffect(() => {
    setBasket(initialBasket);
  }, [initialBasket]);

  const packages = basket?.packages || [];
  const totalPrice = basket?.total_price || 0;
  const appliedCoupons = basket?.coupons || [];
  const discount = basket?.discount || 0;

  const handleCheckout = () => {
    startTransition(async () => {
      await goToCheckout();
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode || applyingCoupon) return;
    setApplyingCoupon(true);
    setCouponError("");
    startTransition(async () => {
      try {
        await applyCoupon(couponCode);
        setCouponCode("");
        router.refresh();
      } catch (err) {
        setCouponError(err.message);
      } finally {
        setApplyingCoupon(false);
      }
    });
  };

  const handleRemoveCoupon = (code) => {
    setApplyingCoupon(true);
    startTransition(async () => {
      try {
        await removeCoupon(code);
        router.refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setApplyingCoupon(false);
      }
    });
  };

  const handleRemove = (packageId) => {
    startTransition(async () => {
      await removePackage(packageId);
      // Remove localmente para resposta rápida
      const newPackages = packages.filter(p => (p.package?.id || p.id) !== packageId);
      const newTotal = newPackages.reduce((acc, curr) => {
        const cId = curr.package?.id || curr.id;
        const sProd = allPackages?.find(p => p.id === cId);
        return acc + (sProd?.total_price ?? curr.total_price ?? curr.package?.total_price ?? curr.price ?? curr.base_price ?? 0);
      }, 0);
      setBasket({ ...basket, packages: newPackages, total_price: newTotal });
      router.refresh();
    });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0a", minHeight: "100vh", paddingTop: 100, paddingBottom: 100 }}>
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex items-end justify-between border-b border-white/10 pb-6 mb-10">
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif", letterSpacing: "-0.02em" }}>
            Cart
          </h1>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            {packages.length} packages
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          
          {/* Coluna Esquerda */}
          <div>
            {packages.length === 0 ? (
              <div className="mb-12">
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, marginBottom: 20 }}>
                  Your basket is empty. Your players are missing out on the ultimate FiveM experience.
                </p>
                <Link
                  href="/scripts"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
                  style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" }}
                >
                  Browse Scripts
                  <ChevronRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mb-12">
                {packages.map((pkg, i) => {
                  const pkgId = pkg.package?.id || pkg.id;
                  const storeProduct = allPackages?.find(p => p.id === pkgId);
                  const itemPrice = storeProduct?.total_price ?? storeProduct?.base_price ?? pkg.total_price ?? pkg.package?.total_price ?? pkg.price ?? pkg.base_price ?? 0;
                  return (
                  <div key={i} className="flex gap-5 p-5 rounded-2xl relative transition-transform hover:scale-[1.01]" style={{ background: "linear-gradient(145deg, #141414, #1a1a1a)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                    <div className="w-32 h-24 rounded-xl bg-black/50 overflow-hidden relative shrink-0 border border-white/5">
                      <img src={pkg.package?.image || pkg.image || '/na-studios.svg'} alt={pkg.package?.name || pkg.name || 'Product'} className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform hover:scale-110 duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0 pr-10">
                      <p className="text-xl font-extrabold text-white mb-1 truncate tracking-tight">{pkg.package?.name || pkg.name || 'Unknown Item'}</p>
                      <p className="text-sm font-semibold text-orange-400/70 mb-2">FiveM Script</p>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-orange-500">
                          {itemPrice === 0 ? "FREE" : `$${itemPrice}`}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemove(pkg.package?.id || pkg.id)}
                      disabled={isPending}
                      className="absolute top-1/2 -translate-y-1/2 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                      title="Remove from Cart"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  );
                })}
              </div>
            )}

            {/* Upsell Section */}
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif", marginBottom: 8 }}>
                Make Your Server Perfect.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 24 }}>
                Our scripts are built to complement each other. Add more now for a smoother, more immersive server — your players will thank you.
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="relative overflow-hidden w-full h-32">
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)" }} />
                      <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-bold text-white truncate mr-2">{product.name}</p>
                        <p className="text-sm font-bold text-white/50">{product.total_price === 0 ? "FREE" : `$${product.total_price}`}</p>
                      </div>
                      <p className="text-xs text-white/40 mb-4 line-clamp-3 leading-relaxed flex-1">
                        {product.description?.replace(/<[^>]*>?/gm, '')}
                      </p>
                      <Link
                        href={`/scripts/${product.id}`}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-colors hover:bg-white/10"
                        style={{ border: "1px solid rgba(249,115,22,0.4)", color: "#f97316" }}
                      >
                        <ShoppingCart size={14} />
                        View Script
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="flex flex-col gap-6">
            
            {/* Coupon Block */}
            <div className="rounded-2xl p-5" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Gift size={16} className="text-white/70" />
                <span className="text-sm font-bold text-white">Apply Coupon</span>
              </div>
              <div className="flex gap-0 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <input 
                  type="text" 
                  placeholder="Enter coupon" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  className="flex-1 bg-white/5 px-4 py-2.5 text-sm text-white outline-none"
                  disabled={applyingCoupon}
                />
                <button 
                  onClick={handleApplyCoupon}
                  disabled={applyingCoupon || !couponCode}
                  className="px-4 py-2.5 text-sm font-bold transition-colors hover:brightness-110 disabled:opacity-50" 
                  style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
                >
                  {applyingCoupon ? "..." : "Apply"}
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-xs mt-3">{couponError}</p>
              )}
              {appliedCoupons.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  {appliedCoupons.map((c, i) => {
                    const codeString = typeof c === 'string' ? c : (c.coupon_code || c.code || c.coupon || JSON.stringify(c));
                    return (
                    <div key={i} className="flex justify-between items-center bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                      <span className="text-xs font-bold text-orange-400">{codeString}</span>
                      <button 
                        onClick={() => handleRemoveCoupon(codeString)}
                        disabled={applyingCoupon}
                        className="text-white/30 hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )})}
                </div>
              )}
            </div>

            {/* Cart Summary */}
            <div className="rounded-2xl p-6" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="text-lg font-bold text-white mb-5">Cart Summary</h3>
              
              <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/50">Sub total</span>
                  <span className="text-sm text-white/80">{packages.length === 0 ? "$0" : totalPrice === 0 ? "Free" : `$${totalPrice}`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/50">Sales Tax</span>
                  <span className="text-sm text-white/80">{packages.length === 0 ? "$0" : "Free"}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-orange-400">
                    <span className="text-sm font-bold">Discount</span>
                    <span className="text-sm font-bold">-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-base font-bold text-white">Total Price</span>
                  <span className="text-lg font-bold text-white">{packages.length === 0 ? "$0" : totalPrice === 0 ? "Free" : `$${totalPrice}`}</span>
                </div>
                <p className="text-xs text-white/30 text-right mt-1">USD estimated; charged at checkout</p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isPending || packages.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mb-5"
                style={{ background: "#f97316", color: "#fff", fontWeight: 700, border: "none" }}
              >
                {isPending ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    Secure Checkout
                  </>
                )}
              </button>

              <div className="flex items-center justify-center mb-6">
                <img src="/we-accept.webp" alt="Payment Methods" className="h-6 object-contain opacity-80" />
              </div>

              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <div className="flex items-center gap-2 opacity-50 mb-1">
                  <span className="text-sm font-semibold text-white">Powered by</span>
                  <img src="/tebex-logo.webp" alt="Tebex" className="h-5 object-contain" />
                </div>
                <p className="text-[11px] text-white/30 leading-relaxed max-w-[280px]">
                  Our checkout process is owned & operated by Tebex Limited, who handle product fulfilment, billing support and refunds.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// Pequeno ícone de ChevronRight
function ChevronRight(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
