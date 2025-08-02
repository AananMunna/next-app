"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileMega, setIsMobileMega] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Refs for outside click detection
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMegaOpen, isProfileOpen]);

  // Toggle mega menu
  const toggleMegaMenu = () => {
    setIsMegaOpen((prev) => !prev);
    // If mega opens, close profile dropdown
    if (!isMegaOpen) setIsProfileOpen(false);
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
    // If profile opens, close mega menu
    if (!isProfileOpen) setIsMegaOpen(false);
  };

  // Helper to check if link is active
  const isActive = (href) => pathname === href;

  return (
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
              className={`flex items-center gap-1 hover:text-blue-600 focus:outline-none ${
                isActive("/category/smartphones") ||
                isActive("/category/laptops") ||
                isActive("/category/smartwatches") ||
                isActive("/category/tvs")
                  ? "text-blue-700 font-bold"
                  : ""
              }`}
              aria-haspopup="true"
              aria-expanded={isMegaOpen}
              onClick={toggleMegaMenu}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleMegaMenu();
                }
              }}
              tabIndex={0}
              type="button"
            >
              <Package className="w-4 h-4" /> Categories
              <ChevronDown className="w-4 h-4" />
            </button>

            {isMegaOpen && (
              <div
                className="absolute left-0 mt-3 w-[750px] bg-white shadow-xl border rounded-lg grid grid-cols-3 gap-6 p-6 animate-fadeIn z-50"
                role="menu"
              >
                {/* Column 1 */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Smart Devices</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/category/smartphones"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/category/smartphones")
                            ? "text-blue-700 font-semibold"
                            : ""
                        }`}
                        role="menuitem"
                      >
                        <Phone className="w-4 h-4" /> Smartphones
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/laptops"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/category/laptops")
                            ? "text-blue-700 font-semibold"
                            : ""
                        }`}
                        role="menuitem"
                      >
                        <Laptop className="w-4 h-4" /> Laptops
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/smartwatches"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/category/smartwatches")
                            ? "text-blue-700 font-semibold"
                            : ""
                        }`}
                        role="menuitem"
                      >
                        <Watch className="w-4 h-4" /> Smartwatches
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/tvs"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/category/tvs") ? "text-blue-700 font-semibold" : ""
                        }`}
                        role="menuitem"
                      >
                        <Tv className="w-4 h-4" /> Televisions
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Accessories</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/category/audio"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/category/audio") ? "text-blue-700 font-semibold" : ""
                        }`}
                        role="menuitem"
                      >
                        <Headphones className="w-4 h-4" /> Headphones
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/home"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/category/home") ? "text-blue-700 font-semibold" : ""
                        }`}
                        role="menuitem"
                      >
                        <Gift className="w-4 h-4" /> Smart Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/gaming"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/category/gaming") ? "text-blue-700 font-semibold" : ""
                        }`}
                        role="menuitem"
                      >
                        <Gift className="w-4 h-4" /> Gaming
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Special Offers</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/deals"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/deals") ? "text-blue-700 font-semibold" : ""
                        }`}
                        role="menuitem"
                      >
                        <Percent className="w-4 h-4" /> Deals & Discounts
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/new-arrivals"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/new-arrivals") ? "text-blue-700 font-semibold" : ""
                        }`}
                        role="menuitem"
                      >
                        <Gift className="w-4 h-4" /> New Arrivals
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shipping"
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          isActive("/shipping") ? "text-blue-700 font-semibold" : ""
                        }`}
                        role="menuitem"
                      >
                        <Truck className="w-4 h-4" /> Free Shipping
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
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
                type="button"
              >
                <User className="w-6 h-6" />
                <span className="hidden sm:block">{session.user.name}</span>
              </button>
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
                  role="menu"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
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
            aria-label="Toggle menu"
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
            aria-expanded={isMobileMega}
            aria-controls="mobile-categories"
          >
            Categories <ChevronDown className="w-4 h-4" />
          </button>
          {isMobileMega && (
            <div
              id="mobile-categories"
              className="pl-4 space-y-2 text-sm"
              role="menu"
            >
              <Link href="/category/smartphones" className="block" role="menuitem">
                Smartphones
              </Link>
              <Link href="/category/laptops" className="block" role="menuitem">
                Laptops
              </Link>
              <Link href="/category/smartwatches" className="block" role="menuitem">
                Smartwatches
              </Link>
              <Link href="/category/tvs" className="block" role="menuitem">
                Televisions
              </Link>
              <Link href="/category/audio" className="block" role="menuitem">
                Headphones
              </Link>
              <Link href="/category/gaming" className="block" role="menuitem">
                Gaming
              </Link>
            </div>
          )}
          <Link href="/deals" className="block">
            Deals
          </Link>
          <Link href="/community" className="block">
            Community
          </Link>
          <Link href="/about" className="block">
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
}
