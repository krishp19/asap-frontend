"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, Clock, Shield, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [pincode, setPincode] = useState("");
  const [isDeliverable, setIsDeliverable] = useState<boolean | null>(null);
  const router = useRouter();

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setIsDeliverable(true);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-maroon-dark to-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-main relative z-10 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20 animate-slide-up">
              <span className="animate-bounce-subtle">🚀</span>
              <span className="text-sm font-medium">
                Same-Day Delivery Available
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up stagger-1">
                Style Delivered
                <span className="block text-accent">Today.</span>
              </h1>
              <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-lg animate-slide-up stagger-2">
                Premium Fashion & Home Décor from local sellers, delivered to your
                doorstep within 90 minutes.
              </p>
            </div>

            <div className="space-y-3 animate-slide-up stagger-3">
              <p className="text-sm font-medium text-primary-foreground/70">
                Check delivery availability
              </p>
              <div className="flex gap-3">
                <div className="relative flex-1 max-w-xs">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <input
                    type="text"
                    placeholder="Enter PIN code"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setIsDeliverable(null);
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-primary-foreground text-foreground rounded-xl font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <Button
                  variant="gold"
                  size="xl"
                  onClick={checkDelivery}
                  disabled={pincode.length !== 6}
                >
                  Check
                </Button>
              </div>
              {isDeliverable !== null && (
                <p
                  className={`text-sm font-medium ${
                    isDeliverable ? "text-emerald-foreground" : "text-destructive"
                  } animate-scale-in`}
                >
                  {isDeliverable
                    ? "✓ Great! Same-day delivery available in your area"
                    : "✗ Sorry, we don't deliver to this area yet"}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 animate-slide-up stagger-4">
              <Button
                variant="gold"
                size="xl"
                onClick={() => router.push("/category/fashion")}
                className="group"
              >
                Shop Fashion
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                onClick={() => router.push("/category/home-decor")}
              >
                Shop Home Décor
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 animate-slide-up stagger-5">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Clock className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">90-min Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Truck className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Local Sellers</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Fashion & Home Décor"
                className="w-full rounded-3xl shadow-2xl animate-scale-in"
              />

              <div className="absolute -left-8 top-1/4 bg-card rounded-2xl shadow-large p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center">
                    <Truck className="h-6 w-6 text-emerald" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      On orders above ₹999
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-8 bottom-1/4 bg-card rounded-2xl shadow-large p-4 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Festive Offers</p>
                    <p className="text-xs text-muted-foreground">Up to 60% off</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 w-full h-full bg-accent/20 rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
