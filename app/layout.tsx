import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jennifer Hahm, Ph.D. - Psychological Services',
  description: 'Professional psychological care for change, insight, and well-being. Offering individual psychotherapy for adults via telehealth across most U.S. states.',
  keywords: 'psychology, therapy, mental health, telehealth, counseling, Jennifer Hahm, PSYPACT',
  authors: [{ name: 'Jennifer Hahm, Ph.D.' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Jennifer Hahm, Ph.D. - Psychological Services',
    description: 'Professional psychological care for change, insight, and well-being.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}