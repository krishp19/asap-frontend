"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, ChevronDown, Grid3X3, LayoutGrid, Clock } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";

type GridCols = 2 | 3 | 4;

interface CategoryPageClientProps {
  category?: string;
  subcategory?: string;
}

const CategoryPageClient = ({ category, subcategory }: CategoryPageClientProps) => {
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [deliverToday, setDeliverToday] = useState(false);
  const [gridCols, setGridCols] = useState<GridCols>(3);

  const currentCategory = useMemo(
    () => categories.find((c) => c.id === category),
    [category]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (category && category !== "all" && p.category !== category) return false;
      if (subcategory && p.subcategory !== subcategory) return false;
      if (deliverToday && p.deliveryTime !== "90 mins") return false;
      return true;
    });
  }, [category, subcategory, deliverToday]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "new":
          return a.badge === "New Arrival" ? -1 : 1;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const priceRanges = [
    { label: "Under ₹1,000", min: 0, max: 1000 },
    { label: "₹1,000 - ₹3,000", min: 1000, max: 3000 },
    { label: "₹3,000 - ₹5,000", min: 3000, max: 5000 },
    { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
    { label: "Above ₹10,000", min: 10000, max: Infinity },
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
              <span>/</span>
              {currentCategory ? (
                <>
                  <Link
                    href={`/category/${category}`}
                    className="hover:text-primary transition-colors capitalize"
                  >
                    {currentCategory.name}
                  </Link>
                  {subcategory && (
                    <>
                      <span>/</span>
                      <span className="text-foreground capitalize">
                        {subcategory.replace("-", " ")}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-foreground">All Products</span>
              )}
            </nav>
          </div>
        </div>

        <div className="container-main py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground capitalize">
                {subcategory?.replace("-", " ") ||
                  currentCategory?.name ||
                  "All Products"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {sortedProducts.length} products available for same-day delivery
              </p>
            </div>

            <button
              onClick={() => setDeliverToday(!deliverToday)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all",
                deliverToday
                  ? "border-emerald bg-emerald/10 text-emerald"
                  : "border-border text-muted-foreground hover:border-emerald hover:text-emerald"
              )}
            >
              <Clock className="h-4 w-4" />
              <span className="font-medium">Deliver Today</span>
              {deliverToday && <span className="text-xs">✓</span>}
            </button>
          </div>
        </div>

        <div className="container-main pb-16">
          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {currentCategory && (
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <h3 className="font-semibold text-foreground mb-3">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {currentCategory.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${category}/${sub.id}`}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
                            subcategory === sub.id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-secondary"
                          )}
                        >
                          <span>{sub.name}</span>
                          <span className="text-xs opacity-70">{sub.count}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-card rounded-xl p-4 border border-border">
                  <h3 className="font-semibold text-foreground mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range.label}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl p-4 border border-border">
                  <h3 className="font-semibold text-foreground mb-3">
                    Customer Rating
                  </h3>
                  <div className="space-y-2">
                    {[4, 3, 2].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {rating}★ & above
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none px-4 py-2 pr-10 bg-secondary rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                      <option value="new">New Arrivals</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setGridCols(2)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      gridCols === 2
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      gridCols === 3
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      gridCols === 4
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                className={cn(
                  "grid gap-4 md:gap-6",
                  gridCols === 2 && "grid-cols-2",
                  gridCols === 3 && "grid-cols-2 md:grid-cols-3",
                  gridCols === 4 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                )}
              >
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-slide-up opacity-0"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No products found</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setDeliverToday(false)}
                  >
                    Clear Filters
                  </Button>
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

export default CategoryPageClient;
