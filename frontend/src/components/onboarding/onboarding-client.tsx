"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function OnboardingClient({ dict, token, lang }: { dict: any; token: string; lang: string }) {
  const [bio, setBio] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ bio, theme, avatarUrl: "" }), // Tworzymy pusty profil
      });

      if (!res.ok) {
        throw new Error("Wystąpił błąd podczas tworzenia profilu.");
      }

      // Sukces! Wrzucamy do Dashboardu
      window.location.href = `/${lang}/dashboard`;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl shadow-xl backdrop-blur-sm">
      <h1 className="text-2xl font-bold text-white mb-2">Witaj w Vibelink!</h1>
      <p className="text-zinc-400 mb-8">Skonfiguruj swój profil, aby móc dodawać linki.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Twoje krótkie Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={160}
            rows={3}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
            placeholder="Napisz coś o sobie..."
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-300">Wybierz motyw bazowy</label>
          <div className="grid grid-cols-2 gap-3">
            {['dark', 'light', 'neon', 'minimal'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                  theme === t 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                    : 'bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-zinc-950 font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all flex justify-center items-center mt-4"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Zapisz profil i przejdź dalej"}
        </button>
      </form>
    </div>
  );
}