"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Globe,
  ShoppingCart,
  User,
  Search,
  Heart,
  Menu,
  ChevronDown,
  Package,
  Percent,
  Gift,
  Headphones,
  Truck,
  Phone,
  Laptop,
  Watch,
  Tv,
  Home,
  Languages,
  DollarSign,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileMega, setIsMobileMega] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 font-extrabold text-xl"
        >
          <Globe className="w-7 h-7" />
          <span className="hidden sm:block">FutureShop</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="flex items-center w-full max-w-lg border rounded-lg overflow-hidden shadow-sm bg-gray-50">
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="w-full px-4 py-2 text-sm bg-transparent outline-none"
            />
            <button className="px-3 py-2 bg-blue-600 text-white hover:bg-blue-700">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600">
            <Home className="w-4 h-4" /> Home
          </Link>

          {/* Mega Menu */}
          <div
            className="relative group"
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <button
              className="flex items-center gap-1 hover:text-blue-600 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isMegaOpen}
            >
              <Package className="w-4 h-4" /> Categories
              <ChevronDown className="w-4 h-4" />
            </button>

            {isMegaOpen && (
              <div
                className="absolute left-0 mt-3 w-[750px] bg-white shadow-xl border rounded-lg grid grid-cols-3 gap-6 p-6 animate-fadeIn"
                role="menu"
              >
                {/* Column 1 */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Smart Devices</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/category/smartphones" className="flex items-center gap-2 hover:text-blue-600"><Phone className="w-4 h-4" /> Smartphones</Link></li>
                    <li><Link href="/category/laptops" className="flex items-center gap-2 hover:text-blue-600"><Laptop className="w-4 h-4" /> Laptops</Link></li>
                    <li><Link href="/category/smartwatches" className="flex items-center gap-2 hover:text-blue-600"><Watch className="w-4 h-4" /> Smartwatches</Link></li>
                    <li><Link href="/category/tvs" className="flex items-center gap-2 hover:text-blue-600"><Tv className="w-4 h-4" /> Televisions</Link></li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Accessories</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/category/audio" className="flex items-center gap-2 hover:text-blue-600"><Headphones className="w-4 h-4" /> Headphones</Link></li>
                    <li><Link href="/category/home" className="flex items-center gap-2 hover:text-blue-600"><Gift className="w-4 h-4" /> Smart Home</Link></li>
                    <li><Link href="/category/gaming" className="flex items-center gap-2 hover:text-blue-600"><Gift className="w-4 h-4" /> Gaming</Link></li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Special Offers</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/deals" className="flex items-center gap-2 hover:text-blue-600"><Percent className="w-4 h-4" /> Deals & Discounts</Link></li>
                    <li><Link href="/new-arrivals" className="flex items-center gap-2 hover:text-blue-600"><Gift className="w-4 h-4" /> New Arrivals</Link></li>
                    <li><Link href="/shipping" className="flex items-center gap-2 hover:text-blue-600"><Truck className="w-4 h-4" /> Free Shipping</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link href="/deals" className="flex items-center gap-1 hover:text-blue-600">
            <Percent className="w-4 h-4" /> Deals
          </Link>
          <Link href="/community" className="flex items-center gap-1 hover:text-blue-600">
            <Gift className="w-4 h-4" /> Community
          </Link>
          <Link href="/about" className="flex items-center gap-1 hover:text-blue-600">
            <Globe className="w-4 h-4" /> About Us
          </Link>

          {/* Language & Currency Switch */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 hover:text-blue-600">
              <Languages className="w-4 h-4" /> EN
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600">
              <DollarSign className="w-4 h-4" /> USD
            </button>
          </div>
        </div>

        {/* Icons & Auth */}
        <div className="flex items-center gap-4">
          <Link href="/wishlist" className="relative hover:text-red-500">
            <Heart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </Link>

          <Link href="/cart" className="relative hover:text-blue-600">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1 rounded-full">
              2
            </span>
          </Link>

          {session?.user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <User className="w-6 h-6" />
                <span className="hidden sm:block">{session.user.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
                <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="ml-3 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-3">
          <button
            onClick={() => setIsMobileMega(!isMobileMega)}
            className="w-full flex justify-between items-center py-2 font-semibold text-gray-700"
          >
            Categories <ChevronDown className="w-4 h-4" />
          </button>
          {isMobileMega && (
            <div className="pl-4 space-y-2 text-sm">
              <Link href="/category/smartphones" className="block">Smartphones</Link>
              <Link href="/category/laptops" className="block">Laptops</Link>
              <Link href="/category/smartwatches" className="block">Smartwatches</Link>
              <Link href="/category/tvs" className="block">Televisions</Link>
              <Link href="/category/audio" className="block">Headphones</Link>
              <Link href="/category/gaming" className="block">Gaming</Link>
            </div>
          )}
          <Link href="/deals" className="block">Deals</Link>
          <Link href="/community" className="block">Community</Link>
          <Link href="/about" className="block">About Us</Link>
        </div>
      )}
    </nav>
  );
}
