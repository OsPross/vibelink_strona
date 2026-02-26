"use client";

import { useState } from "react";
import { CheckCircle2, Save, Loader2, Instagram, Twitter, Youtube, Twitch, Github, Linkedin, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialsClient({ dict, token, profile }: { dict: any; token: string; profile: any; }) {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  // Zakładam, że w backendzie masz `socials` jako JSON
  const [socials, setSocials] = useState(profile.socials || {});

  const handleUpdateSocial = (platform: string, value: string) => {
    setSocials({ ...socials, [platform]: value });
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveSocials = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/profiles/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ socials }),
      });

      if (!res.ok) throw new Error("Błąd");
      showToast(dict.socials.saved);
    } catch (error) {
      alert(dict.socials.error);
    } finally {
      setIsLoading(false);
    }
  };

  const platforms = [
    { id: 'instagram', icon: <Instagram className="w-5 h-5 text-pink-500" />, label: 'Instagram' },
    { id: 'twitter', icon: <Twitter className="w-5 h-5 text-sky-400" />, label: 'Twitter (X)' },
    { id: 'youtube', icon: <Youtube className="w-5 h-5 text-red-500" />, label: 'YouTube' },
    { id: 'twitch', icon: <Twitch className="w-5 h-5 text-purple-500" />, label: 'Twitch' },
    { id: 'github', icon: <Github className="w-5 h-5 text-white" />, label: 'GitHub' },
    { id: 'linkedin', icon: <Linkedin className="w-5 h-5 text-blue-500" />, label: 'LinkedIn' },
    { id: 'facebook', icon: <Facebook className="w-5 h-5 text-blue-600" />, label: 'Facebook' },
  ];

  return (
    <div className="w-full max-w-3xl relative">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-xl border border-emerald-500/30 text-white px-6 py-4 rounded-2xl shadow-2xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold tracking-wide">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSaveSocials} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.id} className="relative flex flex-col">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1 mb-1">{platform.label}</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 p-2 rounded-lg bg-black/50 border border-white/5">{platform.icon}</div>
                <input 
                  type="url" 
                  value={socials[platform.id] || ""} 
                  onChange={(e) => handleUpdateSocial(platform.id, e.target.value)} 
                  placeholder={`https://${platform.id}.com/...`} 
                  className="w-full pl-16 pr-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-8">
          <button type="submit" disabled={isLoading} className="relative group px-10 py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center gap-2 bg-black border border-white/20 text-white font-bold rounded-full hover:scale-[1.03] transition-all px-8 py-3">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-cyan-400" /> : <Save className="w-5 h-5 text-cyan-400" />}
              {dict.socials.save}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}