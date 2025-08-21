"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  ShoppingCart,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  HelpCircle,
  TrendingUp,
  User,
  Calendar,
  ArrowRight
} from "lucide-react";

export default function CustomerDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setTimeout(() => {
        setDashboardData({
          stats: {
            totalOrders: 8,
            pendingOrders: 2,
            deliveredOrders: 5,
            cancelledOrders: 1
          },
          recentOrders: [
            { id: "ORD-1234", product: "iPhone 16 Pro", date: "2023-12-15", status: "Delivered", amount: 1299 },
            { id: "ORD-1235", product: "Samsung S25 Ultra", date: "2023-12-10", status: "Processing", amount: 1199 },
            { id: "ORD-1236", product: "Xiaomi 15 Ultra", date: "2023-12-05", status: "Shipped", amount: 999 },
            { id: "ORD-1237", product: "Oppo Find X8 Pro", date: "2023-12-01", status: "Processing", amount: 899 }
          ],
          wishlist: [
            { id: "PROD-1001", name: "Google Pixel 9", price: 899, image: "/placeholder-pixel.jpg" },
            { id: "PROD-1002", name: "Vivo X100 Pro", price: 799, image: "/placeholder-vivo.jpg" }
          ],
          rewards: {
            points: 450,
            level: "Silver",
            nextLevel: "Gold (at 1000 points)"
          }
        });
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground">Here's your account overview and recent activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Orders" 
          value={dashboardData.stats.totalOrders} 
          icon={<ShoppingCart className="h-5 w-5" />}
          loading={loading}
        />
        <StatCard 
          title="Pending Orders" 
          value={dashboardData.stats.pendingOrders} 
          icon={<Clock className="h-5 w-5" />}
          loading={loading}
          variant="warning"
        />
        <StatCard 
          title="Delivered" 
          value={dashboardData.stats.deliveredOrders} 
          icon={<CheckCircle className="h-5 w-5" />}
          loading={loading}
          variant="success"
        />
        <StatCard 
          title="Cancelled" 
          value={dashboardData.stats.cancelledOrders} 
          icon={<AlertCircle className="h-5 w-5" />}
          loading={loading}
          variant="destructive"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your most recent purchases</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/customer/orders">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{order.product}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">{order.id}</p>
                        <span className="text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">${order.amount}</p>
                    <Badge 
                      variant={
                        order.status === "Delivered" ? "success" : 
                        order.status === "Shipped" ? "default" : 
                        "secondary"
                      }
                      className="mt-1"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Sidebar */}
        <div className="col-span-3 space-y-6">
          {/* Wishlist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Wishlist
              </CardTitle>
              <CardDescription>Your saved items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.wishlist.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">${item.price}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/dashboard/customer/wishlist">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Rewards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Rewards
              </CardTitle>
              <CardDescription>Your loyalty status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Points</span>
                  <span className="font-medium">{dashboardData.rewards.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Level</span>
                  <Badge variant="outline">{dashboardData.rewards.level}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Next Level</span>
                  <span className="text-xs text-muted-foreground">{dashboardData.rewards.nextLevel}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/dashboard/customer/rewards">
                  Earn More Points
                  <TrendingUp className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your account</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/customer/addresses">
                  <MapPin className="mr-2 h-4 w-4" />
                  Addresses
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/customer/payments">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/customer/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/customer/support">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Get Help
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, loading, variant = "default" }) {
  const variantClasses = {
    default: "text-primary bg-primary/10",
    success: "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400",
    warning: "text-yellow-600 bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-400",
    destructive: "text-red-600 bg-red-100 dark:bg-red-950 dark:text-red-400"
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-7 w-16" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`h-9 w-9 rounded-full flex items-center justify-center ${variantClasses[variant]}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

// Skeleton Loading Component
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Welcome Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-5 w-32" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders Skeleton */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-9 w-20" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <Skeleton className="h-4 w-16 ml-auto" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sidebar Skeleton */}
        <div className="col-span-3 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
                <Skeleton className="h-9 w-full mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}