"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        if (res.ok) {
          setCart(data?.items || []);
        } else {
          toast.error("Failed to load cart ❌");
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        toast.error("Error loading cart ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Update Quantity
  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQty }),
      });
      if (res.ok) {
        setCart((prev) =>
          prev.map((item) =>
            item.productId === productId ? { ...item, quantity: newQty } : item
          )
        );
        toast.success("Quantity updated ✅");
      } else toast.error("Failed to update ❌");
    } catch {
      toast.error("Error updating cart ❌");
    }
  };

  // Remove Item
  const handleRemove = async (productId) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
        toast.success("Item removed 🗑️");
      } else toast.error("Failed to remove ❌");
    } catch {
      toast.error("Error removing item ❌");
    }
  };

  // Calculate total
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  if (loading) return <p className="text-center mt-12">Loading your cart...</p>;

  if (!cart?.length)
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE - Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item?.productId}
              className="flex gap-6 border-b pb-6 bg-white shadow-sm rounded-lg p-4"
            >
              {/* IMAGE */}
              <div className="relative w-32 h-32 flex-shrink-0 border rounded-md overflow-hidden">
                <Image
                  src={item?.image ?? "/placeholder.png"}
                  alt={item?.title ?? "Product image"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item?.title ?? "Untitled Product"}
                </h2>
                <p className="text-gray-500">
                  {item?.brand ?? "Unknown"} {item?.model ?? ""}
                </p>
                <p className="text-sm text-green-600">
                  {item?.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <p className="text-sm text-gray-500">
                  Warranty: {item?.warranty ?? "N/A"}
                </p>
                <p className="text-blue-700 font-bold mt-1">
                  ${item?.price?.toFixed?.(2) ?? "0.00"}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-4 gap-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(item?.productId, (item?.quantity ?? 1) - 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item?.quantity ?? 1}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item?.productId, (item?.quantity ?? 1) + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>

                  <button
                    onClick={() => handleRemove(item?.productId)}
                    className="ml-6 text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => toast.success("Saved for later (mock)")}
                    className="ml-4 text-blue-500 hover:underline text-sm"
                  >
                    Save for later
                  </button>
                </div>
              </div>

              {/* Subtotal per item */}
              <p className="font-bold text-gray-800 text-lg">
                ${(item?.price || 0) * (item?.quantity || 1)}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </p>
          <p className="flex justify-between mb-2 text-gray-700">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between mb-4 text-lg font-bold text-gray-900 border-t pt-4">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </p>
          <button className="w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition">
            Proceed to Checkout
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Secure transaction powered by FutureShop 🔒
          </p>
        </div>
      </div>
    </main>
  );
}
