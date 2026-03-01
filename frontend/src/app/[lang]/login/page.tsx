import { getDictionary } from "@/dictionaries/dictionaries";
import LoginClient from "@/components/auth/login-client";

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as 'pl' | 'en';
  
  const dict = await getDictionary(lang);

  return <LoginClient dict={dict} lang={lang} />;
}