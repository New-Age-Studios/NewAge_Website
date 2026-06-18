import '@/styles/fonts.css';
import '@/styles/tailwind.css';
import '@/styles/theme.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { getDictionary } from '@/dictionaries';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'NewAge Studios | Scripts',
  description: 'The most popular vehicle scripts for your FiveM server.',
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const cookieStore = await cookies();
  const currencyCode = cookieStore.get("NEXT_CURRENCY")?.value || "USD";
  return (
    <html lang={lang}>
      <body className="select-none" style={{ background: "#141414", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar lang={lang} dict={dict.navbar} />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer lang={lang} dict={dict.footer} currencyCode={currencyCode} />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
