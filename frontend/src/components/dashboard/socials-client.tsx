"use client";

import { useState } from "react";
import { CheckCircle2, Save, Loader2, Instagram, Twitter, Youtube, Twitch, Github, Linkedin, Facebook, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialsClient({ dict, token, profile }: { dict: any; token: string; profile: any; }) {
  const t = dict?.socials || {};
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
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
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const res = await fetch(`${apiUrl}/profiles/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ socials }),
      });

      if (!res.ok) throw new Error("API Error");
      showToast(t.saved || "Węzły społecznościowe zsynchronizowane.");
    } catch (error) {
      alert(t.error || "Błąd synchronizacji węzłów.");
    } finally {
      setIsLoading(false);
    }
  };

  const platforms = [
    { id: 'instagram', icon: <Instagram className="w-5 h-5 text-pink-500" />, label: 'Instagram' },
    { id: 'twitter', icon: <Twitter className="w-5 h-5 text-zinc-300" />, label: 'Twitter (X)' },
    { id: 'youtube', icon: <Youtube className="w-5 h-5 text-red-500" />, label: 'YouTube' },
    { id: 'twitch', icon: <Twitch className="w-5 h-5 text-purple-500" />, label: 'Twitch' },
    { id: 'github', icon: <Github className="w-5 h-5 text-white" />, label: 'GitHub' },
    { id: 'linkedin', icon: <Linkedin className="w-5 h-5 text-blue-400" />, label: 'LinkedIn' },
    { id: 'facebook', icon: <Facebook className="w-5 h-5 text-blue-600" />, label: 'Facebook' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full max-w-4xl relative">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-[#050510]/90 backdrop-blur-2xl border border-blue-500/30 text-white px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <CheckCircle2 className="w-6 h-6 text-blue-400" />
            <span className="font-semibold tracking-wide">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSaveSocials} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
          <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <Globe className="w-5 h-5 text-blue-400" />
          </div>
          {t.title || "Węzły Społecznościowe"}
        </h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {platforms.map((platform) => (
            <motion.div key={platform.id} variants={itemVariants} className="relative flex flex-col group/input">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-2 mb-1.5 group-focus-within/input:text-blue-400 transition-colors">
                {platform.label}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 p-2 rounded-xl bg-white/5 border border-white/10 group-focus-within/input:border-blue-500/50 group-focus-within/input:bg-blue-500/10 transition-colors">
                  {platform.icon}
                </div>
                <input 
                  type="url" 
                  value={socials[platform.id] || ""} 
                  onChange={(e) => handleUpdateSocial(platform.id, e.target.value)} 
                  placeholder={`https://${platform.id}.com/...`} 
                  className="w-full pl-16 pr-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-zinc-700 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm backdrop-blur-md shadow-inner" 
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-end pt-10 relative z-10">
          <button type="submit" disabled={isLoading} className="relative group px-10 py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center gap-2 bg-[#02000a] border border-white/10 text-white font-bold rounded-full hover:scale-[1.02] transition-all px-8 py-3 disabled:opacity-50">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-blue-400" /> : <Save className="w-5 h-5 text-blue-400" />}
              {t.save || "Zsynchronizuj Sieć"}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}