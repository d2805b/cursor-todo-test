import CategoryPageClient from './CategoryPageClient';

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);

  return <CategoryPageClient categoryName={categoryName} />;
}
