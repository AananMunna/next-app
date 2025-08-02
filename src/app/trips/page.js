import { getTripsCollection } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export default async function ProductsPage() {
  const tripsCollection = await getTripsCollection();
  const products = await tripsCollection.find({}).sort({ date: 1 }).toArray();

  // Convert _id ObjectId to string
  const productsData = products.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Featured Smartphones 📱
      </h1>

      {/* Product Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsData.map(({ id, title, image, description, price, discountPrice, rating }) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            {/* Product Image */}
            <div className="relative w-full h-56">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority={false}
              />
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(rating || 0) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < Math.round(rating || 0) ? "currentColor" : "none"}
                  />
                ))}
                <span className="text-sm text-gray-500">({rating || "4.5"})</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-xl font-bold text-blue-600">
                  ${discountPrice || price}
                </span>
                {discountPrice && (
                  <span className="line-through text-gray-500 text-sm">
                    ${price}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex gap-2">
                <Link
                  href={`/trips/${id}`}
                  className="flex-1 inline-block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
                <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
