"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, LogOut, ExternalLink, User, Globe, Radio } from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarClient({ lang, username }: { lang: string; username?: string }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: `/${lang}/dashboard`, icon: LayoutDashboard },
    { name: "Social Media", href: `/${lang}/dashboard/socials`, icon: Globe },
    { name: "Integracje", href: `/${lang}/dashboard/integrations`, icon: Radio }, // NOWA ZAKŁADKA
    { name: "Ustawienia", href: `/${lang}/dashboard/settings`, icon: Settings },
  ];

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = `/${lang}/login`;
  };

  return (
    <motion.aside 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 border-r border-white/5 bg-black/40 backdrop-blur-2xl p-6 z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-4 mb-12 mt-4 px-2">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vibelink.png" alt="Vibelink" className="relative w-10 h-10 object-contain rounded-xl border border-white/10 bg-black/50 p-0.5" />
        </div>
        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Vibelink</span>
      </div>

      {/* Nawigacja */}
      <nav className="flex-1 space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="block relative group">
              {isActive && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
              )}
              <div className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}>
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400/50'}`} />
                <span className="font-semibold tracking-wide">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Dolna sekcja (Profil i Wyloguj) */}
      <div className="space-y-4 pt-6 border-t border-white/5">
        {username && (
          <a href={`/${lang}/${username}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-white/10 transition-all group">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all">
              <User className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs text-zinc-500 font-medium">Twój profil</p>
              <p className="text-sm font-bold text-zinc-200 truncate">vibelink.pl/{username}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </a>
        )}

        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Wyloguj się</span>
        </button>
      </div>
    </motion.aside>
  );
}