import CategoryPageClient from './CategoryPageClient';

export default function CategoryPage({ params }: { params: { name: string } }) {
  const categoryName = decodeURIComponent(params.name);
  
  return <CategoryPageClient categoryName={categoryName} />;
} 