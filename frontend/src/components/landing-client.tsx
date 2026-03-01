"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Sparkles, Gamepad2, Twitch, Youtube, ShieldCheck, 
  PaintRoller, Zap, Globe, Lock, Terminal, Mail, MessageSquare,
  GripVertical, Instagram
} from "lucide-react";
import { THEME_CONFIG, MiniAnimatedBackground } from "@/lib/themes";

// --- KOMPONENT MINI-TELEFONU DO PODGLĄDU ---
const MiniPhoneMockup = ({ themeKey }: { themeKey: string }) => {
  const cfg = THEME_CONFIG[themeKey];
  if (!cfg) return null;
  
  return (
    <div className="shrink-0 w-[260px] h-[520px] bg-black rounded-[2.5rem] border-[6px] border-zinc-800 shadow-2xl overflow-hidden relative group transition-transform duration-500 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />
      
      {/* Ekran */}
      <div className={`absolute inset-0 z-10 p-4 pt-12 flex flex-col items-center ${cfg.textClass}`}>
         
         <MiniAnimatedBackground theme={themeKey} />

         <div className="relative z-10 flex flex-col items-center w-full mt-4">
            <div className={`w-16 h-16 mb-3 flex items-center justify-center shadow-xl ${cfg.avatarClass}`}>
              <Globe className="w-8 h-8 opacity-50" />
            </div>
            <h4 className="font-extrabold text-sm mb-1 tracking-tight">@vibelink</h4>
            <p className={`text-[10px] opacity-80 mb-6 text-center px-4 ${cfg.bioClass}`}>
              Zbuduj swój cyfrowy ślad. Zero ograniczeń.
            </p>
            
            <div className="w-full flex flex-col gap-3">
               {[1, 2, 3].map(i => (
                 <div key={i} className={`w-full p-3 flex items-center gap-3 border transition-colors ${cfg.cardClass} ${cfg.roundedClass}`}>
                   <div className={`w-6 h-6 flex shrink-0 ${cfg.iconBgClass} ${themeKey === 'minimal' || themeKey === 'cyberpunk' || themeKey === 'hacker' || themeKey === 'monochrome' ? '' : 'rounded-md'}`} />
                   <div className={`h-2 w-24 opacity-50 rounded ${themeKey === 'minimal' ? 'bg-black' : 'bg-current'}`} />
                 </div>
               ))}
            </div>
         </div>
      </div>
      
      {/* Nazwa motywu na dole */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] flex justify-center">
        <span className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full font-bold text-[10px] sm:text-xs shadow-xl tracking-widest uppercase text-center truncate w-full max-w-fit">
          {cfg.name}
        </span>
      </div>
    </div>
  );
};

export default function LandingClient({ dict, lang }: { dict: any; lang: string }) {
  const t = dict?.landing || {};

  // Stan odpowiadający za aktywną zakładkę ("home" lub "themes")
  const [activeTab, setActiveTab] = useState<"home" | "themes">("home");

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  // Funkcja nawigacji - przełącza zakładkę i odpala auto-scroll
  const handleNav = (tab: "home" | "themes", sectionId?: string) => {
    setActiveTab(tab);
    
    if (sectionId) {
      // Dajemy Reactowi 100ms na wyrenderowanie nowej zakładki przed scrollem
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-hidden relative scroll-smooth">
      
      {/* GLOBALNE TŁO: Cyber-Siatka */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* STICKY NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav("home")}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight hidden sm:block">VibeLink</span>
            </div>

            {/* Menu nawigacyjne */}
            <div className="hidden md:flex items-center gap-6 font-medium text-sm text-zinc-400">
              <button onClick={() => handleNav("home")} className={`${activeTab === 'home' ? 'text-white font-bold' : 'hover:text-white'} transition-colors`}>
                 Główna
              </button>
              <button onClick={() => handleNav("home", "features")} className="hover:text-white transition-colors">
                 Funkcje
              </button>
              <button onClick={() => handleNav("themes")} className={`${activeTab === 'themes' ? 'text-white font-bold bg-white/10 px-4 py-1.5 rounded-full' : 'hover:text-white'} transition-all`}>
                 Katalog Motywów
              </button>
              <button onClick={() => handleNav("home", "contact")} className="hover:text-white transition-colors">
                 Kontakt
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 font-medium text-sm">
            <Link href={`/${lang}/login`} className="text-zinc-400 hover:text-white transition-colors hidden sm:block">
              {t.login || "Zaloguj się"}
            </Link>
            <Link href={`/${lang}/register`} className="bg-white text-black px-5 py-2.5 rounded-full hover:scale-105 transition-transform font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {t.register || "Załóż węzeł"}
            </Link>
          </div>
        </div>
      </nav>

      {/* GŁÓWNY KONTENER ZAKŁADEK */}
      <div className="pt-24 min-h-screen flex flex-col justify-between"> 

        {activeTab === "home" && (
          <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {/* --- HERO SECTION --- */}
            <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-20 max-w-7xl mx-auto">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center max-w-4xl mx-auto flex flex-col items-center">
                
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-8 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.badge || "Twój cyfrowy ślad w jednym miejscu. Zero bullshitu."}</span>
                </motion.div>

                <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6">
                  {t.hero_title_1 || "Jeden link, by"} <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                    {t.hero_title_2 || "rządzić wszystkimi."}
                  </span>
                </motion.h1>

                <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
                  {t.hero_desc || "Zostaw link-in-bio dla influencerek. Zbuduj swój własny, potężny terminal. Podepnij Steama, Twitcha, CS-Repa i wrzuć to w bio. Niech widzą, z kim mają do czynienia."}
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Link href={`/${lang}/register`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-extrabold hover:bg-zinc-200 transition-all hover:scale-105">
                    {t.cta_btn || "Odbierz swój profil"} <ArrowRight className="w-5 h-5" />
                  </Link>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-zinc-400 font-mono text-sm w-full sm:w-auto justify-center">
                    <span>vibelink.gg/</span>
                    <span className="text-white">twojnick</span>
                  </div>
                </motion.div>
              </motion.div>
            </main>

            {/* --- BENTO GRID (Features) --- */}
            <section id="features" className="relative z-10 py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black mb-4">Zaprojektowane dla <span className="text-emerald-400">Twórców.</span></h2>
                <p className="text-zinc-400">Wszystko, czego potrzebujesz, żeby zebrać swoją społeczność w jednym miejscu.</p>
              </div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                
                <motion.div variants={fadeUp} className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 rounded-[2rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                      <Gamepad2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{t.feature2_title || "Widgety Live w Czasie Rzeczywistym"}</h3>
                    <p className="text-zinc-400 mb-8 max-w-md">
                      {t.feature2_desc || "Automatycznie zasysamy Twoje statystyki z CS-Rep, status streamów z Twitcha i najnowsze filmy z YouTube. Odświeżane na żywo."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex items-center gap-3 bg-black/50 p-4 rounded-2xl border border-white/5 shadow-xl">
                        <Twitch className="w-5 h-5 text-purple-400" /> <span className="text-sm font-bold">Live: Valorant Ranked</span>
                      </div>
                      <div className="flex items-center gap-3 bg-black/50 p-4 rounded-2xl border border-white/5 shadow-xl">
                        <ShieldCheck className="w-5 h-5 text-orange-400" /> <span className="text-sm font-bold">CS-Rep: +50 Rep</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 rounded-[2rem] relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                      <Lock className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{t.feature3_title || "Linki FOMO"}</h3>
                    <p className="text-zinc-400">
                      {t.feature3_desc || "Ustawiaj limit kliknięć lub datę wygaśnięcia. Idealne do dropów, kodów zniżkowych na serwery i ukrytych zaproszeń Discord."}
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="md:col-span-3 bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 md:p-12 rounded-[2rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between group gap-8">
                   <div className="relative z-10 max-w-xl">
                      <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center mb-6 border border-rose-500/30">
                        <Terminal className="w-6 h-6 text-rose-400" />
                      </div>
                      <h3 className="text-3xl font-black mb-4">{t.feature4_title || "Dashboard jak centrum dowodzenia."}</h3>
                      <p className="text-zinc-400 mb-8 text-lg">
                        {t.feature4_desc || "Żadnego pisania kodu. Przeciągasz elementy (Drag & Drop), widzisz zmiany na wbudowanym iPhonie w czasie rzeczywistym. Zapisujesz i masz."}
                      </p>
                      <Link href={`/${lang}/register`} className="inline-flex items-center justify-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-rose-400 transition-colors shadow-[0_0_20px_rgba(243,113,153,0.3)]">
                        {t.feature4_link || "Zainicjuj Protokół"} <ArrowRight className="w-5 h-5" />
                      </Link>
                   </div>
                   <div className="hidden md:flex flex-col gap-4 w-full max-w-xs">
                     <div className="bg-black/60 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3"><Youtube className="w-5 h-5 text-red-500"/><span className="font-bold text-sm">Najnowszy film</span></div>
                        <GripVertical className="w-4 h-4 text-zinc-600" />
                     </div>
                     <div className="bg-rose-500/10 p-4 rounded-2xl border border-rose-500/30 flex items-center justify-between scale-105 translate-x-4 shadow-2xl">
                        <div className="flex items-center gap-3"><Gamepad2 className="w-5 h-5 text-rose-400"/><span className="font-bold text-sm text-rose-100">Steam Profile</span></div>
                        <GripVertical className="w-4 h-4 text-rose-400" />
                     </div>
                     <div className="bg-black/60 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3"><Instagram className="w-5 h-5 text-pink-500"/><span className="font-bold text-sm">Instagram</span></div>
                        <GripVertical className="w-4 h-4 text-zinc-600" />
                     </div>
                   </div>
                </motion.div>

              </motion.div>
            </section>

            {/* --- KONTAKT / CTA --- */}
            <section id="contact" className="relative z-10 py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0a0a1a]">
               <div className="max-w-4xl mx-auto px-6 text-center">
                 <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                   <MessageSquare className="w-8 h-8 text-blue-400" />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black mb-6">Masz pytania? Mamy <span className="text-blue-400">odpowiedzi.</span></h2>
                 <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
                   Jesteśmy tu dla graczy. Jeśli masz propozycję nowej integracji, znalazłeś buga, albo po prostu chcesz pogadać o rozwoju platformy – uderzaj śmiało.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="mailto:kontakt@vibelink.gg" className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors w-full sm:w-auto justify-center font-bold">
                       <Mail className="w-5 h-5 text-zinc-400" /> kontakt@vibelink.gg
                    </a>
                 </div>
               </div>
            </section>
          </motion.div>
        )}

        {activeTab === "themes" && (
          <motion.div key="themes" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="relative z-10 w-full pb-24">
             <div className="max-w-[1600px] mx-auto px-6 pt-16">
                
                <div className="text-center mb-16 max-w-3xl mx-auto">
                   <h1 className="text-5xl md:text-6xl font-black mb-6">Wybierz swój <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Vibe.</span></h1>
                   <p className="text-lg text-zinc-400 mb-8">
                      Od agresywnego cyberpunka, przez szklany minimalizm, aż po retro synthwave. Twoja wizytówka nie musi wyglądać jak wyjęta z generatora.
                   </p>
                   <button onClick={() => handleNav('home')} className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors font-bold text-sm">
                      Wróć na główną
                   </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 place-items-center">
                   {Object.keys(THEME_CONFIG).map((themeKey) => (
                      <MiniPhoneMockup key={themeKey} themeKey={themeKey} />
                   ))}
                </div>

             </div>
          </motion.div>
        )}

        {/* FOOTER - Zawsze na dole */}
        <footer className="border-t border-white/10 bg-black py-12 relative z-10 mt-auto">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 opacity-50">
              <Zap className="w-5 h-5 text-white" />
              <span className="font-bold tracking-widest uppercase text-sm">VibeLink © 2026</span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-zinc-500">
              <Link href="#" className="hover:text-white transition-colors">Regulamin</Link>
              <Link href="#" className="hover:text-white transition-colors">Prywatność</Link>
            </div>
            <div className="text-zinc-600 text-sm font-medium">
              Zbudowane dla twórców. Bez kompromisów.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}