import { getDictionary } from '@/dictionaries/dictionaries';
import SidebarClient from '@/components/dashboard/sidebar-client';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // Vercel wymaga tutaj generycznego stringa:
  params: Promise<{ lang: string }>; 
}) {
  const resolvedParams = await params;
  // A tutaj rzutujemy go sobie na nasz ścisły typ:
  const lang = resolvedParams.lang as 'pl' | 'en'; 
  
  // Pobieramy słownik z fallbackiem
  let dict;
  try {
    dict = await getDictionary(lang);
  } catch (error) {
    dict = await getDictionary('en');
  }

  return (
    <div className="relative min-h-screen bg-[#02000a] text-zinc-200 overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-100 flex">
      
      {/* --- WSPÓLNE HOLOGRAFICZNE TŁO DLA CAŁEGO DASHBOARDU --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-700/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-700/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      {/* --- KLIENCKI SIDEBAR (Z wstrzykniętym słownikiem) --- */}
      <SidebarClient lang={lang} dict={dict} />

      {/* --- GŁÓWNA ZAWARTOŚĆ --- */}
      {/* md:ml-72 robi miejsce na desktopowy sidebar. pb-24 robi miejsce na mobilny bottom-bar */}
      <main className="flex-1 relative z-10 md:ml-72 min-h-screen overflow-y-auto pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}