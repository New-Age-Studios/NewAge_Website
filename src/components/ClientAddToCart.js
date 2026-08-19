"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ShoppingCart, Plus, Check, X } from "lucide-react";
import { addToCart } from "@/app/actions/cart";
import LoginModal from "./LoginModal";

export default function ClientAddToCart({ packageId, returnPath, isSecondary = false, alreadyInCart = false, dict = {} }) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(alreadyInCart);
  const [showModal, setShowModal] = useState(false);
  const [loginUrl, setLoginUrl] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || "en";

  useEffect(() => {
    setAdded(alreadyInCart);
  }, [alreadyInCart]);

  const handleAdd = () => {
    if (added && isSecondary) return; // If already added and it is the secondary button, ignore

    startTransition(async () => {
      const formData = new FormData();
      formData.append("packageId", packageId);
      formData.append("returnPath", returnPath);
      
      try {
        const result = await addToCart(formData);
        
        if (result?.error === "login_required") {
          setLoginUrl(result.authUrl);
          setShowLoginModal(true);
          return;
        }

        if (isSecondary) {
          // Only adds to cart and updates the header
          window.dispatchEvent(new Event("cart-updated"));
          setAdded(true);
          setShowModal(true);
        } else {
          // Buy Now: redirects
          router.push(`/${lang}/cart`);
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const btnStyle = isSecondary 
    ? { background: "rgba(255,255,255,0.05)", color: "#ffffff", fontWeight: 700, border: "1px solid rgba(255,255,255,0.1)", cursor: isPending ? "not-allowed" : "pointer" }
    : { background: "#f97316", color: "#fff", fontWeight: 700, border: "none", cursor: isPending ? "not-allowed" : "pointer" };

  return (
    <>
      <button
        onClick={handleAdd}
        disabled={isPending || (added && isSecondary)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:brightness-110 active:scale-95 mb-3 disabled:opacity-70 disabled:cursor-not-allowed"
        style={btnStyle}
      >
        {isPending ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : added && isSecondary ? (
          <>
            <Check size={16} className="text-green-400" />
            <span className="text-green-400">{dict.added_to_cart || "Added to Cart"}</span>
          </>
        ) : isSecondary ? (
          <>
            <Plus size={16} />
            {dict.add_to_cart || "Add to Cart"}
          </>
        ) : (
          <>
            <ShoppingCart size={16} />
            {dict.buy_now || "Buy Now"}
          </>
        )}
      </button>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div 
            className="rounded-2xl p-6 w-full max-w-sm relative animate-in fade-in zoom-in duration-200"
            style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            
            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-400">
                <Check size={24} strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{dict.added_success_title || "Item Added!"}</h3>
              <p className="text-sm text-white/60">{dict.added_success_msg || "Item successfully added to your cart."}</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push(`/${lang}/cart`);
                }}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-95 cursor-pointer"
                style={{ background: "#f97316", color: "#fff" }}
              >
                {dict.go_to_cart || "Go to Cart"}
              </button>
              
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push(`/${lang}/scripts?category=All`);
                }}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:bg-white/5 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {dict.continue_shopping || "Continue Shopping"}
              </button>
            </div>
          </div>
        </div>
      )}

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        loginUrl={loginUrl} 
        dict={dict} 
      />
    </>
  );
}
