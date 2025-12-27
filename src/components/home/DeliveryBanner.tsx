"use client";

import { Truck, Clock, Shield, CreditCard, Headphones } from "lucide-react";

const DeliveryBanner = () => {
  const features = [
    {
      icon: Clock,
      title: "90-Min Delivery",
      description: "Lightning fast delivery",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹999",
    },
    {
      icon: Shield,
      title: "Easy Returns",
      description: "7-day return policy",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're here to help",
    },
  ];

  return (
    <section className="py-8 bg-primary text-primary-foreground">
      <div className="container-main">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">{feature.title}</p>
                <p className="text-xs text-primary-foreground/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryBanner;
