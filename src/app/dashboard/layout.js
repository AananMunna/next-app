"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Menu, 
  X, 
  ChevronLeft, 
  Home, 
  Package, 
  CreditCard, 
  Heart, 
  MapPin, 
  Star, 
  RefreshCw, 
  Bell, 
  MessageSquare, 
  FileText, 
  User, 
  HelpCircle,
  BarChart3,
  Box,
  Truck,
  Settings,
  Users,
  PieChart,
  ShoppingBag,
  Calendar,
  Award,
  Shield,
  BookOpen,
  TrendingUp,
  Wallet,
  Car,
  Clock,
  FileCheck
} from "lucide-react";
import Loading from "../loading";

// Icon mapping for navigation items
const iconMap = {
  "Overview": Home,
  "Orders & Tracking": Package,
  "Orders": Package,
  "Deliveries": Truck,
  "Payments": CreditCard,
  "Wishlist": Heart,
  "Saved Addresses": MapPin,
  "Loyalty & Rewards": Star,
  "Returns & Refunds": RefreshCw,
  "Messages & Notifications": Bell,
  "My Reviews": MessageSquare,
  "Download Invoices": FileText,
  "Account Settings": User,
  "Customer Support": HelpCircle,
  "Dashboard": BarChart3,
  "Products": Box,
  "Sales Analytics": TrendingUp,
  "Inventory Management": Package,
  "Marketing Tools": Award,
  "Customer Ratings": Star,
  "Seller Support": HelpCircle,
  "Earnings": Wallet,
  "Schedule": Calendar,
  "Vehicles": Car,
  "Profile": User,
  "Training": BookOpen,
  "Performance": TrendingUp,
  "Users": Users,
  "Analytics": PieChart,
  "Manage Products": ShoppingBag,
  "Reports": FileCheck,
  "Roles & Permissions": Shield,
  "Support Tickets": HelpCircle,
  "System Logs": Settings
};

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (status === "loading") return <Loading />;
  if (!session) return <div className="p-8 text-center">Please log in to view this page.</div>;

  const role = session?.user?.role || "customer";
  // const role = "seller";

  const navLinks = {
    customer: [
      { href: "/dashboard/customer", label: "Overview" },
      { href: "/dashboard/addProduct", label: "Add Product" },
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
    return <div className="p-8 text-center">Access Denied: You do not have permission to view this dashboard.</div>;
  }

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const sidebarWidth = isCollapsed ? "w-16" : "w-64";
  const mobileSidebarClass = sidebarOpen ? "translate-x-0" : "-translate-x-full";
  const desktopSidebarClass = isCollapsed ? "lg:w-16" : "lg:w-64";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-primary text-primary-foreground flex items-center justify-between px-4 py-3 shadow-md z-50">
        <h1 className="font-bold text-lg capitalize">{role} Panel</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-primary-foreground hover:bg-primary/20"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${sidebarWidth} bg-card border-r border-border shadow-xl z-50 transform transition-all duration-300 lg:translate-x-0 ${isMobile ? mobileSidebarClass : ''} ${desktopSidebarClass}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <Card className="p-3 text-center bg-primary text-primary-foreground">
              {!isCollapsed ? (
                <div>
                  <h2 className="text-lg font-bold capitalize">{role} Panel</h2>
                  <Badge className="mt-1 bg-primary-foreground text-primary font-semibold">
                    {role.toUpperCase()}
                  </Badge>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Badge className="bg-primary-foreground text-primary font-semibold text-xs">
                    {role.charAt(0).toUpperCase()}
                  </Badge>
                </div>
              )}
            </Card>
            
            {/* Collapse Toggle Button - Desktop only */}
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-11 h-6 w-6 rounded-full bg-border hover:bg-muted"
              >
                <ChevronLeft className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              <TooltipProvider>
                {navLinks[role].map(({ href, label }) => {
                  const active = pathname === href;
                  const IconComponent = iconMap[label] || HelpCircle;
                  
                  return (
                    <Tooltip key={href} delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Link href={href}>
                          <Button
                            variant={active ? "default" : "ghost"}
                            className={`justify-start w-full rounded-lg transition-all ${
                              isCollapsed ? "px-3" : "px-4"
                            } ${
                              active
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "text-foreground hover:bg-accent"
                            }`}
                          >
                            <IconComponent className="h-5 w-5 flex-shrink-0" />
                            {!isCollapsed && <span className="ml-3">{label}</span>}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right" className="ml-2">
                          {label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Link href="/">
              <Button variant="ghost" className={`justify-start w-full ${isCollapsed ? "px-3" : "px-4"}`}>
                <Home className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">Back to Home</span>}
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "lg:ml-16" : "lg:ml-64"} ${isMobile ? "mt-14" : ""}`}>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}