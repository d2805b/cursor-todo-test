import PrefecturePageClient from './PrefecturePageClient';

export default function PrefecturePage({ params }: { params: { name: string } }) {
  const prefectureName = decodeURIComponent(params.name);
  
  return <PrefecturePageClient prefectureName={prefectureName} />;
}