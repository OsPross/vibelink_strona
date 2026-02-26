"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const pathname = usePathname();
  const router = useRouter();

  // Funkcja przełączająca język w pasku adresu
  const toggleLanguage = () => {
    const newLang = lang === 'pl' ? 'en' : 'pl';
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 py-4 px-6 lg:px-12 backdrop-blur-md bg-zinc-950/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href={`/${lang}`} className="relative group flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] transition-all duration-300">
            <span className="text-white font-black text-xl leading-none">V</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">VibeLink</span>
        </Link>

        {/* PRZYCISKI (Przełącznik języka + Logowanie) */}
        <div className="flex items-center gap-4">
          
          {/* Przełącznik PL/EN */}
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-colors"
          >
            <span className={lang === 'pl' ? 'opacity-100' : 'opacity-40'}>PL</span>
            <span className="w-px h-3 bg-white/20"></span>
            <span className={lang === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
          </button>

          {/* Przycisk Logowania */}
          <Link href={`/${lang}/login`} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors hidden sm:block">
            {dict.nav?.login || "Zaloguj"}
          </Link>
          
          {/* Przycisk Rejestracji */}
          <Link href={`/${lang}/register`} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition duration-300" />
            <div className="relative px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform duration-300">
              {dict.nav?.register || "Załóż konto"}
            </div>
          </Link>
        </div>
        
      </div>
    </nav>
  );
}