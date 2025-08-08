// app/payment/success/page.jsx
"use client";

import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <main className="max-w-md mx-auto mt-20 p-6 bg-green-50 rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful 🎉</h1>
      <p className="text-gray-700 mb-6">
        Thank you for your purchase! Your transaction has been completed successfully.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
