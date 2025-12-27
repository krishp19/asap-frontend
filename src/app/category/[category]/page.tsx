import CategoryPageClient from "@/components/category/CategoryPageClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return <CategoryPageClient category={category} />;
}
