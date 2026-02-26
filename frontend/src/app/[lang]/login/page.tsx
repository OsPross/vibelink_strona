import { getDictionary } from "@/dictionaries/dictionaries";
import LoginClient from "@/components/auth/login-client";

export default async function LoginPage({ params }: { params: Promise<{ lang: 'pl' | 'en' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <LoginClient dict={dict} lang={lang} />
    </div>
  );
}