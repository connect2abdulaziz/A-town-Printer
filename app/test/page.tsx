import { serviceCategories, getCategoryBySlug } from '@/lib/data/services';

export default function TestPage() {
  // Test getting a category
  const clothingCategory = getCategoryBySlug('clothing');
  const largeFormatCategory = getCategoryBySlug('large-format');
  const printMarketingCategory = getCategoryBySlug('print-marketing');

  return (
    <div className="min-h-screen p-8 bg-background">
      <h1 className="text-3xl font-bold mb-8">Category Data Test</h1>
      
      <div className="space-y-8">
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">All Categories</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(serviceCategories, null, 2)}
          </pre>
        </div>

        <div className="border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Clothing Category</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(clothingCategory, null, 2)}
          </pre>
        </div>

        <div className="border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Large Format Category</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(largeFormatCategory, null, 2)}
          </pre>
        </div>

        <div className="border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Print Marketing Category</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(printMarketingCategory, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}