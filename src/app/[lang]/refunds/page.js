export const metadata = {
  title: 'Refund Policy | New Age Studios',
  description: 'Refund policy for New Age Studios products.',
};

export default function RefundsPage() {
  return (
    <div className="select-text" style={{ fontFamily: "'Inter', sans-serif", background: "#141414", minHeight: "100vh", paddingTop: 80, paddingBottom: 80 }}>
      <div className="container mx-auto max-w-[800px] px-6 lg:px-12 py-12">
        <h1
          className="mb-10 text-center"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif" }}
        >
          Refunds
        </h1>

        <div className="max-w-none" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "15px" }}>
          
          <div className="mb-10 p-5 rounded-xl border border-red-500/20 bg-red-500/10">
            <h2 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              Strict No Refund Policy
            </h2>
            <p className="text-red-200/80">
              Please note: Due to the nature of digital goods and immediate access to our files, <strong>all purchases made at New Age Studios are final and non-refundable under any circumstances.</strong>
            </p>
          </div>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Tebex Limited & Billing</h2>
          <p className="mb-4">
            Our Merchant of Record (MoR), Tebex Limited, is responsible for billing support and refunds. Because all digital software and items provided are instantly delivered and consumed, Tebex Limited does not offer refunds for purchases made on the platform. You can learn more by reading the <a href="https://checkout.tebex.io/terms" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Tebex Checkout T&Cs</a>.
          </p>
          <p className="mb-6">
            By completing a purchase, you agree to these terms and waive any right to a refund. Personal errors, such as purchasing a product twice, being logged into the wrong account, or making an accidental purchase, are not eligible for a refund.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Technical Support</h2>
          <p className="mb-6">
            If you have technical issues with a script or map, please contact our support team on Discord. We are fully committed to helping you resolve any bugs or installation issues. However, the inability to configure a script correctly, incompatibility with highly modified frameworks, or refusal to cooperate with our support team does not qualify for a refund.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Subscriptions & Recurring Payments</h2>
          <p className="mb-6">
            Subscription packages (if applicable) are NOT eligible for refunds under any circumstances. You can cancel your subscription at any time, and no further payments will be taken. There are no fees or minimum terms for cancellation. Cancelling a subscription will revoke your access to any packages within the subscription at the end of your billing cycle.
          </p>
          
          <h2 className="text-xl font-bold text-white mt-12 mb-4">Contacting Tebex</h2>
          <p className="mb-10">
            If you would like to dispute a payment with a subscription purchase or have a specific billing inquiry, please contact our MoR Tebex Limited here: <a href="https://tebex.io/support-customer-form" target="_blank" rel="noreferrer" className="text-orange-500 hover:text-orange-400 underline">tebex.io/support-customer-form</a>.
          </p>

          <p className="text-sm pt-8 mt-8 border-t border-white/10" style={{ color: "rgba(255,255,255,0.3)" }}>
            Last Updated: 17th June 2026
          </p>
        </div>
      </div>
    </div>
  );
}
