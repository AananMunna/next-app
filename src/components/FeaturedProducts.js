import Link from "next/link";
import Image from "next/image";

export default function FeaturedProducts({ products }) {
  const featured = products.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Featured Smartphones
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {featured.map(({ id, brand, model, images, price, discountPrice }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-48">
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

            <div className="p-4 flex flex-col flex-1 justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {brand} {model}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold text-blue-600">
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
                className="mt-4 inline-block text-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/products"
          className="inline-block text-blue-600 font-semibold hover:underline"
        >
          Show All Products &rarr;
        </Link>
      </div>
    </section>
  );
}
