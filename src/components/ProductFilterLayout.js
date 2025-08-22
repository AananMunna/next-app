"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { X, Filter, Search } from "lucide-react";

export default function ProductFilterLayout() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState("releaseDateDesc");
  const [isLoading, setIsLoading] = useState(true);

  console.log(products);
  // Mobile filter modal state
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          search: searchTerm,
          brands: selectedBrands.join(","),
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          discountOnly,
          sortBy,
        });
        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to prevent too many rapid requests
    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedBrands, priceRange, discountOnly, sortBy]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const brands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-0">
      {/* Mobile Filter Button */}
      <Button
        variant="outline"
        className="md:hidden mb-4 flex items-center gap-2"
        onClick={() => setShowFilters(true)}
        aria-label="Open Filters"
      >
        <Filter className="h-4 w-4" />
        Filter Products
      </Button>

      {/* Sidebar Filters for desktop */}
      <aside className="hidden md:block w-64 p-4 border border-border rounded-lg sticky top-20 h-fit bg-card">
        <FilterContent
          brands={brands}
          selectedBrands={selectedBrands}
          toggleBrand={toggleBrand}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          discountOnly={discountOnly}
          setDiscountOnly={setDiscountOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </aside>

      {/* Products Grid */}
      <section className="flex-1">
        {/* Search Input for Mobile */}
        <div className="md:hidden mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            // Skeleton loading states
            Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-56 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground mb-4">
                No products match your filters.
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedBrands([]);
                  setPriceRange([0, 2000]);
                  setDiscountOnly(false);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            products.map((p) => (
              <Card
                key={p._id}
                className="group overflow-hidden transition-all hover:shadow-md"
              >
                <div className="relative w-full h-56">
                  {p.images?.length > 0 && p.images[0]?.trim() !== "" ? (
                    <Image
                      src={p.images[0]}
                      alt={p.title || "Product Image"}
                      fill
                      className="object-contain p-4 transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="bg-muted w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}

                  {p.discountPrice && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      SAVE ${(p.price - p.discountPrice).toFixed(0)}
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-foreground truncate mb-2">
                    {p.title}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-primary">
                      ${p.discountPrice || p.price}
                    </span>
                    {p.discountPrice && (
                      <span className="line-through text-muted-foreground text-sm">
                        ${p.price}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/products/${p._id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Filter Modal for Mobile */}
      {showFilters && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-start pt-20 px-4 overflow-auto md:hidden">
          <div className="bg-card border border-border rounded-lg w-full max-w-sm p-6 shadow-lg relative max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Filter Products</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
                aria-label="Close Filters"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FilterContent
              brands={brands}
              selectedBrands={selectedBrands}
              toggleBrand={toggleBrand}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              discountOnly={discountOnly}
              setDiscountOnly={setDiscountOnly}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <Button
              className="mt-6 w-full"
              onClick={() => setShowFilters(false)}
              aria-label="Apply Filters"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Extracted Filter Content to reuse in sidebar & modal
function FilterContent({
  brands,
  selectedBrands,
  toggleBrand,
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  discountOnly,
  setDiscountOnly,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by brand or model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Label>Brand</Label>
        <div className="max-h-36 overflow-y-auto border border-border rounded-md p-3 space-y-2">
          {brands.length === 0 ? (
            <p className="text-muted-foreground text-sm italic">
              No brands found
            </p>
          ) : (
            brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {brand}
                </Label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={2000}
          step={10}
          className="py-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$0</span>
          <span>$2000</span>
        </div>
      </div>

      {/* Discount Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="discount-only"
          checked={discountOnly}
          onCheckedChange={() => setDiscountOnly(!discountOnly)}
        />
        <Label
          htmlFor="discount-only"
          className="text-sm font-normal cursor-pointer"
        >
          Discounted Only
        </Label>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <Label htmlFor="sort">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Select sort option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="releaseDateDesc">Newest</SelectItem>
            <SelectItem value="priceAsc">Price: Low to High</SelectItem>
            <SelectItem value="priceDesc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
