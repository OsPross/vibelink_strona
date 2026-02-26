import Link from "next/link";
import Navbar from "@/components/navbar";
// Używamy kropki, żeby 100% trafić w folder
import { getDictionary } from "../../dictionaries/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ lang: 'pl' | 'en' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans selection:bg-indigo-500/30">
      <Navbar dict={dict} lang={lang} />

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          {dict.landing?.badge}
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl relative z-10">
          {dict.landing?.title_1} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            {dict.landing?.title_highlight}
          </span>
        </h1>

        <p className="mt-6 text-lg text-zinc-400 max-w-2xl relative z-10">
          {dict.landing?.subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 relative z-10">
          <Link href={`/${lang}/register`} className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {dict.landing?.btn_start}
          </Link>
          <Link href={`/${lang}/login`} className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-full hover:bg-zinc-800 transition-colors text-lg">
            {dict.landing?.btn_login}
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">{dict.landing?.footer_title}</h2>
        <Link href={`/${lang}/register`} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-colors inline-block mb-12">
          {dict.landing?.footer_btn}
        </Link>
        <p className="text-sm text-zinc-600">© 2026 VibeLink. {dict.landing?.footer_rights}</p>
      </footer>
    </div>
  );
}