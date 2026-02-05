import { notFound } from 'next/navigation';
import { Metadata } from 'next';
// import CategoryHero from '@/components/category/CategoryHero';
// import ProductGrid from '@/components/category/ProductGrid';
// import CategoryCTA from '@/components/category/CategoryCTA';
// import ProcessSteps from '@/components/category/ProcessSteps';
import { getCategoryBySlug, serviceCategories } from '@/lib/data/services';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} | A-Town Printers`,
    description: category.description,
    keywords: [
      category.title.toLowerCase(),
      'printing services UK',
      'professional printing',
      ...category.products.map(p => p.name.toLowerCase())
    ],
    openGraph: {
      title: `${category.title} | A-Town Printers`,
      description: category.description,
      url: `https://atownprinters.co.uk/${category.slug}`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Generate JSON-LD schema for the category
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category.title,
    description: category.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'A-Town Printers',
      url: 'https://atownprinters.co.uk',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: category.title,
      itemListElement: category.products.map((product, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* <CategoryHero category={category} />
      <ProductGrid products={category.products} categorySlug={category.slug} />
      <ProcessSteps categoryId={category.id} />
      <CategoryCTA category={category} /> */}
    </>
  );
}