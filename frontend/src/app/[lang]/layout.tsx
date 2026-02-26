import '../globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ValidLocale } from '@/lib/dictionaries';

export const metadata: Metadata = {
  title: 'Vibelink | Your digital identity',
  description: 'Futuristic link-in-bio platform',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  
  return (
    <html lang={resolvedParams.lang}>
      <body>{children}</body>
    </html>
  );
}