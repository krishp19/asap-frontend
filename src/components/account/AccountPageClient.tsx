"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  User,
  Package,
  Heart,
  MapPin,
  Wallet,
  Settings,
  LogOut,
  Truck,
  RefreshCcw,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AccountPageClientProps {
  initialTab?: "orders" | "wishlist" | "addresses" | "wallet" | "settings";
}

const AccountPageClient = ({ initialTab = "orders" }: AccountPageClientProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const menuItems = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "wallet", label: "Wallet & Offers", icon: Wallet },
    { id: "settings", label: "Account Settings", icon: Settings },
  ] as const;

  const orders = [
    {
      id: "ORD12345",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: 4846,
      items: [
        {
          name: "Premium Linen Kurta Set",
          image:
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&q=80",
        },
        {
          name: "Handcrafted Brass Diya Set",
          image:
            "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=200&q=80",
        },
      ],
    },
    {
      id: "ORD12344",
      date: "Dec 10, 2024",
      status: "Processing",
      total: 8999,
      items: [
        {
          name: "Banarasi Silk Saree",
          image:
            "https://images.unsplash.com/photo-1610030469668-7e4ed8bc9d15?w=200&q=80",
        },
      ],
    },
  ];

  const wishlistItems = [
    {
      id: "w2",
      name: "Embroidered Anarkali Suit",
      price: 3499,
      image:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&q=80",
    },
    {
      id: "h2",
      name: "Moroccan Brass Lamp",
      price: 3499,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-20 md:pb-0">
        <div className="bg-secondary/30 py-4">
          <div className="container-main">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">My Account</span>
            </nav>
          </div>
        </div>

        <div className="container-main py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Welcome!</h2>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-6 py-4 transition-colors border-b border-border last:border-0",
                      activeTab === item.id
                        ? "bg-primary/5 text-primary"
                        : "hover:bg-secondary text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-6 py-4 text-destructive hover:bg-destructive/5 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              {activeTab === "orders" && (
                <div className="space-y-6 animate-slide-up">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    My Orders
                  </h2>
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-card rounded-2xl border border-border p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Placed on {order.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-sm font-medium",
                              order.status === "Delivered"
                                ? "bg-emerald/10 text-emerald"
                                : "bg-accent/10 text-accent"
                            )}
                          >
                            {order.status}
                          </span>
                          <span className="font-bold text-foreground">
                            ₹{order.total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        {order.items.map((item, index) => (
                          <img
                            key={`${order.id}-${index}`}
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link href={`/order-tracking/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4 mr-2" />
                            Track Order
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <RefreshCcw className="h-4 w-4 mr-2" />
                          Return
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="space-y-6 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      My Wishlist
                    </h2>
                    <Link
                      href="/wishlist"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Open Wishlist Page
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-28 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">
                            {item.name}
                          </h3>
                          <p className="font-bold text-foreground mt-2">
                            ₹{item.price.toLocaleString()}
                          </p>
                          <Button variant="gold" size="sm" className="mt-3">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="space-y-6 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Saved Addresses
                    </h2>
                    <Button variant="outline">+ Add Address</Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-card rounded-xl border-2 border-primary">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                          Default
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          Home
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        123, ABC Apartments, 4th Floor
                        <br />
                        Koramangala, Bangalore - 560034
                        <br />
                        +91 98765 43210
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-card rounded-xl border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          Office
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        456, XYZ Tech Park, 2nd Floor
                        <br />
                        Whitefield, Bangalore - 560066
                        <br />
                        +91 98765 43210
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "wallet" && (
                <div className="space-y-6 animate-slide-up">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Wallet & Offers
                  </h2>
                  <div className="bg-gradient-to-r from-primary to-maroon-dark rounded-2xl p-6 text-primary-foreground">
                    <p className="text-primary-foreground/70">Available Balance</p>
                    <p className="text-4xl font-bold mt-2">₹500</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-4">
                    <h3 className="font-semibold text-foreground mb-4">
                      Available Coupons
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div>
                          <p className="font-mono font-bold text-primary">
                            NEWUSER15
                          </p>
                          <p className="text-xs text-muted-foreground">
                            15% off on first order
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div>
                          <p className="font-mono font-bold text-primary">
                            FESTIVE60
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Up to 60% off on ethnic wear
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6 animate-slide-up">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Account Settings
                  </h2>
                  <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John Doe"
                        className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="john@example.com"
                        className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue="+91 98765 43210"
                        className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <Button variant="gold">Save Changes</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default AccountPageClient;
