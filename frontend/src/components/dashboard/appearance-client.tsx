"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, PaintRoller, Globe } from "lucide-react";
import { THEME_CONFIG, MiniAnimatedBackground } from "@/lib/themes";

// --- Wbudowany Telefon do Podglądu w Dashboardzie ---
const PreviewPhone = ({ themeKey, profile }: { themeKey: string; profile: any }) => {
  const cfg = THEME_CONFIG[themeKey] || THEME_CONFIG.dark;

  return (
    <div className="relative w-[320px] h-[660px] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.1)] ring-1 ring-white/10 overflow-hidden shrink-0 transition-all duration-300">
      {/* Hardware Buttons */}
      <div className="absolute top-24 -left-[9px] w-1 h-10 bg-zinc-700 rounded-l-md" />
      <div className="absolute top-40 -left-[9px] w-1 h-16 bg-zinc-700 rounded-l-md" />
      <div className="absolute top-40 -right-[9px] w-1 h-20 bg-zinc-700 rounded-r-md" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

      {/* Ekran */}
      <div className={`absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] ${cfg.bgClass}`}>
        <MiniAnimatedBackground theme={themeKey} />
        
        <div className={`absolute inset-0 z-10 overflow-y-auto pt-16 pb-12 px-5 flex flex-col items-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${cfg.textClass}`}>
          
          <div className={`w-20 h-20 flex items-center justify-center overflow-hidden shadow-xl mb-4 shrink-0 relative z-10 ${cfg.avatarClass}`}>
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Globe className="w-10 h-10 opacity-50" />
            )}
          </div>
          
          <h3 className="font-extrabold text-lg mb-1 tracking-tight text-center w-full truncate px-2">@{profile.user?.username || "vibelink"}</h3>
          <p className={`text-center text-xs mb-8 px-2 leading-relaxed line-clamp-3 ${cfg.bioClass}`}>
            {profile.bio || "Live preview wybranego motywu. Zbuduj swój cyfrowy ślad."}
          </p>

          <div className="w-full flex flex-col gap-3">
             {/* Fake Links to showcase the theme */}
             {[1, 2, 3].map((_, i) => (
               <div key={i} className={`relative w-full flex items-center p-2 transition-all border ${cfg.cardClass} ${cfg.roundedClass}`}>
                  <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${themeKey === 'minimal' || themeKey === 'cyberpunk' || themeKey === 'hacker' || themeKey === 'monochrome' || themeKey === 'vaporwave' ? '' : 'rounded-lg'} ${cfg.iconBgClass}`}>
                     <div className={`w-5 h-5 rounded-sm opacity-50 ${themeKey === 'minimal' || themeKey === 'monochrome' ? 'bg-current' : 'bg-white'}`} />
                  </div>
                  <div className="flex-1 px-3">
                     <div className={`h-2.5 w-24 rounded opacity-70 ${themeKey === 'minimal' || themeKey === 'monochrome' ? 'bg-current' : 'bg-white'}`} />
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AppearanceClient({ dict, token, profile }: { dict: any; token: string; profile: any; }) {
  const [currentTheme, setCurrentTheme] = useState(profile.theme || "dark");
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveTheme = async (themeToSave: string) => {
    setIsLoading(true);
    setCurrentTheme(themeToSave);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/profiles/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ theme: themeToSave }),
      });
      if (!res.ok) throw new Error("Błąd");
      showToast("Zaktualizowano wygląd profilu.");
    } catch (error) {
      showToast("Wystąpił błąd przy zapisie.");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { name: "Nowoczesne & Klasyczne", keys: ["dark", "light", "midnight", "glass"] },
    { name: "Gaming & Cyber", keys: ["neon", "cyberpunk", "hacker", "glitch"] },
    { name: "Estetyczne & Vibe", keys: ["synthwave", "vaporwave", "ocean", "magma"] },
    { name: "Ekstremalne (Ostrożnie)", keys: ["trippy", "inferno", "toxic", "void"] },
    { name: "Minimalistyczne", keys: ["minimal", "monochrome", "royal", "forest"] },
  ];

  const availableKeys = Object.keys(THEME_CONFIG);

  return (
    // UWAGA: Usunięto całkowicie "items-start", aby obie kolumny dzieliły wspólną maksymalną wysokość
    <div className="flex flex-col lg:flex-row gap-12 w-full relative">
      
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-[#050510]/90 backdrop-blur-xl border border-emerald-500/30 text-white px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold tracking-wide">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEWA STRONA: WYBÓR MOTYWU (To nadaje wysokość całej stronie) */}
      <div className="flex-1 w-full space-y-10 pb-20">
        
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-8 rounded-[2rem] backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-2">
              <PaintRoller className="w-6 h-6 text-purple-400" /> Silnik Motywów
            </h2>
            <p className="text-zinc-400 max-w-md">Najedź myszką na kafelek motywu, aby zobaczyć podgląd na żywo na telefonie obok. Kliknij, aby zapisać.</p>
          </div>
        </div>

        <div className="space-y-10">
          {categories.map((category) => {
            const validKeys = category.keys.filter(k => availableKeys.includes(k));
            if (validKeys.length === 0) return null;

            return (
              <div key={category.name}>
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4 pl-2">{category.name}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {validKeys.map((themeKey) => {
                    const isActive = currentTheme === themeKey;
                    const config = THEME_CONFIG[themeKey];
                    
                    return (
                      <button
                        key={themeKey}
                        onClick={() => handleSaveTheme(themeKey)}
                        onMouseEnter={() => setHoveredTheme(themeKey)}
                        onMouseLeave={() => setHoveredTheme(null)}
                        disabled={isLoading}
                        className={`relative w-full h-32 rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 group ${isActive ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'border-white/5 hover:border-white/20'}`}
                      >
                         <div className={`absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity ${config.bgClass}`}>
                            <MiniAnimatedBackground theme={themeKey} />
                         </div>

                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                         
                         <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end">
                            <span className={`font-black tracking-wide ${isActive ? 'text-indigo-400' : 'text-white group-hover:text-white'}`}>
                              {config.name}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                              {isActive && <CheckCircle2 className="w-3 h-3 text-indigo-400" />} 
                              {isActive ? "Aktywny" : "Wybierz"}
                            </span>
                         </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PRAWA STRONA: GŁÓWNY TOR (Rozciągnięty na całą wysokość flexboxa) */}
      <div className="hidden lg:block w-[320px] shrink-0">
        {/* Kontener FIXED lewitujący zawsze na ekranie */}
        <div className="fixed top-32 w-[320px] z-50 h-[calc(100vh-140px)] flex flex-col">
          <div className="mb-4 flex items-center justify-between px-2 opacity-60">
             <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Podgląd na żywo</span>
             {isLoading && <Loader2 className="w-3 h-3 text-white animate-spin" />}
          </div>
          
          <PreviewPhone themeKey={hoveredTheme || currentTheme} profile={profile} />
        </div>
      </div>

    </div>
  );
}