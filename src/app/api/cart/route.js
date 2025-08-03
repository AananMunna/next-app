import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getCartCollection } from "@/lib/db";

// Add item to cart
export async function POST(req) {
  const cartCollection = await getCartCollection();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const { productId, price,productImg, quantity } = await req.json();

  await cartCollection.updateOne(
    { userId: session.user.email },
    {
      $push: { items: { productId, price, productImg, quantity } },
      $set: { updatedAt: new Date() },
    },
    { upsert: true }
  );

  return NextResponse.json({ message: "Added to cart ✅" });
}

// Get all cart items
export async function GET() {
  const cartCollection = await getCartCollection();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const cart = await cartCollection.findOne({ userId: session.user.email });
  return NextResponse.json({ items: cart?.items || [] });
}

// Update quantity of a cart item
export async function PUT(req) {
  const cartCollection = await getCartCollection();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  await cartCollection.updateOne(
    { userId: session.user.email, "items.productId": productId },
    {
      $set: { "items.$.quantity": quantity, updatedAt: new Date() },
    }
  );

  return NextResponse.json({ message: "Quantity updated ✅" });
}

// Remove a cart item
export async function DELETE(req) {
  const cartCollection = await getCartCollection();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const { productId } = await req.json();

  await cartCollection.updateOne(
    { userId: session.user.email },
    { $pull: { items: { productId } }, $set: { updatedAt: new Date() } }
  );

  return NextResponse.json({ message: "Item removed 🗑️" });
}
