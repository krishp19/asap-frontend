"use client";

import { useState } from "react";
import { Copy, Check, Clock, ArrowRight } from "lucide-react";

import { offers } from "@/data/products";
import { Button } from "@/components/ui/button";

const OffersSection = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <span className="animate-pulse-soft">🎉</span>
            Limited Time Offers
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Flash Sales & Deals
          </h2>
          <p className="text-muted-foreground">
            Grab these exclusive offers before they&apos;re gone!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="group relative overflow-hidden rounded-2xl bg-card card-hover animate-slide-up"
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {offer.title}
                </h3>
                <p className="text-muted-foreground mb-4">{offer.description}</p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 px-4 py-2 bg-secondary rounded-lg border-2 border-dashed border-primary/30">
                    <span className="font-mono font-bold text-primary">
                      {offer.code}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyCode(offer.code)}
                    className="flex-shrink-0"
                  >
                    {copiedCode === offer.code ? (
                      <Check className="h-4 w-4 text-emerald" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Valid till {offer.validTill}</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Shop Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
