export default function LoginModal({ isOpen, onClose, loginUrl, dict = {} }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div 
        className="rounded-2xl p-6 w-full max-w-sm relative animate-in fade-in zoom-in duration-200"
        style={{ background: "#191919", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{dict.login_required_title || "Login Required"}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{dict.login_required_msg || "You need to log in with your Cfx.re account to perform this action."}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              if (loginUrl) window.location.href = loginUrl;
            }}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-95 cursor-pointer"
            style={{ background: "#f97316", color: "#fff" }}
          >
            {dict.login_btn || "Log In"}
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:bg-white/5 cursor-pointer"
            style={{ background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {dict.cancel || "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
