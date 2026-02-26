"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SpotifyCallbackPage({ params }: { params: Promise<{ lang: string }> }) {
  // ROZPAKOWUJEMY PROMISE (Nowość w Next.js 15/16)
  const resolvedParams = use(params);
  const lang = resolvedParams.lang || 'pl';

  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [status, setStatus] = useState("Autoryzowanie z serwerami Spotify...");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!code) {
      setStatus("Brak kodu autoryzacji. Przekierowuję...");
      setError(true);
      setTimeout(() => router.push(`/${lang}/dashboard/settings`), 2000);
      return;
    }

    const connectToBackend = async () => {
      try {
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(';').shift();
        };
        const token = getCookie("auth-token");

        if (!token) throw new Error("Brak tokena sesji");

        const res = await fetch("http://127.0.0.1:3000/profiles/spotify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) throw new Error("Backend odrzucił kod");

        setStatus("Połączono pomyślnie! Wracamy do bazy...");
        setTimeout(() => router.push(`/${lang}/dashboard/settings`), 1500);

      } catch (err) {
        setStatus("Wystąpił błąd podczas łączenia.");
        setError(true);
        setTimeout(() => router.push(`/${lang}/dashboard/settings`), 3000);
      }
    };

    connectToBackend();
  }, [code, router, lang]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white selection:bg-green-500/40">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-green-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center max-w-md text-center shadow-[0_0_50px_rgba(34,197,94,0.15)] relative z-10">
        {!error ? (
          <Loader2 className="w-16 h-16 text-green-500 animate-spin mb-6" />
        ) : (
          <div className="w-16 h-16 bg-red-500/10 text-red-500 flex items-center justify-center rounded-2xl mb-6 border border-red-500/20 text-2xl">❌</div>
        )}
        <h1 className="text-2xl font-bold mb-2">Połączenie Spotify</h1>
        <p className="text-zinc-400 font-medium">{status}</p>
      </div>
    </div>
  );
}