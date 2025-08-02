import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { getProductsCollection } from "@/lib/db";

export default async function Home() {
  const productsCollection = await getProductsCollection();
  const products = await productsCollection.find({}).sort({ releaseDate: -1 }).toArray();

  const productsData = products.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));

  return (
    <>
      <Hero />
      <FeaturedProducts products={productsData} />
    </>
  );
}
