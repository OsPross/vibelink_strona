"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginClient({ dict, lang }: { dict: any; lang: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Błąd logowania");

      const data = await res.json();
      document.cookie = `token=${data.access_token}; path=/; max-age=86400`;
      
      // Przekierowanie do dashboardu w odpowiednim języku!
      router.push(`/${lang}/dashboard`);
      router.refresh();
    } catch (err: any) {
      setError(dict.auth.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl relative z-10">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg mx-auto mb-4">
          <span className="text-white font-black text-2xl leading-none">V</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{dict.auth.login_title}</h1>
        <p className="text-zinc-400 text-sm">{dict.auth.login_subtitle}</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6 text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 ml-1">{dict.auth.email}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 ml-1">{dict.auth.password}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
        </div>

        <button type="submit" disabled={isLoading} className="w-full py-4 mt-2 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
          {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> {dict.auth.loading}</> : dict.auth.login_btn}
        </button>
      </form>

      <p className="mt-8 text-center text-zinc-500 text-sm">
        {dict.auth.no_account}{" "}
        <Link href={`/${lang}/register`} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          {dict.auth.register_link}
        </Link>
      </p>
    </div>
  );
}