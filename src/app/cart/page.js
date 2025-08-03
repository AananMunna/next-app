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
      <div className="max-w-md mx-auto py-12 text-center px-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 text-center md:text-left">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE - Cart Items */}
        <div className="flex-1 space-y-6">
          {cart.map((item) => (
            <div
              key={item?.productId}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b pb-6 bg-white shadow-sm rounded-lg p-4"
            >
              {/* IMAGE */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 border rounded-md overflow-hidden mx-auto sm:mx-0">
                <Image
                  src={item?.productImg ?? "/placeholder.png"}
                  alt={item?.title ?? "Product image"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-base md:text-lg font-semibold text-gray-800">
                  {item?.title ?? "Untitled Product"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {item?.brand ?? "Unknown"} {item?.model ?? ""}
                </p>
                <p className="text-xs md:text-sm text-green-600">
                  {item?.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Warranty: {item?.warranty ?? "N/A"}
                </p>
                <p className="text-blue-700 font-bold mt-1 text-lg">
                  ${item?.price?.toFixed?.(2) ?? "0.00"}
                </p>

                {/* Quantity Controls */}
                <div className="flex justify-center sm:justify-start items-center mt-3 gap-2 sm:gap-4 flex-wrap">
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
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => toast.success("Saved for later (mock)")}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Save for later
                  </button>
                </div>
              </div>

              {/* Subtotal per item */}
              <p className="font-bold text-gray-800 text-lg text-center sm:text-right">
                ${(item?.price || 0) * (item?.quantity || 1)}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full lg:w-80 self-start">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Order Summary</h2>
          <p className="flex justify-between mb-2 text-gray-700 text-sm md:text-base">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </p>
          <p className="flex justify-between mb-2 text-gray-700 text-sm md:text-base">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between mb-4 text-base md:text-lg font-bold text-gray-900 border-t pt-4">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </p>
          <button className="w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition">
            Proceed to Checkout
          </button>
          <p className="text-xs text-gray-500 mt-3 text-center md:text-left">
            Secure transaction powered by FutureShop 🔒
          </p>
        </div>
      </div>
    </main>
  );
}
