"use client";

import { useState } from "react";
import { Loader2, Save, Image as ImageIcon, UserCircle, CheckCircle2, Paintbrush, FileText, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const THEMES = [
  { id: 'dark', name: 'Dark Mode', preview: 'bg-zinc-900 border-zinc-700 text-zinc-300' },
  { id: 'light', name: 'Light Mode', preview: 'bg-zinc-100 border-white text-zinc-900 shadow-inner' },
  { id: 'neon', name: 'Neon Cyber', preview: 'bg-zinc-950 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' },
  { id: 'minimal', name: 'Minimalist', preview: 'bg-white border-black text-black rounded-none font-serif' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', preview: 'bg-yellow-400 border-red-500 text-black font-bold uppercase tracking-wider shadow-[4px_4px_0px_rgba(239,68,68,1)]' },
  { id: 'synthwave', name: 'Synthwave 84', preview: 'bg-gradient-to-r from-purple-600 to-pink-600 border-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' },
  { id: 'hacker', name: 'Terminal / Hacker', preview: 'bg-black border-green-500 text-green-500 font-mono shadow-[0_0_10px_rgba(34,197,94,0.3)]' },
  { id: 'glass', name: 'Glassmorphism', preview: 'bg-white/10 backdrop-blur-md border-white/20 text-white shadow-xl' },
];

// --- TUTAJ WKLEJ SWÓJ CLIENT ID ZE SPOTIFY ---
const SPOTIFY_CLIENT_ID = "ec1fecea75a44c3aad72101e11c7723b"; 
const SPOTIFY_REDIRECT_URI = "http://127.0.0.1:3001/pl/spotify/callback";

export default function SettingsClient({ dict, token, profile }: { dict: any; token: string; profile: any; }) {
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [theme, setTheme] = useState(profile.theme || "dark");
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isSpotifyConnected = !!profile.spotifyRefreshToken;

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/profiles/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ avatarUrl, bio, theme }),
      });

      if (!res.ok) throw new Error("Nie udało się zapisać zmian");
      showToast(dict.dashboard?.settings_saved || "Parametry zaktualizowane pomyślnie!");
    } catch (error) {
      alert("Wystąpił błąd podczas zapisu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpotifyConnect = () => {
    const scope = "user-read-currently-playing user-read-playback-state";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full max-w-4xl relative">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }} 
            className="fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-xl border border-emerald-500/30 text-white px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold tracking-wide">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* SEKCJA ZDJĘCIA */}
        <motion.div variants={itemVariants} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <ImageIcon className="w-5 h-5 text-indigo-400" />
            </div>
            Awatar Cyfrowy
          </h2>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 relative z-10">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="w-28 h-28 rounded-full bg-zinc-950 flex items-center justify-center border-2 border-white/10 overflow-hidden shrink-0 relative z-10">
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
                className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-md"
              />
            </div>
          </div>
        </motion.div>

        {/* SEKCJA BIO */}
        <motion.div variants={itemVariants} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
            <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            Bio / Opis
          </h2>
          <div className="space-y-3 relative z-10 group/textarea">
             <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1 group-focus-within/textarea:text-purple-400 transition-colors">Twój przekaz</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              rows={3}
              maxLength={160}
              placeholder="Zainicjuj protokół powitalny..." 
              className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none backdrop-blur-md"
            />
          </div>
        </motion.div>

      

        {/* SEKCJA MOTYWÓW */}
        <motion.div variants={itemVariants} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
            <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <Paintbrush className="w-5 h-5 text-cyan-400" />
            </div>
            Interfejs Wizualny (Motyw)
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`relative h-24 rounded-2xl border-2 transition-all overflow-hidden flex items-center justify-center p-4 group/btn
                  ${theme === t.id ? 'border-indigo-500 ring-4 ring-indigo-500/20 scale-105 z-10' : 'border-transparent hover:border-white/20 hover:scale-105'}
                `}
              >
                <div className={`absolute inset-0 opacity-80 group-hover/btn:opacity-100 transition-opacity ${t.preview}`}></div>
                {theme === t.id && (
                  <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-0.5 shadow-lg z-20">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className={`relative z-20 font-bold text-sm text-center drop-shadow-md ${t.preview.includes('text-black') || t.preview.includes('text-zinc-900') ? 'text-black' : 'text-white'}`}>
                  {t.name}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* PRZYCISK ZAPISU */}
        <motion.div variants={itemVariants} className="flex justify-end pt-4 pb-10">
          <button type="submit" disabled={isLoading} className="relative group px-10 py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center gap-2 bg-black border border-white/20 text-white font-bold rounded-full hover:scale-[1.03] transition-all disabled:opacity-50 disabled:hover:scale-100 px-8 py-3">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-cyan-400" /> : <Save className="w-5 h-5 text-cyan-400" />}
              Zapisz Konfigurację
            </div>
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}