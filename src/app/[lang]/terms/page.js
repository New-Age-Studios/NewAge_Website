export const metadata = {
  title: 'Terms of Sale | New Age Studios',
  description: 'Terms and conditions for purchasing from New Age Studios.',
};

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="select-text" style={{ fontFamily: "'Inter', sans-serif", background: "#141414", minHeight: "100vh", paddingTop: 80, paddingBottom: 80 }}>
      <div className="container mx-auto max-w-[800px] px-6 lg:px-12 py-12">
        <h1
          className="mb-10 text-center"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#f2f2f2", fontFamily: "'Barlow', sans-serif" }}
        >
          Terms of Sale
        </h1>

        <div className="max-w-none" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "15px" }}>
          <p className="mb-6">
            You automatically accept the following terms when you purchase a script from our Tebex store (New Age Studios Store). When using this site, you are purchasing from Tebex Limited and NOT from New Age Studios. Tebex Limited has the exclusive license to sell New Age Studios products. All digital software and other digital items provided by Tebex Limited are licensed, not sold. The license we sell you grants you limited rights to consume and make use of the software and other digital items personally, and only against the account that was originally used to make the purchase. You may not: (1) reverse engineer, or decompile the script in any way; (2) share the script with others or upload to public websites; (3) resell or redistribute the script. Violating these terms will result in your license to the product being removed (if applicable) and may result in your Cfx.re account being reported or banned.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Tebex Checkout Terms</h2>
          <p className="mb-4">
            When you proceed to checkout on our store, you are using Tebex Checkout, a service operated by Tebex Limited. By completing a purchase, you agree to be bound by the <a href="https://checkout.tebex.io/terms" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Tebex Limited Terms & Conditions</a> in addition to our own terms. Key points from the Tebex Checkout terms include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>All digital software and other digital items provided are licensed, not sold. The license grants you limited rights to use the software personally, and only against the account used to make the purchase.</li>
            <li>You may not distribute, resell or share any digital software or items purchased.</li>
            <li>Except where required by applicable consumer law, transactions are final and Tebex does not offer refunds for purchases made on the platform.</li>
            <li>If you are banned from the platform after delivery of your purchase, you will not be entitled to a refund.</li>
            <li>You must be at least 16 years old to purchase products.</li>
            <li>EU customers have a statutory right of withdrawal which expires 14 days after purchase or when you start downloading the content for the first time, whichever is sooner.</li>
            <li>Subscriptions can be cancelled at any time via <a href="https://checkout.tebex.io/payment-history" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">checkout.tebex.io/payment-history</a>.</li>
            <li>For full details, please read the complete <a href="https://checkout.tebex.io/terms" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Tebex Limited Terms & Conditions</a> and <a href="https://www.tebex.io/terms-creator-agreement/privacy-policy" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Tebex Privacy Policy</a>.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Refunds</h2>
          <p className="mb-6">
            Please see our <Link href="/refunds" className="text-orange-500 hover:underline">Refunds Policy</Link> for information about refunds.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Support</h2>
          <p className="mb-4">
            Support is provided primarily via Discord, but is also available via email (see support page). You must have the Customer role in Discord to get support. After purchase, you will receive roles automatically IF you logged in with Discord at the time of purchase. Alternatively, you can use /claim in #✅-claim-roles channel. To claim roles manually with our staff team, you can use the create ticket channel(s).
          </p>
          <p className="mb-6">
            Support is available 7 days a week to verified customers who have purchased the script through our official store. Leaked, stolen copies of resources from 3rd party sites, or resold scripts are not eligible for support. You must remain a member of the Discord to qualify for lifetime free support. We have a zero-tolerance policy for rudeness or abusive behaviour towards our team. Instances of rudeness or disrespectful behaviour towards our staff may result in temporary timeouts, being refused support, being blacklisted from opening support tickets or, in the most extreme cases, a permanent ban from the server and you will not be able to receive support for your products. This measure is taken to protect our staff from abusive behaviour and to maintain a respectful working environment. We value constructive feedback and are committed to resolving issues amicably and we encourage all customers to communicate respectfully and courteously with our staff to ensure a positive experience for everyone.
          </p>

          <h2 className="text-xl font-bold text-white mt-12 mb-4">Privacy</h2>
          <p className="mb-10">
            For information about how we collect, use, and protect your personal data, please see our <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>.
          </p>

          <p className="text-sm pt-8 mt-8 border-t border-white/10" style={{ color: "rgba(255,255,255,0.3)" }}>
            Last Updated: 17th June 2026
          </p>
        </div>
      </div>
    </div>
  );
}
