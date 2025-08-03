"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductFilterLayout() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState("releaseDateDesc");

  // Mobile filter modal state
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
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
    };
    fetchProducts();
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
      <button
        className="md:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
        onClick={() => setShowFilters(true)}
        aria-label="Open Filters"
      >
        Filter Products
      </button>

      {/* Sidebar Filters for desktop */}
      <aside className="hidden md:block w-64 p-4 border rounded-lg sticky top-20 h-fit bg-white shadow-sm">
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
      <section className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 mt-10">
            No products match your filters.
          </p>
        ) : (
          products.map((p) => (
            <article
              key={p._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col overflow-hidden"
            >
              <div className="relative w-full h-56">
                {p.images?.length > 0 ? (
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{p.title}</h2>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-600">
                    ${p.discountPrice || p.price}
                  </span>
                  {p.discountPrice && (
                    <span className="line-through text-gray-500 text-sm">${p.price}</span>
                  )}
                </div>
                <Link
                  href={`/products/${p._id}`}
                  className="mt-4 inline-block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Filter Modal for Mobile */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20 px-4 overflow-auto">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={() => setShowFilters(false)}
              aria-label="Close Filters"
            >
              &times;
            </button>
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
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={() => setShowFilters(false)}
              aria-label="Apply Filters"
            >
              Apply Filters
            </button>
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
    <>
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

      {/* Brand */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Brand</p>
        <div className="max-h-36 overflow-y-auto border border-gray-200 rounded p-2">
          {brands.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No brands found</p>
          ) : (
            brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center space-x-2 mb-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </p>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[0]}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val <= priceRange[1]) setPriceRange([val, priceRange[1]]);
          }}
          className="w-full"
        />
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= priceRange[0]) setPriceRange([priceRange[0], val]);
          }}
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
        <label
          htmlFor="sort"
          className="text-sm font-medium text-gray-700 mb-1 block"
        >
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
    </>
  );
}
