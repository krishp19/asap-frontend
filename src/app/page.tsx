import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import TrendingSection from "@/components/home/TrendingSection";
import OffersSection from "@/components/home/OffersSection";
import DeliveryBanner from "@/components/home/DeliveryBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-20 md:pb-0">
        <HeroSection />
        <DeliveryBanner />
        <CategorySection />
        <TrendingSection
          title="Trending Today"
          subtitle="Most loved products this week"
          limit={4}
          viewAllLink="/category/all?sort=trending"
        />
        <OffersSection />
        <TrendingSection
          title="Festive Picks"
          subtitle="Celebrate in style with our curated festive collection"
          filterFn={(p) =>
            p.badge?.includes("Festive") ||
            p.badge?.includes("Diwali") ||
            p.subcategory === "festive"
          }
          limit={4}
          viewAllLink="/category/all?filter=festive"
        />
        <TrendingSection
          title="New Arrivals"
          subtitle="Fresh styles just dropped"
          filterFn={(p) => p.badge === "New Arrival" || p.badge === "New"}
          limit={4}
          viewAllLink="/category/all?sort=new"
        />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
