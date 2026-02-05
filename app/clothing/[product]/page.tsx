export default async function ClothingProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  return (
    <main>
      <h1>Clothing Product</h1>
      <p>Product: {product}</p>
    </main>
  );
}
