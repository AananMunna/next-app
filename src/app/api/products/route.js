import { NextResponse } from "next/server";
import { getProductsCollection } from "@/lib/db";

export async function GET(req) {
  const collection = await getProductsCollection();
  const { searchParams } = new URL(req.url);

  // Extract query params with defaults
  const search = searchParams.get("search") || "";
  const brands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 999999;
  const discountOnly = searchParams.get("discountOnly") === "true";
  const sortBy = searchParams.get("sortBy") || "releaseDateDesc";

  // ------------------------------
  // Sorting logic
  // ------------------------------
  let sortOption = {};
  if (sortBy === "priceAsc") {
    // Ascending by discountPrice first, then price
    sortOption = { discountPrice: 1, price: 1 };
  } else if (sortBy === "priceDesc") {
    // Descending by discountPrice first, then price
    sortOption = { discountPrice: -1, price: -1 };
  } else {
    // Default → sort by newest (releaseDate descending)
    sortOption = { releaseDate: -1 };
  }

  // ------------------------------
  // MongoDB Query with $expr
  // ------------------------------
  // Using $expr + $toDouble ensures price is always treated as a number,
  // even if stored as string in MongoDB.
  const query = {
    $and: [
      // Search filter (brand, model, title)
      search
        ? {
            $or: [
              { brand: { $regex: search, $options: "i" } },
              { model: { $regex: search, $options: "i" } },
              { title: { $regex: search, $options: "i" } },
            ],
          }
        : {},
      // Brand filter
      brands.length > 0 ? { brand: { $in: brands } } : {},
      // Discount-only filter
      discountOnly ? { discountPrice: { $exists: true, $ne: null } } : {},
      // Price filter using $expr (handles string/number)
      {
        $expr: {
          $and: [
            { $gte: [{ $toDouble: "$price" }, minPrice] },
            { $lte: [{ $toDouble: "$price" }, maxPrice] },
          ],
        },
      },
    ],
  };

  // ------------------------------
  // Fetch products
  // ------------------------------
  const products = await collection.find(query).sort(sortOption).toArray();

  // Debug logs (only for development)
  console.log("Query =>", JSON.stringify(query, null, 2));
  console.log("Products Found =>", products.length);

  // ------------------------------
  // Return response with _id as string
  // ------------------------------
  return NextResponse.json(
    products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }))
  );
}
