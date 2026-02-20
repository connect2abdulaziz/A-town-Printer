import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCategoryBySlug, serviceCategories } from '@/lib/data/services';
import { getProductsByCategory } from '@/lib/data/products';
import CategoryHero from '@/components/category/CategoryHero';
import ProductGrid from '@/components/category/ProductGrid';
import CategoryCTA from '@/components/category/CategoryCTA';
import ProcessSteps from '@/components/category/ProcessSteps';

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

  const products = getProductsByCategory(category.id);
  
  const keywords = [
    category.title.toLowerCase(),
    'printing services London',
    'professional printing',
    ...products.map(p => p.name.toLowerCase()),
    ...category.examples.map(e => e.toLowerCase()),
  ];

  return {
    title: `${category.title} | A-Town Printers`,
    description: category.description,
    keywords,
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

  // Get products from the products data file
  const products = getProductsByCategory(category.id);

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
      '@type': 'City',
      name: 'London',
    },
    ...(products.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: category.title,
        itemListElement: products.map((product, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Product',
            name: product.name,
            description: product.description || '',
          },
        })),
      },
    }),
  };

  // Create category object with products for components that expect it
  const categoryWithProducts = {
    ...category,
    products: products,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen">
        <CategoryHero category={categoryWithProducts} />
        <ProductGrid products={products} categorySlug={category.slug} />
        <ProcessSteps categoryId={category.id} />
        <CategoryCTA category={categoryWithProducts} />
      </main>
    </>
  );
}
