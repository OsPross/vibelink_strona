"use client";

import { useState } from "react";
import { Loader2, Save, Image as ImageIcon, UserCircle, CheckCircle2, FileText, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsClient({ dict, token, profile }: { dict: any; token: string; profile: any; }) {
  // Defensywny słownik
  const t = dict?.settings || {};

  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || "");
  const [bio, setBio] = useState(profile.bio || "");
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const res = await fetch(`${apiUrl}/profiles/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ avatarUrl, bio }),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      showToast(t.saved || "Parametry zaktualizowane pomyślnie!");
    } catch (error) {
      alert(t.error || "Wystąpił krytyczny błąd podczas zapisu do bazy.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  } as any;
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  } as any;

  return (
    <div className="w-full max-w-4xl relative">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }} 
            className="fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-[#050510]/90 backdrop-blur-2xl border border-emerald-500/30 text-white px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold tracking-wide">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* SEKCJA ZDJĘCIA */}
        <motion.div variants={itemVariants} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <ImageIcon className="w-5 h-5 text-indigo-400" />
            </div>
            {t.avatar_title || "Cyfrowa Reprezentacja (Awatar)"}
          </h2>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 relative z-10">
            <div className="relative group/avatar">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-md opacity-30 group-hover/avatar:opacity-60 transition duration-500"></div>
              <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center border-2 border-white/10 overflow-hidden shrink-0 relative z-10">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-14 h-14 text-zinc-600" />
                )}
              </div>
            </div>
            
            <div className="flex-1 w-full space-y-3 group/input">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1 group-focus-within/input:text-indigo-400 transition-colors">URL Obrazu</label>
              <input 
                type="url" 
                value={avatarUrl} 
                onChange={(e) => setAvatarUrl(e.target.value)} 
                placeholder="https://imgur.com/moje-zdjecie.png" 
                className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-md"
              />
            </div>
          </div>
        </motion.div>

        {/* SEKCJA BIO */}
        <motion.div variants={itemVariants} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
            <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            {t.bio_title || "Główny Przekaz (Bio)"}
          </h2>
          <div className="space-y-3 relative z-10 group/textarea">
             <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1 group-focus-within/textarea:text-purple-400 transition-colors">
               Max 160 znaków
             </label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              rows={3}
              maxLength={160}
              placeholder="Zainicjuj protokół powitalny dla swoich odwiedzających..." 
              className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none backdrop-blur-md"
            />
          </div>
        </motion.div>

        {/* PRZYCISK ZAPISU */}
        <motion.div variants={itemVariants} className="flex justify-end pt-4 pb-10">
          <button type="submit" disabled={isLoading} className="relative group px-10 py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center gap-2 bg-[#02000a] border border-white/10 text-white font-bold rounded-full hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 px-8 py-3">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-cyan-400" /> : <Save className="w-5 h-5 text-cyan-400" />}
              {t.save_btn || "Zapisz Ustawienia Rdzenia"}
            </div>
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}