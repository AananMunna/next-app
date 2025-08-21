import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeaturedProducts({ products }) {
  // console.log(products);
  const featured = products.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Featured <span className="text-primary">Smartphones</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our premium selection of cutting-edge smartphones
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {featured.map(({ id, brand, model, images, price, discountPrice }) => (
          <Card
            key={id}
            className="group overflow-hidden border-border bg-card text-card-foreground transition-all duration-300 hover:shadow-lg flex flex-col h-full"
          >
            {/* Product Image */}
            <div className="relative w-full h-60 overflow-hidden">
              {images && images.length > 0 ? (
                <Image
                  src={images[0]}
                  alt={`${brand} ${model}`}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                />
              ) : (
                <div className="bg-muted w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}

              {/* Discount Badge */}
              {discountPrice && (
                <Badge variant="destructive" className="absolute top-3 left-3">
                  Save $
                  {(
                    price - discountPrice
                  ).toLocaleString()}
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <CardHeader className="pb-3">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {brand} {model}
              </h3>
            </CardHeader>

            <CardContent className="pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  ${discountPrice || price}
                </span>
                {discountPrice && (
                  <span className="line-through text-muted-foreground text-sm">
                    ${price}
                  </span>
                )}
              </div>
            </CardContent>

            <CardFooter className="mt-auto pt-0">
              <Button asChild className="w-full">
                <Link href={`/products/${id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-10 text-center">
        <Button variant="outline" asChild>
          <Link href="/products" className="group">
            Browse All Products
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </Button>
      </div>
    </section>
  );
}
