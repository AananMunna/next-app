"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddToCartButton({ productId, price }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          price,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Added to cart!");
      } else {
        toast.error(data.error || "❌ Something went wrong");
      }
    } catch (err) {
      toast.error("❌ Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="mt-auto px-6 py-3 rounded-lg font-semibold transition bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
