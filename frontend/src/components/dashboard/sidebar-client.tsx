"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, LogOut, ExternalLink, User, Globe, Radio, Palette } from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarClient({ lang, dict, username }: { lang: string; dict?: any; username?: string }) {
  const pathname = usePathname();
  
  // Defensywne przypisanie słownika
  const t = dict?.sidebar || {};

  const navItems = [
    { name: t.links || "Zarządzanie", href: `/${lang}/dashboard`, icon: LayoutDashboard },
    { name: t.socials || "Social Media", href: `/${lang}/dashboard/socials`, icon: Globe },
    { name: t.appearance || "Wygląd", href: `/${lang}/dashboard/appearance`, icon: Palette },
    { name: t.integrations || "Integracje", href: `/${lang}/dashboard/integrations`, icon: Radio },
    { name: t.settings || "Ustawienia", href: `/${lang}/dashboard/settings`, icon: Settings },
  ];

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"; // Na wszelki wypadek usuwamy obie nazwy
    window.location.href = `/${lang}/login`;
  };

  return (
    <>
      {/* ========================================================= */}
      {/* WERSJA DESKTOP (SIDEBAR) */}
      {/* ========================================================= */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 border-r border-white/[0.05] bg-[#02000a]/60 backdrop-blur-3xl p-6 z-50 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
      >
        {/* Logo */}
        <Link href={`/${lang}/dashboard`} className="flex items-center gap-4 mb-12 mt-4 px-2 group">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
            <img src="/vibelink.png" alt="Vibelink" className="relative w-10 h-10 object-contain rounded-xl border border-white/10 bg-white/[0.03] p-0.5 backdrop-blur-md" />
          </div>
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 tracking-tight">Vibelink.</span>
        </Link>

        {/* Nawigacja */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="block relative group">
                {isActive && (
                  <motion.div layoutId="activeTabDesktop" className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.1)]" />
                )}
                <div className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'}`}>
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400/50'}`} />
                  <span className="font-semibold tracking-wide text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Profil i Wyloguj */}
        <div className="space-y-4 pt-6 border-t border-white/[0.05]">
          {username && (
            <a href={`/${lang}/${username}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all relative z-10">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 overflow-hidden relative z-10">
                <p className="text-xs text-zinc-500 font-medium">Twój profil</p>
                <p className="text-sm font-bold text-zinc-200 truncate">vibelink.pl/{username}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors relative z-10" />
            </a>
          )}

          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
            <LogOut className="w-5 h-5" />
            <span className="font-semibold text-sm">Wyloguj się</span>
          </button>
        </div>
      </motion.aside>

      {/* ========================================================= */}
      {/* WERSJA MOBILE (FLOATING BOTTOM BAR) */}
      {/* ========================================================= */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-50">
        <div className="bg-[#050510]/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-2 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="relative flex-1 flex flex-col items-center justify-center py-2 group">
                {isActive && (
                  <motion.div layoutId="activeTabMobile" className="absolute inset-0 bg-white/10 rounded-2xl" />
                )}
                <item.icon className={`w-6 h-6 relative z-10 transition-colors ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                {isActive && <span className="text-[10px] font-bold text-white mt-1 relative z-10">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}