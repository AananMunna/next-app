import { NextResponse } from "next/server";
import { getProductsCollection } from "@/lib/db";

export async function GET(req) {
  const collection = await getProductsCollection();
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const brands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 999999;
  const discountOnly = searchParams.get("discountOnly") === "true";
  const sortBy = searchParams.get("sortBy") || "releaseDateDesc";

  // Build query
  const query = {
    $and: [
      search
        ? {
            $or: [
              { brand: { $regex: search, $options: "i" } },
              { model: { $regex: search, $options: "i" } },
              { title: { $regex: search, $options: "i" } },
            ],
          }
        : {},
      brands.length > 0 ? { brand: { $in: brands } } : {},
      { price: { $gte: minPrice, $lte: maxPrice } },
      discountOnly ? { discountPrice: { $exists: true, $ne: null } } : {},
    ],
  };

  // Sorting
  let sortOption = {};
  if (sortBy === "priceAsc") {
    sortOption = { discountPrice: 1, price: 1 };
  } else if (sortBy === "priceDesc") {
    sortOption = { discountPrice: -1, price: -1 };
  } else {
    sortOption = { releaseDate: -1 }; // newest first
  }

  const products = await collection.find(query).sort(sortOption).toArray();

  return NextResponse.json(
    products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }))
  );
}
