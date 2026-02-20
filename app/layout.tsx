import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

const poppins = Poppins({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atownprinters.co.uk'),
  title: {
    default: 'A-Town Printers | Professional Printing Services London',
    template: '%s | A-Town Printers'
  },
  description: 'London-based professional printing services including clothing & apparel printing, large format displays, and print marketing products. Fast turnaround, quality guaranteed.',
  keywords: ['printing services London', 'workwear printing', 'banner printing', 'business cards', 'custom gazebos'],
  authors: [{ name: 'A-Town Printers' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://atownprinters.co.uk',
    siteName: 'A-Town Printers',
    title: 'A-Town Printers | Professional Printing Services London',
    description: 'London-based professional printing services with fast turnaround',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-Town Printers | Professional Printing Services London',
    description: 'London-based professional printing services',
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
    <html lang="en" className={`${playfairDisplay.variable} ${poppins.variable}`}>
      <body className={`antialiased ${poppins.className}`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}