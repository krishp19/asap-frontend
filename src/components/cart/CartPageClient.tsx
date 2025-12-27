"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Clock,
  Truck,
  Tag,
  ChevronRight,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

const CartPageClient = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "m1", quantity: 1, size: "M" },
    { productId: "h1", quantity: 2 },
  ]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const cartProducts = useMemo(() => {
    return cartItems
      .map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }))
      .filter((item) => !!item.product);
  }, [cartItems]);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.productId !== productId));
  };

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  );

  const originalTotal = cartProducts.reduce(
    (sum, item) =>
      sum +
      ((item.product?.originalPrice ?? item.product?.price ?? 0) * item.quantity),
    0
  );

  const discount = originalTotal - subtotal;
  const deliveryFee = subtotal >= 999 ? 0 : 49;
  const couponDiscount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee - couponDiscount;

  const applyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (code === "NEWUSER15" || code === "FESTIVE60") {
      setAppliedCoupon(code);
      setCouponCode("");
    }
  };

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-main py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto bg-secondary rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button variant="gold" size="lg" onClick={() => router.push("/")}
            >
              Start Shopping
            </Button>
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-32 md:pb-0">
        <div className="bg-secondary/30 py-4">
          <div className="container-main">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Shopping Cart</span>
            </nav>
          </div>
        </div>

        <div className="container-main py-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">
            Shopping Cart ({cartProducts.length} items)
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-emerald/10 rounded-xl">
                <Clock className="h-5 w-5 text-emerald" />
                <p className="text-sm">
                  <span className="font-semibold text-emerald">
                    Same-Day Delivery Available
                  </span>
                  <span className="text-muted-foreground">
                    {" "}- Order within 2 hours for delivery today
                  </span>
                </p>
              </div>

              {cartProducts.map((item, index) => {
                const product = item.product!;
                return (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-28 md:w-32 md:h-36 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {product.brand}
                          </p>
                          <Link href={`/product/${product.id}`}>
                            <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          {item.size && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 mt-2 text-xs text-emerald">
                        <Truck className="h-3 w-3" />
                        <span>Delivery in {product.deliveryTime}</span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="p-1.5 rounded-lg border border-border hover:bg-secondary transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="p-1.5 rounded-lg border border-border hover:bg-secondary transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-foreground">
                            ₹{(product.price * item.quantity).toLocaleString()}
                          </p>
                          {product.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ₹
                              {(
                                product.originalPrice * item.quantity
                              ).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-card rounded-xl border border-border p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    Apply Coupon
                  </h3>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-emerald/10 rounded-lg">
                      <span className="font-mono font-semibold text-emerald">
                        {appliedCoupon}
                      </span>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className="text-sm text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-4 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <Button variant="outline" onClick={applyCoupon}>
                        Apply
                      </Button>
                    </div>
                  )}
                </div>

                <div className="bg-card rounded-xl border border-border p-4">
                  <h3 className="font-semibold text-foreground mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ₹{originalTotal.toLocaleString()}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString()}</span>
                      </div>
                    )}
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-emerald">
                        <span>Coupon ({appliedCoupon})</span>
                        <span>-₹{couponDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span
                        className={cn(
                          "font-medium",
                          deliveryFee === 0 && "text-emerald"
                        )}
                      >
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    {deliveryFee > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Add ₹{999 - subtotal} more for free delivery
                      </p>
                    )}
                    <div className="pt-3 border-t border-border flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-lg text-foreground">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                    {discount + couponDiscount > 0 && (
                      <p className="text-xs text-emerald font-medium">
                        You&apos;re saving ₹{(discount + couponDiscount).toLocaleString()} on
                        this order!
                      </p>
                    )}
                  </div>

                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full mt-6"
                    onClick={() => router.push("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Same-Day Delivery
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Estimated arrival: Today, 2:00 PM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-background border-t border-border p-4 md:hidden z-40">
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground">Total</span>
          <span className="font-bold text-xl text-foreground">
            ₹{total.toLocaleString()}
          </span>
        </div>
        <Button
          variant="gold"
          size="lg"
          className="w-full"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default CartPageClient;
