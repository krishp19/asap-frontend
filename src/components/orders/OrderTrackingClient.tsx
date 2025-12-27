"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  User,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderTrackingClientProps {
  orderId?: string;
}

const OrderTrackingClient = ({ orderId }: OrderTrackingClientProps) => {
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const trackingSteps = useMemo(
    () => [
      { id: 1, label: "Order Confirmed", time: "12:30 PM", icon: CheckCircle2 },
      { id: 2, label: "Preparing Order", time: "12:45 PM", icon: Package },
      { id: 3, label: "Out for Delivery", time: "1:15 PM", icon: Truck },
      { id: 4, label: "Delivered", time: "Expected 2:00 PM", icon: CheckCircle2 },
    ],
    []
  );

  const rider = {
    name: "Rahul Kumar",
    phone: "+91 98765 43210",
    rating: 4.8,
  };

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
              <span className="text-foreground">Track Order</span>
            </nav>
          </div>
        </div>

        <div className="container-main py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-scale-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    #{orderId || "ORD12345"}
                  </h1>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald/10 rounded-full">
                  <div className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
                  <span className="font-medium text-emerald">Live Tracking</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-maroon-dark rounded-2xl p-6 mb-6 text-primary-foreground animate-slide-up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/70 text-sm">Estimated Arrival</p>
                  <p className="text-3xl font-bold mt-1">2:00 PM - 2:30 PM</p>
                  <p className="text-primary-foreground/80 mt-2">Today, December 18</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                    <Clock className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-card rounded-2xl border border-border p-6 mb-6 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Order Status
              </h2>
              <div className="space-y-0">
                {trackingSteps.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                          currentStep >= step.id
                            ? "bg-emerald text-white"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={cn(
                            "w-0.5 h-12 transition-colors",
                            currentStep > step.id ? "bg-emerald" : "bg-border"
                          )}
                        />
                      )}
                    </div>

                    <div className="flex-1 pb-8">
                      <p
                        className={cn(
                          "font-semibold",
                          currentStep >= step.id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.time}</p>
                      {currentStep === step.id && step.id === 3 && (
                        <p className="text-sm text-emerald mt-1 animate-pulse-soft">
                          Your order is on the way!
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {currentStep >= 3 && (
              <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-scale-in">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Delivery Partner
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
                      <User className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{rider.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span className="text-accent">★</span>
                        <span>{rider.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div
              className="bg-card rounded-2xl border border-border p-6 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Delivery Address
              </h2>
              <div className="text-muted-foreground">
                <p className="font-medium text-foreground">Home</p>
                <p>123, ABC Apartments, 4th Floor</p>
                <p>Koramangala, Bangalore - 560034</p>
                <p className="mt-2">Phone: +91 98765 43210</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Need help with your order?</p>
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default OrderTrackingClient;
