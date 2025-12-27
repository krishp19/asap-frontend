"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Clock,
  CreditCard,
  Smartphone,
  Wallet,
  Check,
  Shield,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CheckoutPageClient = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
  });
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const deliverySlots = useMemo(
    () => [
      { id: "90min", label: "Express - 90 mins", time: "1:30 PM - 3:00 PM", fee: 29 },
      { id: "2-4hr", label: "Standard - 2-4 hrs", time: "3:00 PM - 5:00 PM", fee: 0 },
      { id: "evening", label: "Evening", time: "6:00 PM - 9:00 PM", fee: 0 },
    ],
    []
  );

  const paymentMethods = useMemo(
    () => [
      { id: "upi", label: "UPI", icon: Smartphone, desc: "GPay, PhonePe, Paytm" },
      { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
      { id: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay when delivered" },
    ],
    []
  );

  const sendOtp = () => {
    if (phone.length === 10) {
      setIsOtpSent(true);
    }
  };

  const verifyOtp = () => {
    if (otp.length === 6) {
      setStep(2);
    }
  };

  const saveAddress = () => {
    if (address.name && address.phone && address.pincode && address.address) {
      setStep(3);
    }
  };

  const selectSlot = (slotId: string) => {
    setSelectedSlot(slotId);
    setStep(4);
  };

  const placeOrder = () => {
    if (paymentMethod) {
      router.push("/order-tracking/ORD12345");
    }
  };

  const steps = [
    { number: 1, label: "Login" },
    { number: 2, label: "Address" },
    { number: 3, label: "Delivery" },
    { number: 4, label: "Payment" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-32 md:pb-16">
        <div className="bg-secondary/30 py-4">
          <div className="container-main">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/cart" className="hover:text-primary transition-colors">
                Cart
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Checkout</span>
            </nav>
          </div>
        </div>

        <div className="container-main py-8">
          <div className="flex items-center justify-center mb-12">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                      step >= s.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {step > s.number ? <Check className="h-5 w-5" /> : s.number}
                  </div>
                  <span
                    className={cn(
                      "text-xs mt-2 font-medium",
                      step >= s.number ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-16 md:w-24 h-1 mx-2 rounded transition-colors",
                      step > s.number ? "bg-primary" : "bg-secondary"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            {step === 1 && (
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-scale-in">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Login / Sign Up
                </h2>
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
                      Or continue as{" "}
                      <button
                        onClick={() => setStep(2)}
                        className="text-primary font-medium hover:underline"
                      >
                        Guest
                      </button>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 animate-slide-up">
                    <p className="text-sm text-muted-foreground">
                      OTP sent to +91 {phone}
                      <button
                        onClick={() => setIsOtpSent(false)}
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
                    <p className="text-center text-sm text-muted-foreground">
                      Didn&apos;t receive?{" "}
                      <button className="text-primary font-medium hover:underline">
                        Resend OTP
                      </button>
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-scale-in">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={address.phone}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                          })
                        }
                        className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        placeholder="6-digit PIN"
                        value={address.pincode}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                          })
                        }
                        className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="State"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address *
                    </label>
                    <textarea
                      placeholder="House no., Building, Street, Area"
                      value={address.address}
                      onChange={(e) => setAddress({ ...address, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Near landmark"
                      value={address.landmark}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button variant="gold" size="lg" className="w-full" onClick={saveAddress}>
                    Save & Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-scale-in">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-primary" />
                  Select Delivery Slot
                </h2>
                <div className="space-y-3">
                  {deliverySlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => selectSlot(slot.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all",
                        selectedSlot === slot.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedSlot === slot.id
                              ? "border-primary"
                              : "border-muted-foreground"
                          )}
                        >
                          {selectedSlot === slot.id && (
                            <div className="w-3 h-3 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-foreground">{slot.label}</p>
                          <p className="text-sm text-muted-foreground">{slot.time}</p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "font-semibold",
                          slot.fee === 0 ? "text-emerald" : "text-foreground"
                        )}
                      >
                        {slot.fee === 0 ? "FREE" : `₹${slot.fee}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-scale-in">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                  Payment Method
                </h2>

                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          paymentMethod === method.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        )}
                      >
                        <method.icon className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{method.label}</p>
                        <p className="text-sm text-muted-foreground">{method.desc}</p>
                      </div>
                      <div
                        className={cn(
                          "ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          paymentMethod === method.id
                            ? "border-primary"
                            : "border-muted-foreground"
                        )}
                      >
                        {paymentMethod === method.id && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-secondary/50 rounded-xl mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Order Total</span>
                    <span className="font-semibold">₹4,846</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald">
                    <Shield className="h-3 w-3" />
                    <span>100% Secure Payment</span>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={placeOrder}
                  disabled={!paymentMethod}
                >
                  {paymentMethod === "cod" ? "Place Order" : "Pay ₹4,846"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default CheckoutPageClient;
