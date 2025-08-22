import { getProductsCollection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
      const productCollection = await getProductsCollection();
    
  try {
    const body = await req.json();

    const result = await productCollection.insertOne(body);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to insert product" }, { status: 500 });
  }
}