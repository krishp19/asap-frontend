import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import ProductDetailsClient from "@/components/products/ProductDetailsClient";
import { products } from "@/data/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((p) => p.id === id) || products[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductDetailsClient product={product} />
      <Footer />
      <MobileNav />
    </div>
  );
}
