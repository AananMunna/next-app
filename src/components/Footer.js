"use client";

import Link from "next/link";
import { Globe, Facebook, Twitter, Instagram } from "lucide-react";

// Centralized Footer Links
const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Community", href: "/community" },
  { label: "About Us", href: "/about" },
  { label: "Trips", href: "/trips" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Intro */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-3">
              <Globe className="w-7 h-7" />
              <span>TravelMate</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Explore the world with ease. Plan your trips, connect with
              communities, and discover unforgettable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-600">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-600 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-3">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition">
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-8 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TravelMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
