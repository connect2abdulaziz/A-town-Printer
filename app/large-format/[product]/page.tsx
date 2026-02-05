export default async function LargeFormatProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  return (
    <main>
      <h1>Large Format Product</h1>
      <p>Product: {product}</p>
    </main>
  );
}
