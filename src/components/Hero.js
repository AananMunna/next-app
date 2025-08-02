"use client";

import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-20 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
      {/* Background Overlay Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Discover Your Next Adventure
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto text-gray-200 drop-shadow">
          Explore breathtaking destinations, connect with fellow travelers,
          and make memories that last a lifetime.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/trips"
            className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transition"
          >
            <PlaneTakeoff className="w-5 h-5" />
            Start Your Journey
          </Link>
          <Link
            href="/community"
            className="px-6 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Join Our Community
          </Link>
        </div>
      </div>
    </section>
  );
}
