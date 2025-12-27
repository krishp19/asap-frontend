"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  MapPin,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const router = useRouter();

  const categories = [
    {
      name: "Fashion",
      subcategories: [
        "Men",
        "Women",
        "Kids",
        "Ethnic Wear",
        "Casual",
        "Footwear",
        "Accessories",
      ],
    },
    {
      name: "Home Décor",
      subcategories: [
        "Wall Art",
        "Lamps",
        "Cushions",
        "Rugs",
        "Furniture",
        "Kitchen",
        "Festive Décor",
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container-main flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="animate-bounce-subtle">🚀</span>
            <span className="font-medium">Same-Day Delivery in 90 mins</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>🇮🇳 Local Sellers</span>
            <span>•</span>
            <span>Free Returns</span>
          </div>
        </div>
      </div>

      <div className="container-main py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-primary">
              ASAP<span className="text-accent">.</span>
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <button className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors py-2">
                  {category.name}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-card rounded-xl shadow-large border border-border p-4 min-w-[200px] animate-scale-in">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`/category/${category.name
                          .toLowerCase()
                          .replace(" ", "-")}/${sub
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-foreground/80 hover:text-foreground"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/offers"
              className="font-medium text-accent hover:text-accent/80 transition-colors"
            >
              Offers
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
            <MapPin className="h-4 w-4 text-emerald" />
            <input
              type="text"
              placeholder="Enter PIN"
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-20 bg-transparent text-sm font-medium placeholder:text-muted-foreground focus:outline-none"
            />
            {pincode.length === 6 && (
              <span className="text-xs text-emerald font-medium">
                ✓ Delivery Available
              </span>
            )}
          </div>

          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for products, brands..."
                className="w-full pl-10 pr-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/account")}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div className="mt-4 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="w-full pl-10 pr-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[145px] bg-background z-40 transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container-main py-6 space-y-6">
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
            <MapPin className="h-5 w-5 text-emerald" />
            <input
              type="text"
              placeholder="Enter your PIN code"
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="flex-1 bg-transparent font-medium placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          {categories.map((category) => (
            <div key={category.name} className="space-y-3">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub}
                    href={`/category/${category.name
                      .toLowerCase()
                      .replace(" ", "-")}/${sub
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            href="/offers"
            className="block w-full py-3 bg-accent/10 text-accent text-center font-semibold rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            🎉 View All Offers
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
