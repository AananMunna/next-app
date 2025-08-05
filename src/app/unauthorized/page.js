"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center">
        <div className="flex justify-center mb-6">
          <ShoppingCart className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! You don’t have permission to view this page.  
          It looks like this section is for a different account type.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold hover:from-pink-600 hover:to-red-600 transition"
          >
            🛒 Back to Shopping
          </Link>
          <Link
            href="/login"
            className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            🔑 Login with Different Account
          </Link>
        </div>
      </div>
      <p className="mt-8 text-sm text-gray-400">
        Need help? <Link href="/contact" className="text-pink-500 hover:underline">Contact Support</Link>
      </p>
    </div>
  );
}
