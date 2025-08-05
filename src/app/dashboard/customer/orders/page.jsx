"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const orderStages = [
  { label: "Order Placed", completed: true },
  { label: "Processing", completed: true },
  { label: "Shipped", completed: true },
  { label: "Out for Delivery", completed: false },
  { label: "Delivered", completed: false },
];

const orderItems = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: "$120.00",
    quantity: 1,
    image: "/products/headphones.jpg",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: "$180.00",
    quantity: 1,
    image: "/products/smartwatch.jpg",
  },
];

export default function OrdersTracking() {
  const completedCount = orderStages.filter((stage) => stage.completed).length;
  const progressPercent = (completedCount / orderStages.length) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <Card className="shadow-xl border-t-4 border-[#1447E6]">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Order #ORD123456
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Placed on August 1, 2025
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Shipping Status */}
          <div>
            <p className="font-semibold text-lg mb-3">Shipping Status</p>
            <Progress
              value={progressPercent}
              className="h-3 rounded-full bg-[#1447E6]/20"
            />
            <div className="flex justify-between mt-4 text-xs sm:text-sm font-medium">
              {orderStages.map(({ label, completed }) => (
                <div
                  key={label}
                  className={`flex flex-col items-center w-1/5 ${
                    completed ? "text-[#1447E6]" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 ${
                      completed
                        ? "border-[#1447E6] bg-[#1447E6] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    ✓
                  </div>
                  <span className="mt-1 text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <p className="font-semibold text-lg mb-4">Order Items</p>
            <ScrollArea className="max-h-72 rounded-md border">
              <table className="w-full text-sm sm:text-base border-collapse">
                <thead className="bg-[#1447E6]/10">
                  <tr>
                    <th className="py-3 px-2 text-left">Product</th>
                    <th className="py-3 px-2">Price</th>
                    <th className="py-3 px-2">Quantity</th>
                    <th className="py-3 px-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map(({ id, name, price, quantity, image }) => (
                    <tr
                      key={id}
                      className="border-b hover:bg-[#1447E6]/5 transition-colors"
                    >
                      <td className="py-3 px-2 flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={image} alt={name} />
                          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{name}</span>
                      </td>
                      <td className="py-3 px-2 font-mono">{price}</td>
                      <td className="py-3 px-2">{quantity}</td>
                      <td className="py-3 px-2 font-mono">
                        ${parseFloat(price.replace("$", "")) * quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </div>

          {/* Payment Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="font-semibold text-lg">Total Paid:</p>
              <p className="text-2xl font-bold text-[#1447E6]">$300.00</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-[#1447E6] text-[#1447E6] hover:bg-[#1447E6]/10"
              >
                Reorder
              </Button>
              <Button className="w-full sm:w-auto bg-[#1447E6] hover:bg-[#1239B8]">
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
