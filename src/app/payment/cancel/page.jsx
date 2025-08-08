// app/payment/cancel/page.jsx
"use client";

import Link from "next/link";

export default function PaymentCancel() {
  return (
    <main className="max-w-md mx-auto mt-20 p-6 bg-yellow-50 rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-yellow-700 mb-4">Payment Cancelled ⚠️</h1>
      <p className="text-gray-700 mb-6">
        You cancelled the payment process. If this was a mistake, feel free to try again.
      </p>
      <Link
        href="/cart"
        className="inline-block px-6 py-3 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition"
      >
        Return to Cart
      </Link>
    </main>
  );
}
