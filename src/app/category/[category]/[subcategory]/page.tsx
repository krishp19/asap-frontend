import CategoryPageClient from "@/components/category/CategoryPageClient";

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;

  return <CategoryPageClient category={category} subcategory={subcategory} />;
}
