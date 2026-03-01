"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage({ params }: { params: { lang: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = params?.lang || "pl";

  useEffect(() => {
    // Pobieramy token z URL, np. /auth/callback?token=eyJhbGciOi...
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      // Zapisujemy token i lecimy do bazy
      localStorage.setItem("token", token);
      router.push(`/${lang}/dashboard`);
    } else if (error) {
      // Jeśli backend zwrócił błąd (np. użytkownik anulował)
      router.push(`/${lang}/login?error=${error}`);
    } else {
      // Jeśli z jakiegoś powodu weszliśmy tu bez niczego
      router.push(`/${lang}/login`);
    }
  }, [searchParams, router, lang]);

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white">
      <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
      <h2 className="text-xl font-bold tracking-widest uppercase">Autoryzacja...</h2>
      <p className="text-zinc-500 text-sm mt-2">Nawiązywanie bezpiecznego połączenia z węzłem.</p>
    </div>
  );
}