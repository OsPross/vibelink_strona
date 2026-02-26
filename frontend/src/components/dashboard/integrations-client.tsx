"use client";

import { useState } from "react";
import { CheckCircle2, Youtube, PlaySquare, Save, Loader2, Gamepad2, ShieldCheck, Twitch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntegrationsClient({ dict, token, profile, lang }: { dict: any; token: string; profile: any; lang: string; }) {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  const [youtubeUrl, setYoutubeUrl] = useState(profile.youtubeChannelUrl || "");
  const [twitchChannel, setTwitchChannel] = useState(profile.twitchChannel || "");
  const [steamUrl, setSteamUrl] = useState(profile.steamUrl || "");
  const [csRepUrl, setCsRepUrl] = useState(profile.csRepUrl || "");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveIntegrations = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/profiles/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ 
          youtubeChannelUrl: youtubeUrl,
          twitchChannel: twitchChannel,
          steamUrl: steamUrl,
          csRepUrl: csRepUrl
        }),
      });

      if (!res.ok) throw new Error("Błąd");
      showToast(dict.integrations.saved);
    } catch (error) {
      alert(dict.integrations.error);
    } finally {
      setIsLoading(false);
    }
  };

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

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

      <form onSubmit={handleSaveIntegrations} className="space-y-6">
        
        {/* MEDIA (YOUTUBE & TWITCH) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20"><Youtube className="w-5 h-5 text-red-500" /></div>
              {dict.integrations.youtube_title}
            </h2>
            <div className="relative z-10 space-y-4">
              <div className="relative flex flex-col mt-4">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1 mb-1">{dict.integrations.youtube_label}</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 p-2 rounded-lg bg-red-500/10"><PlaySquare className="w-4 h-4 text-red-500" /></div>
                  <input type="url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder={dict.integrations.youtube_placeholder} className="w-full pl-16 pr-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-red-500/50 text-sm" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20"><Twitch className="w-5 h-5 text-purple-400" /></div>
              {dict.integrations.twitch_title}
            </h2>
            <div className="relative z-10 space-y-4">
              <div className="relative flex flex-col mt-4">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1 mb-1">{dict.integrations.twitch_label}</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 p-2 rounded-lg bg-purple-500/10"><span className="font-bold text-purple-400">@</span></div>
                  <input type="text" value={twitchChannel} onChange={(e) => setTwitchChannel(e.target.value)} placeholder={dict.integrations.twitch_placeholder} className="w-full pl-16 pr-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 text-sm" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* STEAM & CS-REP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20"><Gamepad2 className="w-5 h-5 text-blue-500" /></div>
              {dict.integrations.steam_title}
            </h2>
            <div className="relative z-10 mt-4">
              <input type="url" value={steamUrl} onChange={(e) => setSteamUrl(e.target.value)} placeholder={dict.integrations.steam_placeholder} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20"><ShieldCheck className="w-5 h-5 text-orange-500" /></div>
              {dict.integrations.csrep_title}
            </h2>
            <div className="relative z-10 mt-4">
              <input type="url" value={csRepUrl} onChange={(e) => setCsRepUrl(e.target.value)} placeholder={dict.integrations.csrep_placeholder} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-orange-500/50 text-sm" />
            </div>
          </motion.div>
        </div>

        {/* PRZYCISK ZAPISU */}
        <motion.div variants={itemVariants} className="flex justify-end pt-4 pb-10">
          <button type="submit" disabled={isLoading} className="relative group px-10 py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center gap-2 bg-black border border-white/20 text-white font-bold rounded-full hover:scale-[1.03] transition-all px-8 py-3">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-cyan-400" /> : <Save className="w-5 h-5 text-cyan-400" />}
              {dict.integrations.save_btn}
            </div>
          </button>
        </motion.div>
      </form>
    </div>
  );
}