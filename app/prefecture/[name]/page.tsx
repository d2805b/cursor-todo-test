import PrefecturePageClient from './PrefecturePageClient';

export default async function PrefecturePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const prefectureName = decodeURIComponent(name);

  return <PrefecturePageClient prefectureName={prefectureName} />;
}