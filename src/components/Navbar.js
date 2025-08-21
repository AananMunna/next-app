"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Heart,
  Phone,
  LogOut,
  PackageOpen,
  Shield,
  Home,
  Grid,
  Percent,
  UserCog
} from "lucide-react";
import { ThemeToggle } from "@/lib/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  const isActive = (href) => pathname === href;

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur border-b" 
            : "bg-background border-b"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-accent"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary"
          >
            <Phone className="h-6 w-6" />
            <span className="hidden sm:block">PhoneHub</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-primary ${isActive("/") ? "text-primary font-semibold" : "text-foreground"}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`transition-colors hover:text-primary ${isActive("/products") ? "text-primary font-semibold" : "text-foreground"}`}
            >
              Products
            </Link>
            <Link
              href="/deals"
              className={`transition-colors hover:text-primary ${isActive("/deals") ? "text-primary font-semibold" : "text-foreground"}`}
            >
              Deals
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-primary ${isActive("/about") ? "text-primary font-semibold" : "text-foreground"}`}
            >
              About
            </Link>
          </div>

          {/* Right side icons and actions */}
          <div className="flex items-center gap-2">
            {/* Search bar - visible on desktop */}
            <div className="hidden md:flex relative">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search phones..."
                  className="pl-9 w-[200px] lg:w-[300px] py-2 px-3 rounded-md border border-input bg-background text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            <ThemeToggle />

            <button className="p-2 rounded-md hover:bg-accent md:hidden">
              <Search className="h-5 w-5" />
            </button>

            <Link href="/wishlist" className="p-2 rounded-md hover:bg-accent">
              <Heart className="h-5 w-5" />
            </Link>

            <Link href="/cart" className="p-2 rounded-md hover:bg-accent relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
                3
              </span>
            </Link>

            {session?.user ? (
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 rounded-full hover:bg-accent"
                >
                  <User className="h-5 w-5" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover text-popover-foreground rounded-md shadow-lg border z-50">
                    <div className="p-3 border-b">
                      <p className="font-medium">{session.user.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {session.user.email}
                      </p>
                    </div>
                    <div className="p-1">
                      <Link 
                        href="/dashboard" 
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <PackageOpen className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        href="/profile" 
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <UserCog className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      {session.user.role === "admin" && (
                        <Link 
                          href="/admin" 
                          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Shield className="h-4 w-4" />
                          <span>Admin</span>
                        </Link>
                      )}
                      <div className="border-t my-1"></div>
                      <button 
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm w-full text-destructive"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="hidden md:flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search - appears when scrolling on mobile */}
        {isScrolled && (
          <div className="md:hidden p-2 border-t">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search phones..."
                className="pl-9 w-full py-2 px-3 rounded-md border border-input bg-background text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t shadow-lg z-40">
            <div className="p-4 space-y-4">
              <Link 
                href="/" 
                className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link 
                href="/products" 
                className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isActive("/products") ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Grid className="h-5 w-5" />
                <span>Products</span>
              </Link>
              <Link 
                href="/deals" 
                className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isActive("/deals") ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Percent className="h-5 w-5" />
                <span>Deals</span>
              </Link>
              <Link 
                href="/about" 
                className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isActive("/about") ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-5 w-5" />
                <span>About Us</span>
              </Link>
              
              <div className="pt-4 border-t">
                {session ? (
                  <button 
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-destructive w-full hover:bg-accent"
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <Link 
                    href="/login" 
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center h-16 z-40 md:hidden">
        <Link 
          href="/" 
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className={`rounded-full p-1 ${isActive("/") ? "bg-primary text-primary-foreground" : ""}`}>
            <Home className="h-5 w-5" />
          </div>
          <span className="text-xs">Home</span>
        </Link>

        <Link 
          href="/products" 
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className={`rounded-full p-1 ${isActive("/products") ? "bg-primary text-primary-foreground" : ""}`}>
            <Grid className="h-5 w-5" />
          </div>
          <span className="text-xs">Products</span>
        </Link>

        <Link 
          href="/deals" 
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className={`rounded-full p-1 ${isActive("/deals") ? "bg-primary text-primary-foreground" : ""}`}>
            <Percent className="h-5 w-5" />
          </div>
          <span className="text-xs">Deals</span>
        </Link>

        <Link 
          href="/cart" 
          className="flex flex-col items-center gap-1 p-2 relative"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className={`rounded-full p-1 ${isActive("/cart") ? "bg-primary text-primary-foreground" : ""}`}>
            <ShoppingCart className="h-5 w-5" />
          </div>
          <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
            3
          </span>
          <span className="text-xs">Cart</span>
        </Link>

        <Link 
          href={session ? "/profile" : "/login"} 
          className="flex flex-col items-center gap-1 p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className={`rounded-full p-1 ${isActive("/profile") || isActive("/login") ? "bg-primary text-primary-foreground" : ""}`}>
            <User className="h-5 w-5" />
          </div>
          <span className="text-xs">{session ? "Profile" : "Login"}</span>
        </Link>
      </div>
    </>
  );
}