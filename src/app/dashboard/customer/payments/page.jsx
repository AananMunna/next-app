"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function PaymentPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#1447E6]">Checkout & Payment</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Payment Form */}
        <Card className="md:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>Enter your details to complete the purchase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Billing Info */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Billing Details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Munna Ahmed" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="munna@example.com" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main Street" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Dhaka" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Method */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Payment Method</h2>
              <RadioGroup defaultValue="card" className="space-y-3">
                <div className="flex items-center space-x-3 border rounded-lg p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1">PayPal</Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-3">
                  <RadioGroupItem value="bkash" id="bkash" />
                  <Label htmlFor="bkash" className="flex-1">bKash / Mobile Payment</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Card Details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="Munna Ahmed" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="bg-[#1447E6] hover:bg-[#0f36b4] w-full md:w-auto">
              Pay Now
            </Button>
          </CardFooter>
        </Card>

        {/* Right Section - Order Summary */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order before payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Wireless Headphones</span>
              <span>$120.00</span>
            </div>
            <div className="flex justify-between">
              <span>Smart Watch</span>
              <span>$180.00</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-[#1447E6] text-lg">$300.00</span>
            </div>
            <Badge variant="secondary" className="mt-4 w-full text-center py-2">
              Free Shipping Included 🚚
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
