import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDictionary } from '@/dictionaries/dictionaries';
import AppearanceClient from "@/components/dashboard/appearance-client";

export default async function AppearancePage({ params }: { params: Promise<{ lang: 'pl' | 'en' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const dict = await getDictionary(lang);
  
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value || cookieStore.get('token')?.value;

  if (!token) redirect(`/${lang}/login`);

  const res = await fetch("http://localhost:3000/profiles/me", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) redirect(`/${lang}/login`);
  const profile = await res.json();

  return (
    <div className="w-full p-6 sm:p-10 lg:p-14">
      <header className="mb-12 relative">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
          {dict.appearance?.title}
        </h1>
        <p className="text-zinc-400 font-medium text-lg">
          {dict.appearance?.subtitle}
        </p>
      </header>

      <AppearanceClient dict={dict} token={token} profile={profile} />
    </div>
  );
}