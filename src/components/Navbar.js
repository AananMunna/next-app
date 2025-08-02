"use client";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Community", href: "/community" },
  { label: "About Us", href: "/about" },
  { label: "Trips", href: "/trips" },
];

export default function Navbar() {
  const { data: session } = useSession();

  console.log(session)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <Globe className="w-7 h-7" />
          <span className="hidden sm:block">TravelMate</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-600">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div>
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Login
              </Link>
              <Link href="/register" className="ml-3 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
