import { getDictionary } from "@/dictionaries/dictionaries";
import LoginClient from "@/components/auth/login-client";

export default async function LoginPage({ params }: { params: Promise<{ lang: 'pl' | 'en' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  // Komponent kliencki przejmuje 100% ekranu, nie dajemy tu żadnego diva
  return <LoginClient dict={dict} lang={lang} />;
}