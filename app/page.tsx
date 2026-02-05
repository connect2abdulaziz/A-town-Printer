import Hero from '@/components/home/Hero';
import ServiceCategories from '@/components/home/ServiceCategories';
import TrustSignals from '@/components/home/TrustSignals';
import CTASection from '@/components/home/CTASection';
import { serviceCategories } from '@/lib/data/services';

export const metadata = {
  title: 'A-Town Printers | Professional Printing Services UK',
  description: 'UK-based professional printing services including clothing & apparel printing, large format displays, and print marketing products. Fast turnaround, quality guaranteed.',
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'A-Town Printers',
    description: 'Professional printing services in the UK',
    url: 'https://atownprinters.co.uk',
    telephone: '+44-XXX-XXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB'
    },
    serviceArea: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Printing Services',
      itemListElement: serviceCategories.map(cat => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: cat.title,
          description: cat.description
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ServiceCategories categories={serviceCategories} />
      <TrustSignals />
      <CTASection />
    </>
  );
}