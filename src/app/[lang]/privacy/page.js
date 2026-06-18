export const metadata = {
  title: 'Privacy Policy | New Age Studios',
  description: 'Privacy policy and data handling for New Age Studios.',
};

export default function PrivacyPage() {
  return (
    <div className="select-text" style={{ fontFamily: "'Inter', sans-serif", background: "#141414", minHeight: "100vh", paddingTop: 80, paddingBottom: 80 }}>
      <div className="container mx-auto max-w-[800px] px-6 lg:px-12 py-12">
        <h1
          className="mb-10 text-center"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif" }}
        >
          Privacy Policy
        </h1>

        <div className="max-w-none" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "15px" }}>
          <p className="mb-6">
            This Privacy Policy explains how New Age Studios ("we", "us", "our"), collects, uses, and protects your personal data when you use our website (the "Website") and related services (collectively, the "Services"). We are committed to protecting your privacy and ensuring transparency about our data practices.
          </p>
          <p className="mb-6">
            By using our Services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our practices, please do not use our Services.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Data Controller</h2>
          <p className="mb-4">
            For the purposes of applicable data protection laws, the data controller is:
          </p>
          <div className="mb-6 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <strong>New Age Studios</strong><br />
            Email: newagestudios@outlook.com.br
          </div>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Checkout & Payment Data</h2>
          <p className="mb-4">
            Our checkout process is owned and operated by Tebex Limited, who act as the Merchant of Record for all purchases. When you make a purchase, Tebex collects and processes your payment information, billing details, and transaction data. We do not have access to your full payment card details.
          </p>
          <p className="mb-4">
            For information about how Tebex handles your data during checkout, please refer to the <a href="https://www.tebex.io/terms-creator-agreement/privacy-policy" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Tebex Privacy Policy</a>.
          </p>
          <p className="mb-6">
            If you opt-in to marketing communications during Tebex checkout, your email will be shared with us and added to our newsletter list hosted by Brevo (see Newsletter section below).
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Data We Collect</h2>
          <p className="mb-4 font-semibold text-white/90">Information You Provide</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Newsletter Subscription:</strong> If you subscribe to our newsletter, we collect your email address. This is stored and processed by our email service provider, Brevo.</li>
            <li><strong>Discord Authentication:</strong> If you log in with Discord, we receive your Discord user ID and pass it to Tebex to link your purchases for support and role assignment. We do not store your Discord ID ourselves, and we do not access your Discord password or private messages.</li>
            <li><strong>Support Communications:</strong> If you contact us via email or Discord, we retain those communications to provide support.</li>
          </ul>

          <p className="mb-4 font-semibold text-white/90">Information Collected Automatically</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Analytics Data:</strong> We use Google Analytics to understand how visitors use our Website when you allow analytics cookies. This includes information such as pages visited, product and checkout interactions, referral sources, and general location (country/region). This data is aggregated and does not directly identify you.</li>
            <li><strong>Cookies & Local Storage:</strong> We use cookies and browser storage for essential functionality (such as your shopping basket and currency preference) and analytics. See the Cookies section below for more details.</li>
            <li><strong>Security & Bot Protection:</strong> We use Cloudflare Turnstile to protect forms from automated abuse. This may process limited technical data to verify you are human.</li>
            <li><strong>Rate Limiting:</strong> We temporarily store hashed IP addresses in Upstash Redis to prevent abuse of our Services. This data is automatically deleted after a short period.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">How We Use Your Data</h2>
          <p className="mb-4">We use your personal data for the following purposes:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To provide and improve our Services</li>
            <li>To send newsletter emails (if you have subscribed)</li>
            <li>To pass your Discord ID to Tebex for purchase linking and role assignment</li>
            <li>To respond to support requests</li>
            <li>To analyse Website usage and improve user experience</li>
            <li>To prevent fraud and abuse</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Legal Basis for Processing</h2>
          <p className="mb-4">We process your personal data based on the following legal grounds:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Consent:</strong> For newsletter subscriptions, marketing communications, and optional analytics cookies. You can withdraw consent at any time.</li>
            <li><strong>Legitimate Interests:</strong> For analytics, security, and improving our Services, where these interests do not override your rights.</li>
            <li><strong>Contract:</strong> To provide support for products you have purchased.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Third-Party Services</h2>
          <p className="mb-4">We use the following third-party services that may process your data:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Tebex Limited - Checkout and payment processing. <a href="https://www.tebex.io/terms-creator-agreement/privacy-policy" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Privacy Policy</a></li>
            <li>Google Analytics - Website analytics. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Privacy Policy</a></li>
            <li>Vercel - Website hosting. <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Privacy Policy</a></li>
            <li>Cloudflare - Security and bot protection. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Privacy Policy</a></li>
            <li>Discord - Authentication and support. <a href="https://discord.com/privacy" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Privacy Policy</a></li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Cookies</h2>
          <p className="mb-4">We use the following types of cookies:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for the Website to function, including session management, basket storage, and currency preferences.</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics cookies to understand Website usage, product, cart, and checkout patterns. These are optional and are only used when you accept analytics cookies.</li>
            <li><strong>Security Cookies:</strong> Cloudflare and Turnstile cookies to protect against bots and malicious traffic.</li>
          </ul>
          <p className="mb-6">
            You can control optional analytics cookies using the cookie settings link in the Website footer. You can also control cookies through your browser settings. Disabling essential cookies may affect Website functionality.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Data Retention</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Newsletter Data:</strong> Retained until you unsubscribe. You can unsubscribe at any time using the link in our emails.</li>
            <li><strong>Discord Linking:</strong> Your Discord ID is passed to Tebex and retained by them according to their data retention policies.</li>
            <li><strong>Analytics Data:</strong> Retained according to Google Analytics default retention periods (typically 14 months).</li>
            <li><strong>Rate Limiting Data:</strong> Automatically deleted within minutes to hours.</li>
            <li><strong>Support Communications:</strong> Retained for as long as necessary to provide ongoing support.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Your Rights</h2>
          <p className="mb-4">You have the following rights regarding your personal data:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data.</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data in certain circumstances.</li>
            <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data.</li>
            <li><strong>Right to Data Portability:</strong> Request a copy of your data in a machine-readable format.</li>
            <li><strong>Right to Object:</strong> Object to processing based on legitimate interests.</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing at any time.</li>
          </ul>
          <p className="mb-6">To exercise any of these rights, please contact us at newagestudios@outlook.com.br.</p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">International Data Transfers</h2>
          <p className="mb-6">
            Some of our third-party service providers are based outside your region. Where data is transferred internationally, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or adequacy decisions.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Children's Privacy</h2>
          <p className="mb-6">
            Our Services are not directed at individuals under the age of 16. We do not knowingly collect personal data from children under 16. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Data Security</h2>
          <p className="mb-6">
            We implement appropriate technical and organisational measures to protect your personal data, including encryption in transit (HTTPS), secure authentication, and access controls. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Changes to This Policy</h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our Website with a new effective date. Your continued use of our Services after such changes constitutes your acceptance of the revised Privacy Policy.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Contact Us</h2>
          <p className="mb-10">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: newagestudios@outlook.com.br
          </p>

          <p className="text-sm pt-8 mt-8 border-t border-white/10" style={{ color: "rgba(255,255,255,0.3)" }}>
            Last Updated: 17th June 2026
          </p>
        </div>
      </div>
    </div>
  );
}
