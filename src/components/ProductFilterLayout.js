"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductFilterLayout({ products }) {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]); // adjust max price accordingly
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState("releaseDateDesc"); // or priceAsc, priceDesc

  // Extract unique brands from products
  const brands = useMemo(() => {
    const setBrands = new Set(products.map((p) => p.brand));
    return Array.from(setBrands).sort();
  }, [products]);

  // Get min and max price for slider range
  const prices = products.map((p) => p.discountPrice?.$numberInt || p.price?.$numberInt || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Filtered products based on filters
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Text search on brand or model
        const target = `${p.brand} ${p.model}`.toLowerCase();
        if (searchTerm && !target.includes(searchTerm.toLowerCase())) return false;

        // Brand filter
        if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;

        // Price range filter
        const priceVal = p.discountPrice?.$numberInt || p.price?.$numberInt || 0;
        if (priceVal < priceRange[0] || priceVal > priceRange[1]) return false;

        // Discount only filter
        if (discountOnly && !p.discountPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "priceAsc") {
          return (a.discountPrice?.$numberInt || a.price?.$numberInt) - (b.discountPrice?.$numberInt || b.price?.$numberInt);
        }
        if (sortBy === "priceDesc") {
          return (b.discountPrice?.$numberInt || b.price?.$numberInt) - (a.discountPrice?.$numberInt || a.price?.$numberInt);
        }
        // Default release date descending
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      });
  }, [products, searchTerm, selectedBrands, priceRange, discountOnly, sortBy]);

  // Handlers
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters sidebar */}
      <aside className="w-full md:w-64 p-4 border rounded-lg sticky top-20 h-fit bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

        {/* Search */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Search</span>
          <input
            type="text"
            placeholder="Search by brand or model"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        {/* Brand Filter */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Brand</p>
          <div className="max-h-36 overflow-y-auto border border-gray-200 rounded p-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2 mb-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full mt-1"
          />
        </div>

        {/* Discount Only */}
        <label className="mb-4 flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={discountOnly}
            onChange={() => setDiscountOnly(!discountOnly)}
            className="rounded"
          />
          <span className="text-sm text-gray-700">Discounted Only</span>
        </label>

        {/* Sort */}
        <div>
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 mb-1 block">
            Sort By
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="releaseDateDesc">Newest</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </aside>

      {/* Products Grid */}
      <section className="flex-1 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products match your filters.</p>
        ) : (
          filteredProducts.map(({ id, brand, model, images, price, discountPrice }) => (
            <article
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
            </article>
          ))
        )}
      </section>
    </div>
  );
}
