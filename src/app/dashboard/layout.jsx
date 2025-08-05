"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Simulated function to get role (replace with your auth system)
function getUserRole() {
  // Example: get role from JWT, context, or DB
  return "customer"; 
}

export default function DashboardLayout({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // In real life, fetch role from backend or cookies
    const userRole = getUserRole();
    setRole(userRole);
  }, []);

  if (!role) return <div>Loading...</div>;

  const navLinks = {
    customer: [
      { href: "/dashboard/customer", label: "Home" },
      { href: "/dashboard/customer/orders", label: "Orders" },
      { href: "/dashboard/customer/payments", label: "Payments" },
      { href: "/dashboard/customer/profile", label: "Profile" },
    ],
    seller: [
      { href: "/dashboard/seller", label: "Dashboard" },
      { href: "/dashboard/seller/products", label: "Products" },
      { href: "/dashboard/seller/orders", label: "Orders" },
      { href: "/dashboard/seller/sales", label: "Sales Analytics" },
    ],
    deliveryman: [
      { href: "/dashboard/deliveryman", label: "Deliveries" },
      { href: "/dashboard/deliveryman/earnings", label: "Earnings" },
      { href: "/dashboard/deliveryman/profile", label: "Profile" },
    ],
    admin: [
      { href: "/dashboard/admin", label: "Overview" },
      { href: "/dashboard/admin/users", label: "Users" },
      { href: "/dashboard/admin/orders", label: "Orders" },
      { href: "/dashboard/admin/analytics", label: "Analytics" },
    ],
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-6 capitalize">{role} Panel</h2>
        <nav className="flex flex-col gap-4">
          {navLinks[role]?.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
