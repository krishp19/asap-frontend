"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, UserPlus, Check } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [created, setCreated] = useState(false);

  const createAccount = () => {
    if (name && email && phone.length === 10) {
      setCreated(true);
      setTimeout(() => setCreated(false), 2000);
    }
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
              <span className="text-foreground">Sign Up</span>
            </nav>
          </div>
        </div>

        <div className="container-main py-10">
          <div className="max-w-lg mx-auto bg-card rounded-2xl border border-border p-6 md:p-8 animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Create Account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Join ASAP for faster checkout and offers
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mobile Number
                </label>
                <div className="flex gap-3">
                  <span className="flex items-center px-4 bg-secondary rounded-lg text-muted-foreground">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    className="flex-1 px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <Button
                variant="gold"
                size="lg"
                className="w-full"
                onClick={createAccount}
                disabled={!name || !email || phone.length !== 10}
              >
                Create Account
              </Button>

              {created && (
                <div className="flex items-center gap-2 text-emerald font-medium animate-slide-up">
                  <Check className="h-4 w-4" />
                  Account created (UI only)
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/signin" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
