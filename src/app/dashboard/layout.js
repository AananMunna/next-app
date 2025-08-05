"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // icons

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Please log in to view this page.</div>;

  const role = session?.user?.role || "customer";

  const navLinks = {
    customer: [
      { href: "/dashboard/customer", label: "Overview" },
      { href: "/dashboard/customer/orders", label: "Orders & Tracking" },
      { href: "/dashboard/customer/payments", label: "Payments" },
      { href: "/dashboard/customer/wishlist", label: "Wishlist" },
      { href: "/dashboard/customer/addresses", label: "Saved Addresses" },
      { href: "/dashboard/customer/rewards", label: "Loyalty & Rewards" },
      { href: "/dashboard/customer/returns", label: "Returns & Refunds" },
      { href: "/dashboard/customer/notifications", label: "Messages & Notifications" },
      { href: "/dashboard/customer/reviews", label: "My Reviews" },
      { href: "/dashboard/customer/invoices", label: "Download Invoices" },
      { href: "/dashboard/customer/profile", label: "Account Settings" },
      { href: "/dashboard/customer/support", label: "Customer Support" },
    ],
    seller: [
      { href: "/dashboard/seller", label: "Dashboard" },
      { href: "/dashboard/seller/products", label: "Products" },
      { href: "/dashboard/seller/orders", label: "Orders" },
      { href: "/dashboard/seller/sales", label: "Sales Analytics" },
      { href: "/dashboard/seller/returns", label: "Returns & Refunds" },
      { href: "/dashboard/seller/inventory", label: "Inventory Management" },
      { href: "/dashboard/seller/marketing", label: "Marketing Tools" },
      { href: "/dashboard/seller/ratings", label: "Customer Ratings" },
      { href: "/dashboard/seller/payments", label: "Payments" },
      { href: "/dashboard/seller/settings", label: "Settings" },
      { href: "/dashboard/seller/support", label: "Seller Support" },
    ],
    deliveryman: [
      { href: "/dashboard/deliveryman", label: "Deliveries" },
      { href: "/dashboard/deliveryman/earnings", label: "Earnings" },
      { href: "/dashboard/deliveryman/schedule", label: "Schedule" },
      { href: "/dashboard/deliveryman/vehicles", label: "Vehicles" },
      { href: "/dashboard/deliveryman/profile", label: "Profile" },
      { href: "/dashboard/deliveryman/support", label: "Support" },
      { href: "/dashboard/deliveryman/notifications", label: "Notifications" },
      { href: "/dashboard/deliveryman/training", label: "Training" },
      { href: "/dashboard/deliveryman/performance", label: "Performance" },
      { href: "/dashboard/deliveryman/settings", label: "Settings" },
    ],
    admin: [
      { href: "/dashboard/admin", label: "Overview" },
      { href: "/dashboard/admin/users", label: "Users" },
      { href: "/dashboard/admin/orders", label: "Orders" },
      { href: "/dashboard/admin/analytics", label: "Analytics" },
      { href: "/dashboard/admin/products", label: "Manage Products" },
      { href: "/dashboard/admin/reports", label: "Reports" },
      { href: "/dashboard/admin/settings", label: "Settings" },
      { href: "/dashboard/admin/roles", label: "Roles & Permissions" },
      { href: "/dashboard/admin/support", label: "Support Tickets" },
      { href: "/dashboard/admin/notifications", label: "Notifications" },
      { href: "/dashboard/admin/system", label: "System Logs" },
    ],
  };

  if (!navLinks[role]) {
    return <div>Access Denied: You do not have permission to view this dashboard.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#1447E6] text-white flex items-center justify-between px-4 py-3 shadow-md z-50">
        <h1 className="font-bold text-lg">{role} Panel</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-[#1239B8]"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-20 lg:pt-8 px-6 sticky top-0">
          <Card className="mb-8 p-4 text-center bg-[#1447E6] text-white shadow-lg">
            <h2 className="text-xl font-bold capitalize">{role} Panel</h2>
            <Badge className="mt-2 bg-white text-[#1447E6] font-semibold">
              {role.toUpperCase()}
            </Badge>
          </Card>

          <ScrollArea className="h-[calc(100vh-160px)]">
            <nav className="flex flex-col space-y-2">
              {navLinks[role].map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} className="w-full">
                    <Button
                      variant={active ? "default" : "ghost"}
                      className={`justify-start w-full text-left rounded-lg transition-colors ${
                        active
                          ? "bg-[#1447E6] text-white hover:bg-[#1239B8]"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 mt-14 lg:mt-0 lg:ml-72 transition-all">
        {children}
      </main>
    </div>
  );
}
