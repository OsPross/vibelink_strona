"use client";

import { useState } from "react";
import { CheckCircle2, Youtube, Save, Loader2, Gamepad2, ShieldCheck, Twitch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntegrationsClient({ dict, token, profile, lang }: { dict: any; token: string; profile: any; lang: string; }) {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  const [youtubeUrl, setYoutubeUrl] = useState(profile.youtubeChannelUrl || "");
  const [twitchChannel, setTwitchChannel] = useState(profile.twitchChannel || "");
  const [steamUrl, setSteamUrl] = useState(profile.steamUrl || "");
  const [csRepUrl, setCsRepUrl] = useState(profile.csRepUrl || ""); // POWRÓT CS-REP

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveIntegrations = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/profiles/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ 
          youtubeChannelUrl: youtubeUrl,
          twitchChannel: twitchChannel,
          steamUrl: steamUrl,
          csRepUrl: csRepUrl // POWRÓT CS-REP
        }),
      });

      if (!res.ok) throw new Error("Błąd");
      showToast(dict?.integrations?.saved || "Węzły integracji zsynchronizowane.");
    } catch (error) {
      alert(dict?.integrations?.error || "Wystąpił krytyczny błąd zapisu.");
    } finally {
      setIsLoading(false);
    }
  };

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="w-full max-w-4xl relative">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-[#050510]/90 backdrop-blur-xl border border-emerald-500/30 text-white px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold tracking-wide">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSaveIntegrations} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3 relative z-10">
              <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20"><Youtube className="w-5 h-5 text-red-500" /></div>
              YouTube
            </h2>
            <div className="relative z-10 mt-4">
               <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-1 block">Link do kanału</label>
               <input type="url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/@twojkanal" className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-red-500/50 text-sm transition-all" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3 relative z-10">
              <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20"><Twitch className="w-5 h-5 text-purple-400" /></div>
              Twitch
            </h2>
            <div className="relative z-10 mt-4">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-1 block">Nazwa kanału</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 font-bold text-purple-400">@</div>
                <input type="text" value={twitchChannel} onChange={(e) => setTwitchChannel(e.target.value)} placeholder="twojkanal" className="w-full pl-10 pr-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 text-sm transition-all" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3 relative z-10">
              <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20"><Gamepad2 className="w-5 h-5 text-blue-500" /></div>
              Steam Profile
            </h2>
            <div className="relative z-10 mt-4">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-1 block">Adres profilu Steam</label>
              <input type="url" value={steamUrl} onChange={(e) => setSteamUrl(e.target.value)} placeholder="https://steamcommunity.com/id/..." className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 text-sm transition-all" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3 relative z-10">
              <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20"><ShieldCheck className="w-5 h-5 text-orange-400" /></div>
              CS-Reputation
            </h2>
            <div className="relative z-10 mt-4">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-1 block">Link do profilu CS-Rep</label>
              <input type="url" value={csRepUrl} onChange={(e) => setCsRepUrl(e.target.value)} placeholder="https://csrep.gg/player/76561198..." className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-orange-500/50 text-sm transition-all" />
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="flex justify-end pt-6 pb-10">
          <button type="submit" disabled={isLoading} className="relative group px-10 py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center gap-2 bg-[#02000a] border border-white/10 text-white font-bold rounded-full hover:scale-[1.02] transition-all px-8 py-3 disabled:opacity-50">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-blue-400" /> : <Save className="w-5 h-5 text-blue-400" />}
              Zapisz Integracje
            </div>
          </button>
        </motion.div>
      </form>
    </div>
  );
}