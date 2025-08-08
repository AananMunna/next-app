// app/payment/fail/page.jsx
"use client";

import Link from "next/link";

export default function PaymentFail() {
  return (
    <main className="max-w-md mx-auto mt-20 p-6 bg-red-50 rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Failed ❌</h1>
      <p className="text-gray-700 mb-6">
        Unfortunately, your payment could not be processed. Please try again or contact support.
      </p>
      <Link
        href="/cart"
        className="inline-block px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
      >
        Back to Cart
      </Link>
    </main>
  );
}
