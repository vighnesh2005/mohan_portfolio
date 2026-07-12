import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: 'Mohan Kadimpalli | Chartered Accountant',
  description:
    'Chartered Accountant and management consultant helping founders, farmer producer companies, and nonprofits build compliant, investment-ready operations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
