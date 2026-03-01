import { getDictionary } from "@/dictionaries/dictionaries";
import RegisterClient from "@/components/auth/register-client";

export default async function RegisterPage({ params }: { params: Promise<{ lang: 'pl' | 'en' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  // Komponent kliencki przejmuje 100% ekranu
  return <RegisterClient dict={dict} lang={lang} />;
}