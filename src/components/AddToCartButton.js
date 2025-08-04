"use client";
import { toast } from "react-hot-toast";

export default function AddToCartButton({ product }) {
  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Added to cart ✅");
      } else {
        toast.error(data.error || "Failed to add ❌");
      }
    } catch (err) {
      console.error("Cart add error:", err);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-6 w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg text-lg font-bold text-white transition"
    >
      Add to Cart
    </button>
  );
}
