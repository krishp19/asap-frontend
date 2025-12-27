import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProductCard from "@/components/products/ProductCard";
import { products, type Product } from "@/data/products";

interface TrendingSectionProps {
  title: string;
  subtitle?: string;
  filterFn?: (product: Product) => boolean;
  limit?: number;
  viewAllLink?: string;
}

const TrendingSection = ({
  title,
  subtitle,
  filterFn,
  limit = 4,
  viewAllLink = "/category/all",
}: TrendingSectionProps) => {
  const filteredProducts = filterFn
    ? products.filter(filterFn).slice(0, limit)
    : products.slice(0, limit);

  return (
    <section className="py-16 bg-background">
      <div className="container-main">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          <Link
            href={viewAllLink}
            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
          >
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up opacity-0"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href={viewAllLink}
            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View All Products
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
