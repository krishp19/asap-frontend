"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  Shield,
  RefreshCcw,
  Star,
  MapPin,
  Clock,
  Check,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

interface ProductDetailsClientProps {
  product: Product;
}

const ProductDetailsClient = ({ product }: ProductDetailsClientProps) => {
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[1] || product.sizes?.[0] || null
  );
  const [selectedColor, setSelectedColor] = useState<
    { name: string; hex: string } | null
  >(product.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [isDeliverable, setIsDeliverable] = useState<boolean | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const images = useMemo(
    () => product.images || [product.image, product.image, product.image],
    [product]
  );

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setIsDeliverable(true);
    }
  };

  const addToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const buyNow = () => {
    addToCart();
    router.push("/cart");
  };

  return (
    <main className="pb-32 md:pb-0">
      <div className="bg-secondary/30 py-4">
        <div className="container-main">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/category/${product.category}`}
              className="hover:text-primary transition-colors capitalize"
            >
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover animate-scale-in"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 badge-sale">
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  "absolute top-4 right-4 p-3 rounded-full transition-all",
                  isLiked
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/80 hover:bg-background"
                )}
              >
                <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
              </button>
            </div>

            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "w-20 h-24 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-border"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-primary font-medium mb-1">{product.brand}</p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-emerald/10 rounded">
                  <Star className="h-4 w-4 fill-emerald text-emerald" />
                  <span className="font-semibold text-emerald">
                    {product.rating}
                  </span>
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {added && (
                <div className="mt-4 p-3 rounded-xl bg-emerald/10 text-emerald font-medium animate-slide-up">
                  ✓ Added to cart
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3 py-4 border-y border-border">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-lg font-semibold text-emerald">
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            {product.colors && (
              <div>
                <p className="font-medium text-foreground mb-3">
                  Color: <span className="text-muted-foreground">{selectedColor?.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor?.name === color.name
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div>
                <p className="font-medium text-foreground mb-3">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[48px] px-4 py-2 rounded-lg border-2 font-medium transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="font-medium text-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-xl">
              <p className="font-medium text-foreground mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Check Delivery Availability
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter PIN code"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setIsDeliverable(null);
                  }}
                  className="flex-1 px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:border-primary transition-colors"
                />
                <Button onClick={checkDelivery} disabled={pincode.length !== 6}>
                  Check
                </Button>
              </div>
              {isDeliverable && (
                <div className="mt-3 space-y-2 animate-slide-up">
                  <div className="flex items-center gap-2 text-emerald">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">Delivery Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      Get it by <strong className="text-foreground">Today, 2:00 PM - 4:00 PM</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={addToCart}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="gold"
                size="lg"
                className="flex-1"
                onClick={buyNow}
              >
                Buy Now - Get it Today
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto bg-secondary rounded-full flex items-center justify-center mb-2">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-foreground">Same-Day Delivery</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto bg-secondary rounded-full flex items-center justify-center mb-2">
                  <RefreshCcw className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-foreground">Easy Returns</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto bg-secondary rounded-full flex items-center justify-center mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-foreground">Secure Payment</p>
              </div>
            </div>

            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="h-4 w-4" />
              <span className="text-sm font-medium">Share this product</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-background border-t border-border p-4 md:hidden z-40">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={addToCart}>
            <ShoppingBag className="h-5 w-5" />
            Add to Cart
          </Button>
          <Button variant="gold" className="flex-1" onClick={buyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsClient;
