import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atownprinters.co.uk'),
  title: {
    default: 'A-Town Printers | Professional Printing Services UK',
    template: '%s | A-Town Printers'
  },
  description: 'UK-based professional printing services including clothing & apparel printing, large format displays, and print marketing products. Fast turnaround, quality guaranteed.',
  keywords: ['printing services UK', 'workwear printing', 'banner printing', 'business cards', 'custom gazebos'],
  authors: [{ name: 'A-Town Printers' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://atownprinters.co.uk',
    siteName: 'A-Town Printers',
    title: 'A-Town Printers | Professional Printing Services UK',
    description: 'UK-based professional printing services with fast turnaround',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-Town Printers | Professional Printing Services UK',
    description: 'UK-based professional printing services',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}