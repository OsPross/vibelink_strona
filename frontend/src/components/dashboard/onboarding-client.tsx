"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Rocket } from "lucide-react";

export default function OnboardingClient({ dict, lang, token }: { dict: any; lang: string; token: string }) {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [theme, setTheme] = useState("dark");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Autoryzacja dla NestJS
        },
        body: JSON.stringify({ bio, theme }),
      });

      if (!res.ok) {
        throw new Error(dict.onboarding.error);
      }

      // Odświeżamy stronę serwerową - tym razem znajdzie profil i przepuści nas do panelu
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || dict.onboarding.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-full max-w-lg">
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-indigo-500/30 p-8 rounded-[2rem] shadow-[0_0_40px_rgba(99,102,241,0.1)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
              <Rocket className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{dict.onboarding.title}</h1>
            <p className="text-zinc-400">{dict.onboarding.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">{dict.onboarding.bio}</label>
              <textarea
                maxLength={160}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                placeholder={dict.onboarding.bio_placeholder}
              />
              <div className="text-right text-xs text-zinc-500">{bio.length}/160</div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-300 ml-1">{dict.onboarding.theme}</label>
              <div className="grid grid-cols-2 gap-3">
                {['dark', 'light', 'neon', 'minimal'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      theme === t 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]' 
                        : 'bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {dict.onboarding[`theme_${t}`]}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3 text-center">{error}</div>}

            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-4 mt-4 bg-white text-zinc-950 hover:bg-zinc-200 font-bold rounded-xl transition-all disabled:opacity-50">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : dict.onboarding.btn}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}