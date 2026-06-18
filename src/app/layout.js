import '@/styles/fonts.css';
import '@/styles/tailwind.css';
import '@/styles/theme.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export const metadata = {
  title: 'NewAge Studios | Scripts',
  description: 'The most popular vehicle scripts for your FiveM server.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="select-none" style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
