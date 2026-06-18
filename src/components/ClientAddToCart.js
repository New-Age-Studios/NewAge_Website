"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Plus, Check } from "lucide-react";
import { addToCart } from "@/app/actions/cart";

export default function ClientAddToCart({ packageId, returnPath, isSecondary = false, alreadyInCart = false, dict = {} }) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(alreadyInCart);
  const router = useRouter();

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
        await addToCart(formData);
        
        if (isSecondary) {
          // Only adds to cart and updates the header
          window.dispatchEvent(new Event("cart-updated"));
          setAdded(true);
        } else {
          // Buy Now: redirects
          router.push("/cart");
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
  );
}
