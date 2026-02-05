export default async function PrintMarketingProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  return (
    <main>
      <h1>Print Marketing Product</h1>
      <p>Product: {product}</p>
    </main>
  );
}
