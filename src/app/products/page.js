import ProductFilterLayout from "@/components/ProductFilterLayout";

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Browse Products</h1>
      <ProductFilterLayout />
    </main>
  );
}
