"use client";

import { useState } from "react";
import { Mail, X, Send } from "lucide-react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/newagestudios@outlook.com.br", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: e.target.email.value,
          subject: e.target.subject.value,
          message: e.target.message.value,
          _subject: `New Support Request: ${e.target.subject.value}`,
          _template: "box", // Beautiful HTML template from FormSubmit
          _replyto: e.target.email.value,
        })
      });

      if (response.ok) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(false);
        }, 3500);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all hover:bg-white/10 active:scale-95 border"
        style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}
      >
        <Mail size={18} />
        Send Email
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 animate-backdrop-fade" 
            onClick={() => !loading && setIsOpen(false)} 
          />
          
          <div 
            className="relative w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-modal-pop"
            style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-3 mb-6 rounded-lg text-sm flex gap-3 items-start" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
              <div style={{ color: "#f97316" }} className="mt-0.5 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Note:</strong> Email replies can take up to <strong className="text-orange-400">1 week</strong>. For a faster response, we highly recommend opening a ticket on our Discord server.
              </p>
            </div>

            {success ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60">We've received your email and will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Your Email</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Subject</label>
                  <input 
                    name="subject"
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    placeholder="What do you need help with?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    placeholder="Describe your issue in detail..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                  style={{ background: "#f97316" }}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
