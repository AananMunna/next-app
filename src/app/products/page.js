import { getProductsCollection } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export default async function ProductsPage() {
  const productsCollection = await getProductsCollection();
  const products = await productsCollection.find({}).sort({ releaseDate: -1 }).toArray();

  const productsData = products.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Featured Smartphones 📱
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsData.map(({ id, brand, model, images, price, discountPrice }) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-56">
              {images && images.length > 0 ? (
                <Image
                  src={images[0]}
                  alt={`${brand} ${model}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {brand} {model}
              </h2>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xl font-bold text-blue-600">
                  ${discountPrice?.$numberInt || price?.$numberInt}
                </span>
                {discountPrice && (
                  <span className="line-through text-gray-500 text-sm">
                    ${price?.$numberInt}
                  </span>
                )}
              </div>

              <Link
                href={`/products/${id}`}
                className="mt-5 inline-block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
