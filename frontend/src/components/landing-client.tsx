"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Palette, BarChart3, Instagram, Twitter, Github, Cpu } from "lucide-react";

export default function LandingClient({ dict, lang }: { dict: any; lang: string }) {
  // --- WARIANTY ANIMACJI ---

  // Animacja wejścia od dołu (dla Hero)
  const fadeInUx = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  // Kontener dla animacji sekwencyjnych (Hero)
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  // Warianty dla animacji podczas przewijania (Scroll Reveal)
  const scrollReveal = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const t = dict.landing || {};
  const authT = dict.auth || {};

  return (
    // Dodano klasę 'selection:...' dla futurystycznego koloru zaznaczania tekstu
    <div className="min-h-screen bg-[#050505] text-zinc-200 overflow-hidden font-sans selection:bg-cyan-500/40 selection:text-cyan-50">
      
      {/* --- FUTURYSTYCZNE TŁO --- */}
      {/* 1. Świecące kule (Glow Orbs) - Zwiększona intensywność */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-700/25 blur-[180px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-700/20 blur-[180px] rounded-full pointer-events-none mix-blend-screen" />
      
      {/* 2. Technologiczna Siatka (Cyber Grid) - Subtelny wzór w tle */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" style={{ backgroundSize: '30px 30px', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)' }} />


      {/* --- NAWIGACJA --- */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl supports-[backdrop-filter]:bg-black/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* --- LOGO W NAWIGACJI (Zaokrąglone i futurystyczne) --- */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              {/* Efekt 'poświaty' za logiem */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/vibelink.png" 
                alt="Vibelink Logo"
                // Dodano rounded-2xl i border dla technologicznego wyglądu
                className="relative w-11 h-11 object-contain rounded-2xl border border-white/10 bg-black/50 p-0.5" 
              />
            </div>
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight">Vibelink</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-2 mr-4 border-r border-white/10 pr-6">
              <Link href="/en" className={`text-xs font-bold transition-colors ${lang === 'en' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}>EN</Link>
              <Link href="/pl" className={`text-xs font-bold transition-colors ${lang === 'pl' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}>PL</Link>
            </div>

            <Link href={`/${lang}/login`} className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors hidden sm:block">
              {authT.login_link || "Log in"}
            </Link>
            <Link href={`/${lang}/register`} className="relative group">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
               <span className="relative block text-sm font-bold bg-zinc-900 text-white px-6 py-2.5 rounded-full border border-white/10 group-hover:bg-black transition-all">
                {authT.register_link || "Sign up free"}
               </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (Animacje przy załadowaniu) --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-44 pb-32 flex flex-col lg:flex-row items-center gap-20 min-h-screen">
        
        {/* LEWA STRONA - Tekst */}
        <motion.div className="flex-1 text-center lg:text-left" initial="hidden" animate="visible" variants={staggerContainer}>
          
          {/* Badge */}
          <motion.div variants={fadeInUx} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm font-medium text-indigo-300 mb-8 shadow-[0_0_20px_rgba(99,102,241,0.2)] backdrop-blur-md">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>{t.badge || "The future of digital identity"}</span>
          </motion.div>
          
          {/* Nagłówek */}
          <motion.h1 variants={fadeInUx} className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white drop-shadow-2xl">
            {t.title_1 || "Your entire world in"} <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 animate-gradient-x">
              {t.title_highlight || "one link."}
            </span>
          </motion.h1>
          
          {/* Podtytuł */}
          <motion.p variants={fadeInUx} className="text-lg lg:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {t.subtitle || "Bring your social media, projects, and content together. Vibelink is the fastest portal to your digital presence."}
          </motion.p>
          
          {/* Przyciski */}
          <motion.div variants={fadeInUx} className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
            <Link href={`/${lang}/register`} className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-300"></div>
              <div className="relative flex items-center justify-center gap-2 bg-black border border-white/10 text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-[1.02] transition-all">
                {t.btn_start || "Initialize portal"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link href={`/${lang}/login`} className="w-full sm:w-auto flex items-center justify-center bg-transparent border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white font-bold text-lg px-8 py-4 rounded-full transition-colors backdrop-blur-sm">
              {t.btn_login || "Access account"}
            </Link>
          </motion.div>
        </motion.div>

        {/* PRAWA STRONA - Lewitujący Telefon */}
        <motion.div className="flex-1 w-full max-w-md relative flex justify-center lg:justify-end" initial={{ opacity: 0, scale: 0.8, z: -100 }} animate={{ opacity: 1, scale: 1, z: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-600/30 blur-3xl rounded-full animate-pulse-slow" />
          
          <motion.div animate={{ y: [-20, 10, -20], rotateX: [5, 0, 5], rotateY: [-5, 5, -5] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="relative w-full max-w-[340px] bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-[0_0_50px_rgba(79,70,229,0.2)] p-8 overflow-hidden perspective-1000">
            {/* Cyber Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(99,102,241,0.1),transparent)] animate-scanline pointer-events-none h-[200%]" />
            
            <div className="relative flex flex-col items-center z-10">
              {/* Logo w telefonie (Maksymalne wypełnienie) */}
              <div className="w-28 h-28 rounded-full bg-zinc-950 border-[3px] border-indigo-500/50 mb-5 overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center relative">
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600/20 to-cyan-600/20 animate-spin-slow pointer-events-none" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/vibelink.png" alt="Vibelink Logo Profile" className="w-full h-full object-cover relative z-10" />
              </div>

              <h3 className="font-bold text-2xl text-white mb-2 tracking-tight">@vibelink.protocol</h3>
              <p className="text-zinc-400 text-sm text-center mb-8 leading-relaxed">{t.mockup_bio || "Connecting digital entities across the metaverse. 🌐🚀"}</p>
              
              <div className="w-full space-y-4">
                {[
                  { icon: Instagram, title: "Instagram Neural Link", color: "group-hover:border-pink-500/50 group-hover:shadow-pink-900/20" },
                  { icon: Twitter, title: "X / Twitter Feed", color: "group-hover:border-zinc-400 group-hover:shadow-zinc-700/20" },
                  { icon: Github, title: "GitHub Repository", color: "group-hover:border-white/50 group-hover:shadow-white/10" }
                ].map((item, i) => (
                  <motion.div whileHover={{ scale: 1.03, x: 5 }} key={i} className={`group w-full p-4 bg-zinc-900/60 border border-zinc-800/60 rounded-2xl flex items-center gap-4 transition-all shadow-sm hover:shadow-md ${item.color} cursor-pointer backdrop-blur-md relative overflow-hidden`}>
                     <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <item.icon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors relative z-10" />
                    <span className="font-medium text-zinc-200 group-hover:text-white transition-colors relative z-10">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* --- SEKCJA CECH (Animacje podczas przewijania) --- */}
      <section className="relative z-10 border-t border-white/5 bg-zinc-950/50 py-32 px-6 overflow-hidden">
        {/* Dodatkowe tło dla sekcji */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={scrollReveal}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">{t.features_title || "Advanced capabilities."}</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">{t.features_subtitle || "Focus on creating. We handle the tech stack. Vibelink provides professional-grade tools for audience management."}</p>
          </motion.div>

          {/* Grid z kartami - animacja kaskadowa */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            {/* Karta 1 */}
            <motion.div variants={scrollReveal} className="group relative bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] hover:bg-zinc-800/60 transition-colors overflow-hidden backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all relative z-10 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                <Palette className="w-8 h-8 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{t.f1_title || "Custom Aesthetics"}</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">{t.f1_desc || "Choose themes, customize colors, and make your profile look exactly like your personal brand identity."}</p>
            </motion.div>

            {/* Karta 2 */}
            <motion.div variants={scrollReveal} className="group relative bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] hover:bg-zinc-800/60 transition-colors overflow-hidden backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all relative z-10 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <Zap className="w-8 h-8 text-cyan-400 group-hover:-rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{t.f2_title || "Zero Latency"}</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">{t.f2_desc || "Instant updates. Add a link, change a photo – your audience sees changes in real-time across the globe."}</p>
            </motion.div>

            {/* Karta 3 */}
            <motion.div variants={scrollReveal} className="group relative bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] hover:bg-zinc-800/60 transition-colors overflow-hidden backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all relative z-10 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                <BarChart3 className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{t.f3_title || "Total Control"}</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">{t.f3_desc || "Manage link order, hide items temporarily, and prepare for upcoming advanced analytics modules."}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER CTA (Animacja podczas przewijania) --- */}
      <footer className="relative z-10 border-t border-white/5 bg-[#020202] py-32 px-6 text-center overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={scrollReveal}
           className="relative z-10 max-w-3xl mx-auto"
        >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-10 tracking-tight drop-shadow-lg">{t.footer_title || "Ready to upgrade your digital presence?"}</h2>
            <Link href={`/${lang}/register`} className="relative group inline-flex">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full blur-md opacity-60 group-hover:opacity-90 transition duration-300"></div>
                <span className="relative inline-flex items-center justify-center bg-white text-black font-extrabold text-lg px-12 py-5 rounded-full hover:scale-[1.02] transition-transform">
                {t.footer_btn || "Create free profile"}
                </span>
            </Link>
            <p className="text-zinc-600 mt-16 text-sm font-medium">© {new Date().getFullYear()} Vibelink Protocol. {t.footer_rights || "All rights reserved."}</p>
        </motion.div>
      </footer>
    </div>
  );
}