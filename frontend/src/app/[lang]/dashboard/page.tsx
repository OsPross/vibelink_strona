import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// Importujemy słownik tak, jak ustaliliśmy wcześniej (upewnij się, że ścieżka jest dobra!)
import { getDictionary } from '@/dictionaries/dictionaries';
// Jeśli Twój plik z linkami nazywa się inaczej (np. links-client), popraw poniższą ścieżkę
import LinksManagerClient from '@/components/dashboard/links-manager-client';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: 'pl' | 'en' }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  // Pobieramy słownik
  const dict = await getDictionary(lang);
  
  const cookieStore = await cookies();
  // PANCERNE POBIERANIE: Szuka i nowej i starej nazwy ciasteczka!
  const token = cookieStore.get('auth-token')?.value || cookieStore.get('token')?.value;

  if (!token) {
    redirect(`/${lang}/login`);
  }

  try {
    const res = await fetch("http://localhost:3000/profiles/me", {
      headers: { "Authorization": `Bearer ${token}` },
      cache: 'no-store',
    });

    if (res.status === 401) redirect(`/${lang}/login`);
    if (res.status === 404) redirect(`/${lang}/onboarding`);
    if (!res.ok) throw new Error();

    const profile = await res.json();

    return (
      <div className="w-full p-6 sm:p-10 lg:p-14">
        {/* Twój oryginalny Szklany Header */}
        <header className="mb-12 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-transparent blur-2xl rounded-full z-0 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2 drop-shadow-md">
                {dict.dashboard?.title || "Twój Panel"}
              </h1>
              <p className="text-zinc-400 font-medium text-lg">
                Zarządzaj swoim profilem <span className="text-indigo-400">@{profile.user?.username}</span>
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-emerald-400 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              System Online
            </div>
          </div>
        </header>

        {/* Twój Menedżer Linków z dodanym językiem i słownikiem */}
        <LinksManagerClient dict={dict} token={token} profile={profile} lang={lang} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
          Błąd połączenia z serwerem. Spróbuj odświeżyć stronę.
        </p>
      </div>
    );
  }
}