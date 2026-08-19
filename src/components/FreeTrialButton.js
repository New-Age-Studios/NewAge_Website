"use client";

import { useTransition, useState } from "react";
import { Sparkles } from "lucide-react";
import { addSubscription } from "@/app/actions/cart";
import LoginModal from "./LoginModal";

export default function FreeTrialButton({ packageId, returnPath, trialDays = 7, dict = {} }) {
  const [isPending, startTransition] = useTransition();
  const [loginUrl, setLoginUrl] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleTrial = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("packageId", packageId);
      formData.append("returnPath", returnPath);
      
      try {
        const result = await addSubscription(formData);
        
        if (result?.error === "login_required") {
          setLoginUrl(result.authUrl);
          setShowLoginModal(true);
          return;
        }

        // If successful without redirecting to auth (e.g. already logged in), go to cart
        window.location.href = "/cart";
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <>
      <button
        onClick={handleTrial}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:brightness-110 active:scale-95 mb-3 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ background: "#4ade80", color: "#14532d", fontWeight: 800, border: "none" }}
      >
        {isPending ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <>
            <Sparkles size={16} />
            {dict.start_trial?.replace('{days}', trialDays) || `Start ${trialDays}-Day Free Trial`}
          </>
        )}
      </button>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        loginUrl={loginUrl} 
        dict={dict} 
      />
    </>
  );
}
