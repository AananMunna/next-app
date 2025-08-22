import { ObjectId } from "mongodb";
import { getProductsCollection } from "@/lib/db";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default async function ProductDetailsPage({ params }) {
  const { id } = params;
  const productsCollection = await getProductsCollection();

  const product = await productsCollection.findOne({ _id: new ObjectId(id) });

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground">Product not found!</h1>
        <p className="text-muted-foreground mt-2">
          The product you're looking for doesn't exist or may have been removed.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
      {/* TOP SECTION */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* IMAGES */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative w-full aspect-square md:h-[400px] rounded-xl overflow-hidden">
              <Image
  src={product?.images?.[0] && product.images[0].trim() !== "" ? product.images[0] : "/placeholder.png"}
  alt={product?.title ?? "Product Image"}
  fill
  style={{ objectFit: "contain" }}
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
  className="p-4"
/>

            </div>
          </Card>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {product?.images
              ?.filter(
                (img) => typeof img === "string" && img.startsWith("http")
              )
              .slice(0, 5)
              .map((img, i) => (
                <Card key={i} className="min-w-[80px] h-20 rounded-lg overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`${product?.title} angle ${i + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="80px"
                      className="p-2"
                    />
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {product?.title}
            </h1>
            <p className="text-lg text-muted-foreground font-medium mt-1">
              {product?.brand} - {product?.model}
            </p>
          </div>

          <div className="flex items-center gap-3">
  <div className="flex items-center text-yellow-500">
    {Array.from({ length: Math.floor(Number(product?.rating) || 0) }).map((_, i) => (
      <span key={i}>⭐</span>
    ))}
    {(Number(product?.rating) % 1) >= 0.5 && <span>⭐</span>}
    <span className="text-foreground ml-2 font-bold">
      {typeof product?.rating === "number" ? product.rating.toFixed(1) : "N/A"}
    </span>
  </div>
  <span className="text-muted-foreground text-sm">
    ({Array.isArray(product?.reviews) ? product.reviews.length : 0} reviews)
  </span>
</div>


          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-bold text-primary">
              ${product?.discountPrice ?? product?.price}
            </p>
            {product?.discountPrice && (
              <p className="text-muted-foreground line-through text-lg">
                ${product?.price}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${product?.stock > 0 ? "bg-green-500" : "bg-destructive"}`}></div>
            <p className={`font-medium ${product?.stock > 0 ? "text-green-600" : "text-destructive"}`}>
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <p className="text-muted-foreground font-medium">
            Warranty: {product?.warranty || "Not specified"}
          </p>

          <AddToCartButton
            product={{
              productId: product._id.toString(),
              title: product.title,
              brand: product.brand,
              model: product.model,
              price: product.discountPrice ?? product.price,
              productImg: product.images?.[0],
              quantity: 1,
            }}
            disabled={product?.stock <= 0}
          />

          <Card className="mt-4">
            <CardContent className="p-4">
              <p className="text-foreground leading-relaxed">
                {product?.overview || "No overview available."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* TECHNICAL SPECS */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-border pb-2 text-foreground">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-foreground">
          <SpecItem
            label="Processor"
            value={product?.technicalSpecs?.processor}
          />
          <SpecItem label="RAM" value={product?.technicalSpecs?.ram} />
          <SpecItem
            label="Storage Options"
            value={product?.technicalSpecs?.storage?.join(", ")}
          />
          <SpecItem label="Battery" value={product?.technicalSpecs?.battery} />
          <SpecItem
            label="Display"
            value={product?.technicalSpecs?.display ? 
              `${product.technicalSpecs.display.size} / ${product.technicalSpecs.display.type}` : 
              null
            }
          />
          <SpecItem
            label="Resolution"
            value={product?.technicalSpecs?.display?.resolution}
          />
          <SpecItem
            label="Refresh Rate"
            value={product?.technicalSpecs?.display?.refreshRate}
          />
          <SpecItem
            label="Display Protection"
            value={product?.technicalSpecs?.display?.protection}
          />
          <SpecItem
            label="Rear Cameras"
            value={product?.technicalSpecs?.rearCameras
              ?.map(
                (cam) =>
                  `${cam.type} (${cam.mp} MP${
                    cam.opticalZoom ? `, ${cam.opticalZoom} Zoom` : ""
                  })`
              )
              .join(", ")}
          />
          <SpecItem
            label="Front Camera"
            value={product?.technicalSpecs?.frontCamera ? 
              `${product.technicalSpecs.frontCamera.mp} MP${
                product.technicalSpecs.frontCamera.features ? 
                `, Features: ${product.technicalSpecs.frontCamera.features.join(", ")}` : 
                ""
              }` : 
              null
            }
          />
          <SpecItem
            label="Operating System"
            value={product?.technicalSpecs?.os}
          />
          <SpecItem
            label="Connectivity"
            value={product?.technicalSpecs?.connectivity ? 
              `5G: ${product.technicalSpecs.connectivity["5G"] ? "Yes" : "No"}, Bluetooth: ${
                product.technicalSpecs.connectivity.bluetooth
              }, WiFi: ${product.technicalSpecs.connectivity.wifi?.join(", ") || "Not specified"}, NFC: ${
                product.technicalSpecs.connectivity.nfc ? "Yes" : "No"
              }` : 
              null
            }
          />
          <SpecItem
            label="Dimensions (H x W x D)"
            value={product?.technicalSpecs?.dimensions ? 
              `${product.technicalSpecs.dimensions.height} × ${product.technicalSpecs.dimensions.width} × ${product.technicalSpecs.dimensions.depth}` : 
              null
            }
          />
          <SpecItem label="Weight" value={product?.technicalSpecs?.weight} />
          <SpecItem
            label="Color Options"
            value={product?.technicalSpecs?.colorOptions?.join(", ")}
          />
          <SpecItem
            label="IP Rating"
            value={product?.technicalSpecs?.ipRating}
          />
          <SpecItem
            label="Sensors"
            value={product?.technicalSpecs?.sensors?.join(", ")}
          />
        </div>
      </section>

      {/* DESCRIPTION SECTIONS */}
      {product?.descriptionSections && Object.keys(product.descriptionSections).length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-border pb-2 text-foreground">
            Detailed Description
          </h2>
          <div className="space-y-6 text-foreground leading-relaxed">
            {Object.entries(product.descriptionSections).map(
              ([key, val]) => (
                <div key={key}>
                  <h3 className="text-xl font-semibold capitalize mb-2 text-foreground">
                    {key.replace(/([A-Z])/g, " $1")}
                  </h3>
                  <p className="text-muted-foreground">{val}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* CUSTOMER REVIEWS */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-border pb-2 text-foreground">
          Customer Reviews
        </h2>
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4">
          {product?.reviews?.length ? (
            product.reviews.map((review, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground">{review?.user || "Anonymous"}</p>
                  <p className="text-yellow-500 font-semibold mt-1">
                    {"⭐".repeat(Math.floor(review?.rating || 0))}
                    {review?.rating % 1 >= 0.5 && "⭐"}
                    <span className="ml-2">{review?.rating?.toFixed(1)}</span>
                  </p>
                  <p className="text-muted-foreground italic mt-2">{review?.comment}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {review?.date ? new Date(review.date).toLocaleDateString() : "Date not available"}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}
        </div>
      </section>

      {/* AVAILABLE AT */}
      {product?.availableAt && product.availableAt.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-border pb-2 text-foreground">
            Available At
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.availableAt.map((store, i) => (
              <Card key={i} className="border-border hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <p className="text-primary font-medium">{store}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

// Helper component for specs
function SpecItem({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col p-3 border border-border rounded-lg">
      <span className="text-muted-foreground font-medium text-sm">{label}</span>
      <span className="text-foreground font-semibold">{value}</span>
    </div>
  );
}

// Skeleton loading component for the product details page
export function ProductDetailsSkeleton() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
      {/* TOP SECTION SKELETON */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* IMAGES SKELETON */}
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square md:h-[400px] rounded-xl" />
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="min-w-[80px] h-20 rounded-lg" />
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS SKELETON */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          
          <Skeleton className="h-8 w-32" />
          
          <div className="flex items-center gap-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="h-5 w-20" />
          </div>
          
          <Skeleton className="h-6 w-40" />
          
          <Skeleton className="h-12 w-full" />
          
          <Skeleton className="h-24 w-full mt-4" />
        </div>
      </section>

      {/* TECHNICAL SPECS SKELETON */}
      <section>
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col p-3 border border-border rounded-lg gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-40" />
            </div>
          ))}
        </div>
      </section>

      {/* DESCRIPTION SECTIONS SKELETON */}
      <section>
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS SKELETON */}
      <section>
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border border-border rounded-lg">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24 mt-2" />
              <Skeleton className="h-12 w-full mt-2" />
              <Skeleton className="h-3 w-20 mt-2" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}