"use client";

import Link from "next/link";
import {
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  DollarSign,
} from "lucide-react";

const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Deals & Discounts", href: "/deals" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Track My Order", href: "/track-order" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Community", href: "/community" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Intro */}
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-3">
              <Globe className="w-7 h-7" />
              <span>FutureShop</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Shop the future today. Cutting-edge products, exclusive deals,
              and premium customer service — all in one place.
            </p>
            {/* Contact Info */}
            <div className="text-sm space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@futureshop.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +1 (800) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> New York, USA
              </p>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-600">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-600 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-600 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-800 font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-600 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="mt-10 border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Newsletter */}
          <div className="w-full md:w-1/2">
            <h5 className="text-gray-800 font-semibold mb-3">
              Subscribe to Our Newsletter
            </h5>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg outline-none"
              />
              <button className="px-5 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-pink-600 transition">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-red-600 transition">
              <Youtube className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-700 transition">
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} FutureShop. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4" /> Free Shipping
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4" /> Secure Payments
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 2-Year Warranty
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" /> 30-Day Returns
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
