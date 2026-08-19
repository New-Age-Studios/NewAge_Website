import "@/styles/docs.css";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsSearch from "@/components/docs/DocsSearch";
import { getDocsNav } from "@/lib/docs/getNav";
import { getDictionary } from "@/dictionaries";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Documentation | New Age Studios",
};

export default async function DocsLayout({ children, params }) {
  const { lang } = await params;
  const nav = getDocsNav(lang);
  const dict = await getDictionary(lang);
  const mobileDict = dict.docs_mobile;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }} className="bg-grid">
      <div className="docs-shell">
        <aside className="docs-aside">
          <DocsSidebar lang={lang} nav={nav} dict={mobileDict} />
        </aside>
        <main className="docs-main relative min-w-0 w-full max-w-full overflow-x-hidden">
          <article className="docs-prose break-words w-full max-w-full">{children}</article>
        </main>
        <aside className="hidden xl:flex flex-col pt-4 sticky top-24 h-[calc(100vh-6rem)]">
          <div className="mb-8">
            <DocsSearch nav={nav} lang={lang} />
          </div>
          
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-2">
              {lang === 'pt-br' ? 'DICAS ÚTEIS' : 'Pro Tips'}
            </p>
            <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-[13px] text-white/60">
              {lang === 'pt-br' ? (
                <>Pressione <kbd className="bg-black/40 border border-white/10 px-1.5 py-0.5 rounded text-white text-[11px] mx-1">Ctrl</kbd> + <kbd className="bg-black/40 border border-white/10 px-1.5 py-0.5 rounded text-white text-[11px] mx-1">K</kbd> para buscar rapidamente.</>
              ) : (
                <>Press <kbd className="bg-black/40 border border-white/10 px-1.5 py-0.5 rounded text-white text-[11px] mx-1">Ctrl</kbd> + <kbd className="bg-black/40 border border-white/10 px-1.5 py-0.5 rounded text-white text-[11px] mx-1">K</kbd> to quickly search the documentation.</>
              )}
            </div>
            <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-[13px] text-white/60 mt-2">
              {lang === 'pt-br' ? (
                <>Precisa de ajuda? Abra um ticket em nosso <a href="https://discord.gg/tyKTs4QyYA" target="_blank" rel="noopener noreferrer" className="text-[#ff5100] hover:underline">Discord</a>.</>
              ) : (
                <>Need help? Open a ticket in our <a href="https://discord.gg/tyKTs4QyYA" target="_blank" rel="noopener noreferrer" className="text-[#ff5100] hover:underline">Discord</a>.</>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
