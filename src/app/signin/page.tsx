"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Smartphone, Check } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const sendOtp = () => {
    if (phone.length === 10) {
      setIsOtpSent(true);
    }
  };

  const verifyOtp = () => {
    if (otp.length === 6) {
      setIsVerified(true);
      setTimeout(() => setIsVerified(false), 2000);
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
              <span className="text-foreground">Sign In</span>
            </nav>
          </div>
        </div>

        <div className="container-main py-10">
          <div className="max-w-lg mx-auto bg-card rounded-2xl border border-border p-6 md:p-8 animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Login / Sign Up
                </h1>
                <p className="text-sm text-muted-foreground">
                  Continue with OTP verification
                </p>
              </div>
            </div>

            {!isOtpSent ? (
              <div className="space-y-4">
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
                      placeholder="Enter 10-digit mobile number"
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
                  onClick={sendOtp}
                  disabled={phone.length !== 10}
                >
                  Send OTP
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary font-medium hover:underline">
                    Create one
                  </Link>
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-slide-up">
                <p className="text-sm text-muted-foreground">
                  OTP sent to +91 {phone}{" "}
                  <button
                    onClick={() => {
                      setIsOtpSent(false);
                      setOtp("");
                    }}
                    className="text-primary ml-2 hover:underline"
                  >
                    Change
                  </button>
                </p>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="w-full px-4 py-3 bg-secondary rounded-lg text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={verifyOtp}
                  disabled={otp.length !== 6}
                >
                  Verify & Continue
                </Button>

                {isVerified && (
                  <div className="flex items-center gap-2 text-emerald font-medium">
                    <Check className="h-4 w-4" />
                    Signed in (UI only)
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
