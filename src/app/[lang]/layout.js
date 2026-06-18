import '@/styles/fonts.css';
import '@/styles/tailwind.css';
import '@/styles/theme.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { getDictionary } from '@/dictionaries';

export const metadata = {
  title: 'NewAge Studios | Scripts',
  description: 'The most popular vehicle scripts for your FiveM server.',
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body className="select-none" style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar lang={lang} dict={dict.navbar} />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer lang={lang} dict={dict.footer} />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
