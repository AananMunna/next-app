"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Trash2, 
  MoveHorizontal, 
  Star,
  Plus,
  Minus
} from "lucide-react";

// Mock data structure - replace with API data later
const mockWishlistItems = [
  {
    id: "1",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: 1299,
    originalPrice: 1399,
    image: "https://res.cloudinary.com/dtiotqi9q/image/upload/v1755804371/i-Phone-16-Pro-Max-Leaks-exclusive-smartphone-transparent-PNG-image_uxclfc.png",
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    description: "Latest iPhone with advanced camera system and A18 chip"
  },
  {
    id: "2",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    price: 1199,
    originalPrice: 1299,
    image: "https://res.cloudinary.com/dtiotqi9q/image/upload/v1755804371/Samsung-Galaxy-S25-Ultra-Titanium-Black-Premium-Smartphone-1_ufbo88.png",
    href: "/products/samsung-galaxy-s25-ultra",
    inStock: true,
    rating: 4.7,
    reviewCount: 98,
    description: "Powerful Android phone with S Pen and 200MP camera"
  },
  {
    id: "4",
    name: "Xiaomi 15 Ultra",
    brand: "Xiaomi",
    price: 899,
    originalPrice: 999,
    image: "https://res.cloudinary.com/dtiotqi9q/image/upload/v1755804369/xiaomi-15-ultra_1_xnqk0z.png",
    inStock: true,
    rating: 4.5,
    reviewCount: 63,
    description: "Flagship killer with Leica cameras and fast charging"
  }
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  // Simulate API call
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // In a real app, you would fetch from API
        // const response = await fetch('/api/wishlist');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setWishlistItems(mockWishlistItems);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveItem = async (id) => {
    setRemovingId(id);
    try {
      // In a real app, you would call API to remove item
      // await fetch(`/api/wishlist/${id}`, { method: 'DELETE' });
      
      // Simulate API delay
      setTimeout(() => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
        setRemovingId(null);
      }, 500);
    } catch (error) {
      console.error("Failed to remove item:", error);
      setRemovingId(null);
    }
  };

  const handleMoveToCart = async (item) => {
    try {
      // In a real app, you would call API to add to cart
      // await fetch('/api/cart', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(item)
      // });
      
      // Then remove from wishlist
      handleRemoveItem(item.id);
    } catch (error) {
      console.error("Failed to move to cart:", error);
    }
  };

  if (loading) {
    return <WishlistSkeleton />;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-muted">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-foreground">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">
          Save your favorite items here to easily find them later.
        </p>
        <Button asChild>
          <a href="/products">
            Browse Products
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="/products">
            Continue Shopping
          </a>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <WishlistItemCard
            key={item.id}
            item={item}
            removing={removingId === item.id}
            onRemove={() => handleRemoveItem(item.id)}
            onMoveToCart={() => handleMoveToCart(item)}
          />
        ))}
      </div>
    </div>
  );
}

function WishlistItemCard({ item, removing, onRemove, onMoveToCart }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className="relative aspect-square bg-muted">
        {!imageError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-4 transition-transform hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-muted-foreground">Image not available</div>
          </div>
        )}
        
        {/* Stock status badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={item.inStock ? "default" : "secondary"}>
            {item.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
        
        {/* Discount badge */}
        {item.originalPrice > item.price && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive">
              Save ${item.originalPrice - item.price}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{item.brand}</p>
            <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            disabled={removing}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(item.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({item.reviewCount})
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-3 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      </CardContent>

      <CardFooter className="flex-col items-start gap-3">
        <div className="flex items-center gap-2 w-full">
          <span className="text-lg font-bold text-foreground">${item.price}</span>
          {item.originalPrice > item.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${item.originalPrice}
            </span>
          )}
        </div>
        
        <div className="flex gap-2 w-full">
          {/* <Button 
            variant="outline" 
            className="flex-1" 
            asChild
          >
            <a href={`/products/${item.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </a>
          </Button> */}
          <Button 
            className="flex-1" 
            onClick={onMoveToCart}
            disabled={!item.inStock || removing}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function WishlistSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-4 w-24 mt-2" />
            </CardHeader>
            <CardContent className="pb-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter className="flex-col items-start gap-3">
              <Skeleton className="h-6 w-20" />
              <div className="flex gap-2 w-full">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}