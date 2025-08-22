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
  LogOut,
  PackageOpen,
  Shield,
  Home,
  Grid,
  Percent,
  UserCog,
  Smartphone,
  Phone,
  Info,
  HelpCircle,
  Contact
} from "lucide-react";
import { ThemeToggle } from "@/lib/ThemeToggle";
import PhoneHubLogo from "./PhoneHubLogo";

// Centralized navigation configuration
export const navConfig = {
  mainNav: [
    {
      name: "Home",
      href: "/",
      icon: Home,
      mobileOnly: false
    },
    {
      name: "Products",
      href: "/products",
      icon: Grid,
      mobileOnly: false
    },
    {
      name: "Deals",
      href: "/deals",
      icon: Percent,
      mobileOnly: false
    },
    {
      name: "About",
      href: "/about",
      icon: Info,
      mobileOnly: false
    },
    {
      name: "Contact",
      href: "/contact",
      icon: Contact,
      mobileOnly: false
    }
  ],
  userNav: (session) => [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: PackageOpen,
      show: true
    },
    {
      name: "Profile",
      href: "/profile",
      icon: UserCog,
      show: true
    },
    {
      name: "Admin",
      href: "/admin",
      icon: Shield,
      show: session?.user?.role === "admin"
    }
  ],
  mobileBottomNav: [
    {
      name: "Home",
      href: "/",
      icon: Home
    },
    {
      name: "Products",
      href: "/products",
      icon: Grid
    },
    {
      name: "Deals",
      href: "/deals",
      icon: Percent
    },
    {
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      showBadge: true
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      dynamicLabel: true // Will show "Login" if not authenticated
    }
  ]
};

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(3); // Example count

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
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary"
            aria-label="PhoneHub Home"
          >
            <PhoneHubLogo/>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary font-semibold" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
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
                  aria-label="Search products"
                />
              </form>
            </div>

            <ThemeToggle />

            <button 
              className="p-2 rounded-md hover:bg-accent md:hidden"
              aria-label="Search"
              onClick={() => {
                // Focus on search input when mobile search button is clicked
                document.querySelector('input[type="search"]')?.focus();
              }}
            >
              <Search className="h-5 w-5" />
            </button>

            <Link 
              href="/wishlist" 
              className="p-2 rounded-md hover:bg-accent"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            <Link 
              href="/cart" 
              className="p-2 rounded-md hover:bg-accent relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {session?.user ? (
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 rounded-full hover:bg-accent"
                  aria-label="User profile"
                >
                  <User className="h-5 w-5" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover text-popover-foreground rounded-md shadow-lg border z-50">
                    <div className="p-3 border-b">
                      <p className="font-medium truncate">{session.user.name}</p>
                      <p className="text-muted-foreground text-xs truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <div className="p-1">
                      {navConfig.userNav(session).map((item) => 
                        item.show ? (
                          <Link 
                            key={item.href}
                            href={item.href} 
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        ) : null
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
              {navConfig.mainNav.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
                    isActive(item.href) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
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
        {navConfig.mobileBottomNav.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className="flex flex-col items-center gap-1 p-2 relative"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={`rounded-full p-1 ${isActive(item.href) ? "bg-primary text-primary-foreground" : ""}`}>
              <item.icon className="h-5 w-5" />
            </div>
            {item.showBadge && cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
                {cartItemsCount}
              </span>
            )}
            <span className="text-xs">
              {item.dynamicLabel && !session ? "Login" : item.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}