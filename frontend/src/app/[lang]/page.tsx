import LandingClient from "@/components/landing-client";
import { getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

// Twarda definicja wspieranych języków
const locales = ["en", "pl"];

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // W Next.js 15+ params są asynchroniczne, musimy je odpakować
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // Walidacja: Jeśli user wklepie nieznany język, od razu tniemy to do 404
  if (!locales.includes(lang)) {
    notFound();
  }

  // Ładowanie słownika po stronie serwera (zero nadmiarowego JS u klienta)
  let dict;
  try {
    dict = await getDictionary(lang as "en" | "pl");
  } catch (error) {
    console.error(`[i18n] Failed to load dictionary for ${lang}:`, error);
    // Fallback do angielskiego, jeśli plik JSON uległ korupcji
    dict = await getDictionary("en"); 
  }

  return <LandingClient dict={dict} lang={lang} />;
}