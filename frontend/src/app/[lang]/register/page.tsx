import { getDictionary } from "@/dictionaries/dictionaries";
import RegisterClient from "@/components/auth/register-client";

export default async function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as 'pl' | 'en';
  
  const dict = await getDictionary(lang);

  return <RegisterClient dict={dict} lang={lang} />;
}