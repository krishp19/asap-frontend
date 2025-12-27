"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Clock, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  deliveryTime?: string;
  badge?: string;
  category?: string;
}

const ProductCard = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  deliveryTime = "90 mins",
  badge,
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-card rounded-xl overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${id}`}
        className="block relative aspect-[3/4] overflow-hidden"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {badge && <span className="badge-sale">{badge}</span>}
          {discount > 0 && (
            <span className="px-2 py-1 bg-accent text-charcoal text-xs font-bold rounded">
              {discount}% OFF
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-300",
            isLiked
              ? "bg-primary text-primary-foreground"
              : "bg-background/80 text-foreground hover:bg-background"
          )}
        >
          <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        </button>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="badge-delivery text-xs">
            <Clock className="h-3 w-3" />
            <span>Delivery in {deliveryTime}</span>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-x-3 bottom-14 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Button variant="gold" className="w-full" size="sm">
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs font-medium text-muted-foreground mb-1">{brand}</p>
        <Link href={`/product/${id}`}>
          <h3 className="font-medium text-foreground line-clamp-1 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald/10 rounded">
            <Star className="h-3 w-3 fill-emerald text-emerald" />
            <span className="text-xs font-semibold text-emerald">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-foreground">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-emerald">
                {discount}% off
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
