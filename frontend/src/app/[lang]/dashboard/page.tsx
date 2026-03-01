import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDictionary } from '@/dictionaries/dictionaries';
import LinksManagerClient from '@/components/dashboard/links-manager-client';
import { Activity, ShieldCheck } from 'lucide-react';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: 'pl' | 'en' }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  let dict;
  try {
    dict = await getDictionary(lang);
  } catch (e) {
    dict = await getDictionary('en');
  }
  
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value || cookieStore.get('token')?.value;

  if (!token) {
    redirect(`/${lang}/login`);
  }

  // Zabezpieczenie URL API na produkcję
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${apiUrl}/profiles/me`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: 'no-store',
    });

    if (res.status === 401) redirect(`/${lang}/login`);
    if (res.status === 404) redirect(`/${lang}/onboarding`);
    if (!res.ok) throw new Error("API Connection Failed");

    const profile = await res.json();

    return (
      <div className="w-full p-6 sm:p-10 lg:p-14 max-w-6xl mx-auto">
        
        {/* --- FUTURYSTYCZNY NAGŁÓWEK DASHBOARDU --- */}
        <header className="mb-12 relative bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 overflow-hidden backdrop-blur-xl group">
          {/* Animowany gradient wewnątrz nagłówka */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-50 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-1000" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Auth Token Verified
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {dict.dashboard?.title || "Command Center."}
              </h1>
              <p className="text-zinc-400 font-medium text-lg">
                Zarządzaj swoim węzłem sieciowym <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">@{profile.user?.username}</span>
              </p>
            </div>
            
            {/* Wskaźnik statusu serwera */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#02000a]/50 border border-white/10 shadow-lg backdrop-blur-md self-start md:self-auto">
              <Activity className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">System Status</p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-bold text-emerald-400">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- KOMPONENT DO ZARZĄDZANIA LINKAMI --- */}
        <LinksManagerClient dict={dict} token={token} profile={profile} lang={lang} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-8 max-w-md w-full text-center backdrop-blur-xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Activity className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Błąd Systemu</h2>
          <p className="text-zinc-400 mb-6">
            Utracono połączenie z rdzeniem serwera (API). Sprawdź logi dockera.
          </p>
          <button onClick={() => typeof window !== 'undefined' && window.location.reload()} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-colors">
            Zainicjuj ponowne połączenie
          </button>
        </div>
      </div>
    );
  }
}