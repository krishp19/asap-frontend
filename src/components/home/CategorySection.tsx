"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { categories } from "@/data/products";

const CategorySection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of fashion and home décor, all available
            for same-day delivery
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-background mb-2">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.subcategories.slice(0, 4).map((sub) => (
                    <span
                      key={sub.id}
                      className="px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-sm text-background/90"
                    >
                      {sub.name}
                    </span>
                  ))}
                  {category.subcategories.length > 4 && (
                    <span className="px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-sm text-background/90">
                      +{category.subcategories.length - 4} more
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                  <span>Explore {category.name}</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
