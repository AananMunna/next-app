"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Globe,
  ShoppingCart,
  User,
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
} from "lucide-react";
import { ThemeToggle } from "@/lib/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  console.log(session);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileMega, setIsMobileMega] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const megaRef = useRef(null);
  const profileRef = useRef(null);
  const navRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        megaRef.current &&
        !megaRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setIsMegaOpen(false);
        setIsProfileOpen(false);
      }
    }
    if (isMegaOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMegaOpen, isProfileOpen]);

  const toggleMegaMenu = () => {
    setIsMegaOpen((prev) => !prev);
    if (!isMegaOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
    if (!isProfileOpen) setIsMegaOpen(false);
  };

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Top Navbar */}
      <nav
        ref={navRef}
        className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-600 font-extrabold text-xl"
          >
            <Globe className="w-7 h-7" />
            <span className="hidden sm:block">FutureShop</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
            <Link
              href="/"
              className={`flex items-center gap-1 hover:text-blue-600 ${
                isActive("/") ? "text-blue-700 font-bold" : ""
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </Link>

            {/* Mega Menu */}
            <div className="relative" ref={megaRef}>
              <button
                className={`flex items-center gap-1 hover:text-blue-600 ${
                  isMegaOpen ? "text-blue-700 font-bold" : ""
                }`}
                onClick={toggleMegaMenu}
              >
                <Package className="w-4 h-4" /> Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              {isMegaOpen && (
                <div className="absolute left-0 mt-3 w-[750px] bg-white shadow-xl border rounded-lg grid grid-cols-3 gap-6 p-6 z-50">
                  <div>
                    <h4 className="font-semibold mb-3">Smart Devices</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/category/smartphones" className="block hover:text-blue-600">
                          <Phone className="w-4 h-4 inline" /> Smartphones
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/laptops" className="block hover:text-blue-600">
                          <Laptop className="w-4 h-4 inline" /> Laptops
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/smartwatches" className="block hover:text-blue-600">
                          <Watch className="w-4 h-4 inline" /> Smartwatches
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/tvs" className="block hover:text-blue-600">
                          <Tv className="w-4 h-4 inline" /> Televisions
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Accessories</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/category/audio" className="block hover:text-blue-600">
                          <Headphones className="w-4 h-4 inline" /> Headphones
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/home" className="block hover:text-blue-600">
                          <Gift className="w-4 h-4 inline" /> Smart Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/gaming" className="block hover:text-blue-600">
                          <Gift className="w-4 h-4 inline" /> Gaming
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Special Offers</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/deals" className="block hover:text-blue-600">
                          <Percent className="w-4 h-4 inline" /> Deals & Discounts
                        </Link>
                      </li>
                      <li>
                        <Link href="/new-arrivals" className="block hover:text-blue-600">
                          <Gift className="w-4 h-4 inline" /> New Arrivals
                        </Link>
                      </li>
                      <li>
                        <Link href="/shipping" className="block hover:text-blue-600">
                          <Truck className="w-4 h-4 inline" /> Free Shipping
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/deals"
              className={`flex items-center gap-1 hover:text-blue-600 ${
                isActive("/deals") ? "text-blue-700 font-bold" : ""
              }`}
            >
              <Percent className="w-4 h-4" /> Deals
            </Link>
            <Link
              href="/community"
              className={`flex items-center gap-1 hover:text-blue-600 ${
                isActive("/community") ? "text-blue-700 font-bold" : ""
              }`}
            >
              <Gift className="w-4 h-4" /> Community
            </Link>
            <Link
              href="/about"
              className={`flex items-center gap-1 hover:text-blue-600 ${
                isActive("/about") ? "text-blue-700 font-bold" : ""
              }`}
            >
              <Globe className="w-4 h-4" /> About Us
            </Link>
          </div>

          {/* Icons & Auth */}
          <div className="flex items-center gap-4">
                  <ThemeToggle />

            <Link href="/wishlist" className="relative hover:text-red-500">
              <Heart className="w-6 h-6" />
            </Link>
            <Link href="/cart" className="relative hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            {session?.user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden sm:block">{session.user.name}</span>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <Link href={`/dashboard/${session.user.role}`} className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/register" className="px-3 py-1 bg-blue-600 text-white rounded">
                Login
              </Link>
            )}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around items-center h-14 z-50">
        <Link href="/" className="flex flex-col items-center text-sm">
          <Home className="w-5 h-5" /> Home
        </Link>
        <Link href="/categories" className="flex flex-col items-center text-sm">
          <Package className="w-5 h-5" /> Categories
        </Link>
        <Link href="/deals" className="flex flex-col items-center text-sm">
          <Percent className="w-5 h-5" /> Deals
        </Link>
        <Link href="/cart" className="flex flex-col items-center text-sm relative">
          <ShoppingCart className="w-5 h-5" /> Cart
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-sm">
          <User className="w-5 h-5" /> Account
        </Link>
      </div>
    </>
  );
}
