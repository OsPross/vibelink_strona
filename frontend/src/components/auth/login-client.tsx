"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, ArrowLeft, PaintRoller, Terminal } from "lucide-react";

export default function LoginClient({ lang, dict }: { lang: string; dict: any }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Nieprawidłowe dane logowania. Spróbuj ponownie.");
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push(`/${lang}/dashboard`);
      }
    } catch (err: any) {
      setError(err.message || "Błąd połączenia z serwerem.");
      setIsLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    setIsLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    // Przekierowanie na backend, który zajmie się autoryzacją z Google/Discord
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col lg:flex-row bg-[#030303] text-white selection:bg-indigo-500/30 overflow-hidden font-sans z-[9999]">
      
      {/* ================= LEWA STRONA (WIZUALNA) ================= */}
      <div className="hidden lg:flex w-1/2 h-full relative flex-col justify-between p-12 border-r border-white/5 overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/20 blur-[130px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 blur-[130px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>

        <Link href={`/${lang}`} className="relative z-10 inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit text-sm font-bold uppercase tracking-widest group shrink-0">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Strona Główna
        </Link>

        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-md h-64">
             <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-72 bg-[#050505] border border-white/10 p-6 rounded-[2rem] shadow-2xl -rotate-3">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center"><PaintRoller className="w-6 h-6 text-indigo-400"/></div>
                   <div><p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Silnik Motywów</p><p className="text-lg font-black text-white">16 Vibe'ów</p></div>
                </div>
             </motion.div>
             <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-0 right-0 w-64 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl rotate-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Terminal className="w-5 h-5 text-purple-400"/></div>
                   <p className="text-sm font-bold text-white">Dashboard Live</p>
                </div>
             </motion.div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-black tracking-tighter mb-4 leading-tight">Jeden link.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Nieskończone możliwości.</span></h2>
          <p className="text-zinc-400 text-lg max-w-sm">Zaloguj się i zarządzaj swoim wirtualnym śladem w domenie vibelink.pl.</p>
        </div>
      </div>

      {/* ================= PRAWA STRONA (FORMULARZ) ================= */}
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-12 relative bg-[#080808]">
        <div className="absolute inset-0 lg:hidden pointer-events-none overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-96 bg-indigo-600/10 blur-[100px]" />
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-[420px] relative z-10">
          <Link href={`/${lang}`} className="lg:hidden inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Wróć
          </Link>

          <div className="mb-8 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="w-14 h-14 mb-4 relative">
               <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
               <Image src="/vibelink.png" alt="Logo" fill className="object-contain relative z-10" priority />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">Witaj ponownie</h1>
            <p className="text-zinc-400 text-sm">Zaloguj się do swojego węzła.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center gap-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/input:text-indigo-400 transition-colors" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="hacker@vibelink.pl" className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 py-3.5 pl-11 pr-4 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Hasło</label>
                <Link href="#" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Zapomniałeś?</Link>
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/input:text-indigo-400 transition-colors" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 py-3.5 pl-11 pr-4 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-mono tracking-widest text-sm" />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-white hover:bg-zinc-200 text-black font-black text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-xl group/btn active:scale-[0.98]">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Zaloguj się <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          {/* OAUTH BUTTONY */}
          <div className="mt-5 mb-5 flex items-center gap-3">
             <div className="h-px bg-white/5 flex-1" />
             <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Albo kontynuuj przez</span>
             <div className="h-px bg-white/5 flex-1" />
          </div>

          <div className="flex gap-3">
             <button onClick={() => handleOAuth('google')} type="button" className="flex-1 bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] py-3 rounded-xl flex items-center justify-center gap-2 transition-all group active:scale-[0.98]">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">Google</span>
             </button>
             
             <button onClick={() => handleOAuth('discord')} type="button" className="flex-1 bg-[#5865F2]/10 border border-[#5865F2]/30 hover:border-[#5865F2]/50 hover:bg-[#5865F2]/20 py-3 rounded-xl flex items-center justify-center gap-2 transition-all group shadow-[0_0_15px_rgba(88,101,242,0.1)] hover:shadow-[0_0_25px_rgba(88,101,242,0.2)] active:scale-[0.98]">
                <svg className="w-5 h-5 text-[#5865F2] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.73,67.73,0,0,1-10.87,5.19,77.68,77.68,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
                <span className="text-xs font-bold text-[#5865F2] group-hover:text-white transition-colors">Discord</span>
             </button>
          </div>

          <div className="mt-4 text-center lg:text-left border-t border-white/5 pt-4">
            <p className="text-zinc-500 text-xs font-medium">Nie posiadasz jeszcze profilu? <Link href={`/${lang}/register`} className="text-white font-bold hover:text-indigo-400 transition-colors">Zarejestruj się</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}