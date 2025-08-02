import { ObjectId } from "mongodb";
import { getProductsCollection } from "@/lib/db";
import Image from "next/image";

export default async function ProductDetailsPage({ params }) {
  const { id } = params;
  const productsCollection = await getProductsCollection();

  const product = await productsCollection.findOne({ _id: new ObjectId(id) });

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* TOP SECTION */}
      <section className="grid md:grid-cols-2 gap-12 items-start">
        {/* IMAGES */}
        <div>
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={product?.images?.[0] ?? "/placeholder.png"}
              alt={product?.title ?? "Product Image"}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex gap-4 mt-6 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
            {product?.images
              ?.filter((img) => typeof img === "string" && img.startsWith("http"))
              .slice(1, 5)
              .map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 hover:border-blue-600 transition flex-shrink-0"
                >
                  <Image
                    src={img}
                    alt={`${product?.title} angle ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="96px"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{product?.title}</h1>
          <p className="text-lg text-gray-600 font-semibold">{product?.brand} - {product?.model}</p>

          <div className="flex items-center gap-3">
            <span className="text-yellow-500 font-bold text-xl">⭐ {product?.rating ?? "N/A"}</span>
            <span className="text-gray-500 text-sm">({product?.reviews?.length ?? 0} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-extrabold text-blue-700">
              ${product?.discountPrice ?? product?.price}
            </p>
            {product?.discountPrice && (
              <p className="text-gray-400 line-through text-lg">${product?.price}</p>
            )}
          </div>

          <p className={`font-medium ${product?.stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <p className="text-gray-700 font-medium">Warranty: {product?.warranty}</p>

          <button
            className={`mt-auto px-6 py-3 rounded-lg font-semibold transition 
              ${product?.stock > 0 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 cursor-not-allowed"}`}
            disabled={product?.stock <= 0}
          >
            Add to Cart
          </button>

          <p className="mt-6 text-gray-700 leading-relaxed">{product?.overview}</p>
        </div>
      </section>

      {/* TECHNICAL SPECS */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">Technical Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-gray-800">
          <SpecItem label="Processor" value={product?.technicalSpecs?.processor} />
          <SpecItem label="RAM" value={product?.technicalSpecs?.ram} />
          <SpecItem label="Storage Options" value={product?.technicalSpecs?.storage?.join(", ")} />
          <SpecItem label="Battery" value={product?.technicalSpecs?.battery} />
          <SpecItem label="Display" value={`${product?.technicalSpecs?.display?.size} / ${product?.technicalSpecs?.display?.type}`} />
          <SpecItem label="Resolution" value={product?.technicalSpecs?.display?.resolution} />
          <SpecItem label="Refresh Rate" value={product?.technicalSpecs?.display?.refreshRate} />
          <SpecItem label="Display Protection" value={product?.technicalSpecs?.display?.protection} />
          <SpecItem label="Rear Cameras" value={
            product?.technicalSpecs?.rearCameras
              ?.map(cam => `${cam.type} (${cam.mp} MP${cam.opticalZoom ? `, ${cam.opticalZoom} Zoom` : ""})`)
              .join(", ")
          } />
          <SpecItem label="Front Camera" value={`${product?.technicalSpecs?.frontCamera?.mp} MP, Features: ${product?.technicalSpecs?.frontCamera?.features?.join(", ")}`} />
          <SpecItem label="Operating System" value={product?.technicalSpecs?.os} />
          <SpecItem label="Connectivity" value={
            `5G: ${product?.technicalSpecs?.connectivity?.["5G"] ? "Yes" : "No"}, Bluetooth: ${product?.technicalSpecs?.connectivity?.bluetooth}, WiFi: ${product?.technicalSpecs?.connectivity?.wifi?.join(", ")}, NFC: ${product?.technicalSpecs?.connectivity?.nfc ? "Yes" : "No"}`
          } />
          <SpecItem label="Dimensions (H x W x D)" value={
            `${product?.technicalSpecs?.dimensions?.height} × ${product?.technicalSpecs?.dimensions?.width} × ${product?.technicalSpecs?.dimensions?.depth}`
          } />
          <SpecItem label="Weight" value={product?.technicalSpecs?.weight} />
          <SpecItem label="Color Options" value={product?.technicalSpecs?.colorOptions?.join(", ")} />
          <SpecItem label="IP Rating" value={product?.technicalSpecs?.ipRating} />
          <SpecItem label="Sensors" value={product?.technicalSpecs?.sensors?.join(", ")} />
        </div>
      </section>

      {/* DESCRIPTION SECTIONS */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">Detailed Description</h2>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          {Object.entries(product?.descriptionSections ?? {}).map(([key, val]) => (
            <div key={key}>
              <h3 className="text-xl font-semibold capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</h3>
              <p>{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">Customer Reviews</h2>
        <div className="space-y-8 max-h-[300px] overflow-y-auto pr-4">
          {product?.reviews?.length ? (
            product.reviews.map((review, i) => (
              <div key={i} className="border-b border-gray-300 pb-4">
                <p className="font-semibold text-gray-900">{review?.user}</p>
                <p className="text-yellow-500 font-semibold">⭐ {review?.rating}</p>
                <p className="text-gray-700 italic mt-1">{review?.comment}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(review?.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </section>

      {/* AVAILABLE AT */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">Available At</h2>
        <ul className="list-disc list-inside text-blue-700 font-semibold space-y-1">
          {product?.availableAt?.map((store, i) => (
            <li key={i} className="hover:underline cursor-pointer">{store}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

// Helper component for specs
function SpecItem({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  );
}
