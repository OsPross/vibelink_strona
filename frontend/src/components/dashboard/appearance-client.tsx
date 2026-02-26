"use client";

import { useState } from "react";
import { CheckCircle2, Save, Loader2, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppearanceClient({ dict, token, profile }: { dict: any; token: string; profile: any; }) {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  const [theme, setTheme] = useState(profile.theme || "dark");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveAppearance = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/profiles/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ theme }),
      });

      if (!res.ok) throw new Error("Błąd");
      showToast(dict.appearance.saved);
    } catch (error) {
      alert(dict.appearance.error);
    } finally {
      setIsLoading(false);
    }
  };

  const themes = [
    { id: 'dark', label: dict.appearance.theme_dark, gradient: 'from-zinc-800 to-black' },
    { id: 'light', label: dict.appearance.theme_light, gradient: 'from-zinc-100 to-white' },
    { id: 'neon', label: dict.appearance.theme_neon, gradient: 'from-cyan-500 to-fuchsia-600' },
    { id: 'minimal', label: dict.appearance.theme_minimal, gradient: 'from-zinc-300 to-zinc-400' },
    { id: 'cyberpunk', label: dict.appearance.theme_cyberpunk, gradient: 'from-yellow-400 to-red-500' },
    { id: 'synthwave', label: dict.appearance.theme_synthwave, gradient: 'from-indigo-900 to-pink-500' },
    { id: 'glass', label: dict.appearance.theme_glass, gradient: 'from-teal-400 to-emerald-400' },
    { id: 'hacker', label: dict.appearance.theme_hacker, gradient: 'from-green-900 to-green-500' },
  ];

  return (
    <div className="w-full max-w-4xl relative">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-xl border border-emerald-500/30 text-white px-6 py-4 rounded-2xl shadow-2xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold tracking-wide">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSaveAppearance} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20"><Palette className="w-5 h-5 text-indigo-400" /></div>
          {dict.appearance.theme_title}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button 
              key={t.id} 
              type="button" 
              onClick={() => setTheme(t.id)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all overflow-hidden ${theme === t.id ? 'border-indigo-500 bg-indigo-500/10 scale-105 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'border-white/5 bg-black/40 hover:bg-black/60'}`}
            >
              <div className={`w-full h-16 rounded-xl bg-gradient-to-br ${t.gradient} mb-3 border border-white/10`} />
              <span className={`text-sm font-bold ${theme === t.id ? 'text-indigo-400' : 'text-zinc-400'}`}>{t.label}</span>
              {theme === t.id && (
                <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-8">
          <button type="submit" disabled={isLoading} className="relative group px-10 py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center gap-2 bg-black border border-white/20 text-white font-bold rounded-full hover:scale-[1.03] transition-all px-8 py-3">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-cyan-400" /> : <Save className="w-5 h-5 text-cyan-400" />}
              {dict.appearance.save}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}