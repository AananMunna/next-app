"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useState } from "react";

export default function CustomerDashboard() {
  const [tab, setTab] = useState("overview");

  const recentOrders = [
    { id: "ORD1234", date: "2025-08-01", status: "Delivered", total: "$125.50" },
    { id: "ORD1235", date: "2025-07-28", status: "In Transit", total: "$89.00" },
    { id: "ORD1236", date: "2025-07-25", status: "Cancelled", total: "$40.00" },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Profile Section */}
      <Card className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 shadow-lg border-t-4 border-[#1447E6]">
        <Avatar className="w-24 h-24 ring-4 ring-[#1447E6]/20 hover:scale-105 transition-transform">
          <AvatarImage src="/avatar.jpg" alt="User Profile" />
          <AvatarFallback>MU</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">Welcome back, Munna!</h2>
          <p className="text-muted-foreground">
            Here's a quick overview of your account.
          </p>
          <Button className="mt-4 bg-[#1447E6] hover:bg-[#1239B8]">
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <ScrollArea className="w-full">
          <TabsList className="flex w-full justify-start overflow-x-auto whitespace-nowrap border-b pb-2">
            {[
              "overview",
              "orders",
              "payments",
              "wishlist",
              "addresses",
              "support",
              "notifications",
              "settings",
            ].map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="capitalize data-[state=active]:bg-[#1447E6] data-[state=active]:text-white"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {/* Overview */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
              <CardDescription>
                Quick stats about your recent activity
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1447E6]/10 p-6 rounded-lg text-center">
                <p className="text-2xl font-bold text-[#1447E6]">3</p>
                <p className="text-muted-foreground">Orders This Month</p>
              </div>
              <div className="bg-[#1447E6]/10 p-6 rounded-lg text-center">
                <p className="text-2xl font-bold text-[#1447E6]">$254.50</p>
                <p className="text-muted-foreground">Total Spend</p>
              </div>
              <div className="bg-[#1447E6]/10 p-6 rounded-lg text-center">
                <p className="text-2xl font-bold text-[#1447E6]">1</p>
                <p className="text-muted-foreground">Active Wishlist Items</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your last 3 orders</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-muted/50">
                      <th className="pb-2">Order ID</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-muted/20 hover:bg-[#1447E6]/5 transition-colors"
                      >
                        <td className="py-2 font-mono">{order.id}</td>
                        <td>{order.date}</td>
                        <td>
                          <Badge
                            className={`${
                              order.status === "Delivered"
                                ? "bg-green-500"
                                : order.status === "In Transit"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            } text-white`}
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td>{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
              <Button className="mt-4 bg-[#1447E6] hover:bg-[#1239B8]">
                View All Orders
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved cards</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Visa ending in 1234</p>
                    <p className="text-muted-foreground text-sm">Expires 12/25</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </li>
                <li className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">MasterCard ending in 5678</p>
                    <p className="text-muted-foreground text-sm">Expires 01/27</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </li>
              </ul>
              <Button className="mt-4 bg-[#1447E6] hover:bg-[#1239B8]">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist */}
        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>Items you saved to buy later</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No items in your wishlist yet.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses */}
        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Addresses</CardTitle>
              <CardDescription>Manage your shipping and billing addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="border p-4 rounded-lg">
                  <p className="font-semibold">Home Address</p>
                  <p>123 Main Street, Dhaka, Bangladesh</p>
                  <Button variant="link" className="mt-2 px-0">
                    Edit
                  </Button>
                </li>
                <li className="border p-4 rounded-lg">
                  <p className="font-semibold">Billing Address</p>
                  <p>456 Other Road, Dhaka, Bangladesh</p>
                  <Button variant="link" className="mt-2 px-0">
                    Edit
                  </Button>
                </li>
              </ul>
              <Button className="mt-4 bg-[#1447E6] hover:bg-[#1239B8]">
                Add New Address
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support */}
        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support & Help Center</CardTitle>
              <CardDescription>Contact us or check FAQs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Have questions? Reach out via email or check our FAQs.
              </p>
              <Button variant="outline" className="border-[#1447E6] text-[#1447E6] hover:bg-[#1447E6]/10">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Your latest alerts and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="p-3 border rounded-lg bg-[#1447E6]/5">
                  <p>Your order ORD1234 has been delivered.</p>
                  <p className="text-sm text-muted-foreground">Aug 1, 2025</p>
                </li>
                <li className="p-3 border rounded-lg bg-[#1447E6]/5">
                  <p>New discount coupon available!</p>
                  <p className="text-sm text-muted-foreground">Jul 30, 2025</p>
                </li>
              </ul>
              <Button className="mt-4 bg-[#1447E6] hover:bg-[#1239B8]">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4 max-w-md">
                <div>
                  <label className="block mb-1 font-semibold" htmlFor="email">
                    Email
                  </label>
                  <Input id="email" type="email" defaultValue="munna@example.com" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold" htmlFor="password">
                    New Password
                  </label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button type="submit" className="bg-[#1447E6] hover:bg-[#1239B8]">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
