"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, Trash2, ShoppingBag, Lock, ArrowRight } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  // Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        if (res.ok) {
          setCart(data?.items || []);
        } else {
          toast.error("Failed to load cart ❌");
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        toast.error("Error loading cart ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Update Quantity
  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQty }),
      });
      if (res.ok) {
        setCart((prev) =>
          prev.map((item) =>
            item.productId === productId ? { ...item, quantity: newQty } : item
          )
        );
        toast.success("Quantity updated ✅");
      } else toast.error("Failed to update ❌");
    } catch {
      toast.error("Error updating cart ❌");
    }
  };

  // Remove Item
  const handleRemove = async (productId) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
        toast.success("Item removed 🗑️");
      } else toast.error("Failed to remove ❌");
    } catch {
      toast.error("Error removing item ❌");
    }
  };

  // Checkout
  const handleCheckout = async () => {
    if (!session?.user) {
      toast.error("Please login to checkout 🔐");
      return;
    }

    // Prepare productId + quantity pairs
    const items = cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity || 1,
    }));

    try {
      const res = await fetch("/api/sslcommerz-init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          user: {
            name: session.user.name,
            email: session.user.email,
            phone: session.user.phone || "01700000000",
            address: session.user.address || "Dhaka",
            city: session.user.city || "Dhaka",
          }
        }),
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url; // Redirect to SSLCommerz
      } else {
        toast.error("Checkout failed ❌");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      toast.error("Error during checkout ❌");
    }
  };

  // UI: Loading
  if (loading) return <CartSkeleton />;

  // UI: Empty Cart
  if (!cart?.length)
    return (
      <div className="max-w-md mx-auto py-12 text-center px-4">
        <div className="flex justify-center mb-6">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-foreground">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/products">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );

  // UI: Cart with Items
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6 text-center md:text-left">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE */}
        <div className="flex-1 space-y-6">
          {cart.map((item) => (
            <Card key={item?.productId} className="overflow-hidden">
                          {console.log(item)}

              <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                {/* IMAGE */}
                <div className="relative w-full sm:w-28 h-28 sm:h-32 flex-shrink-0 rounded-md overflow-hidden mx-auto sm:mx-0">
                  <Link href={`products/${item?.productId}`}>
                  <Image
                    src={item?.productImg ?? "/placeholder.png"}
                    alt={item?.title ?? "Product image"}
                    fill
                    className="object-contain"
                  />
                  </Link>
                </div>

                {/* DETAILS */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-base md:text-lg font-semibold text-foreground">
                    {item?.title || "Untitled Product"}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {item?.brand ?? "Unknown"} {item?.model ?? ""}
                  </p>
                  {/* <p className={`text-xs md:text-sm ${item?.stock > 0 ? "text-green-600" : "text-destructive"}`}>
                    {item?.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p> */}
                  {/* <p className="text-muted-foreground text-xs md:text-sm">
                    Warranty: {item?.warranty ?? "N/A"}
                  </p> */}
                  <p className="text-primary font-bold mt-1 text-lg">
                    ${item?.price?.toFixed?.(2) ?? "0.00"}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex justify-center sm:justify-start items-center mt-3 gap-2 sm:gap-4 flex-wrap">
                    <div className="flex items-center border border-border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item?.productId, (item?.quantity ?? 1) - 1)
                        }
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold px-2 min-w-[2rem] text-center">
                        {item?.quantity ?? 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item?.productId, (item?.quantity ?? 1) + 1)
                        }
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(item?.productId)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Subtotal */}
                <p className="font-bold text-foreground text-lg text-center sm:text-right">
                  ${((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <Card className="w-full lg:w-80 self-start">
          <CardHeader>
            <h2 className="text-lg md:text-xl font-semibold text-foreground">Order Summary</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-muted-foreground">Tax</span>
              <span className="text-foreground">${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-base md:text-lg font-bold text-foreground">
                <span>Total</span>
                <span>${(totalPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleCheckout} 
              className="w-full py-3 text-base"
              disabled={cart.some(item => item.stock <= 0)}
            >
              <Lock className="h-4 w-4 mr-2" />
              Proceed to Checkout
            </Button>
          </CardFooter>
          <div className="px-6 pb-6">
            <p className="text-xs text-muted-foreground text-center">
              Secure transaction powered by SSLCommerz
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}

// Skeleton loading component
function CartSkeleton() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Skeleton className="h-10 w-64 mb-8" />
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side skeleton */}
        <div className="flex-1 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                <Skeleton className="w-full sm:w-28 h-28 sm:h-32 rounded-md" />
                
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-20" />
                  
                  <div className="flex items-center gap-4 mt-3">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
                
                <Skeleton className="h-6 w-16 ml-auto" />
              </div>
            </Card>
          ))}
        </div>
        
        {/* Right side skeleton */}
        <Card className="w-full lg:w-80 self-start">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <div className="border-t border-border pt-4">
              <Skeleton className="h-6 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}