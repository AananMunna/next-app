import ProductFilterLayout from "@/components/ProductFilterLayout";
import { getProductsCollection } from "@/lib/db";

export default async function ProductsPage() {
  const productsCollection = await getProductsCollection();
  const products = await productsCollection.find({}).sort({ releaseDate: -1 }).toArray();

  const productsData = products.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


      {/* Pass products to client filter + grid layout */}
      <ProductFilterLayout products={productsData} />
    </main>
  );
}
