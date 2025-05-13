import Link from 'next/link';
import JapanMap from './components/JapanMap';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">全国フリーランス・勉強仲間マッチング</h1>
        <p className="text-xl text-gray-600 mb-8">
          仕事仲間や勉強仲間を見つけて、あなたのスキルを高めましょう
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/auth" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ログイン / 新規登録
          </Link>
          <Link 
            href="/posts" 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            投稿を見る
          </Link>
        </div>
      </section>
      
      <JapanMap />
      
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">カテゴリから探す</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['デザイン', 'プログラミング', 'マーケティング', 'ライティング', '翻訳', 'イラスト', '動画制作', '写真'].map(category => (
            <Link 
              key={category}
              href={`/category/${encodeURIComponent(category)}`}
              className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}