import { getDictionary } from '@/dictionaries/dictionaries';
import Link from 'next/link';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: 'pl' | 'en' }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Pasek Boczny (Sidebar) */}
      <aside className="w-64 border-r border-white/5 bg-black/20 p-6 flex flex-col hidden md:flex">
        <div className="text-2xl font-black text-white mb-10 tracking-tighter">VibeLink.</div>
        
       <nav className="flex-1 flex flex-col gap-2">
          <Link href={`/${lang}/dashboard`} className="text-zinc-400 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-colors font-medium">
            {dict.sidebar.links}
          </Link>
          <Link href={`/${lang}/dashboard/socials`} className="text-zinc-400 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-colors font-medium">
            {dict.sidebar.socials}
          </Link>
          <Link href={`/${lang}/dashboard/appearance`} className="text-zinc-400 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-colors font-medium">
            {dict.sidebar.appearance}
          </Link>
          <Link href={`/${lang}/dashboard/integrations`} className="text-zinc-400 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-colors font-medium">
            {dict.sidebar.integrations}
          </Link>
          <Link href={`/${lang}/dashboard/settings`} className="text-zinc-400 hover:text-white p-3 rounded-xl hover:bg-white/5 transition-colors font-medium">
            {dict.sidebar.settings}
          </Link>
        </nav>

        <button className="text-red-400 hover:bg-red-500/10 p-3 rounded-xl transition-colors text-left font-semibold">
          {dict.sidebar.logout}
        </button>
      </aside>

      {/* Główna zawartość */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}