'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 都道府県の配列（地方ごとにグループ化）
const prefectures = {
  hokkaido: ['北海道'],
  tohoku: ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  kanto: ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'],
  chubu: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
  kinki: ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  chugoku: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  shikoku: ['徳島県', '香川県', '愛媛県', '高知県'],
  kyushu: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
};

// 都道府県と対応するSVGのIDのマッピング
const prefectureIdMap: { [key: string]: string } = {
  '北海道': 'hokkaido',
  '青森県': 'aomori',
  '岩手県': 'iwate',
  '宮城県': 'miyagi',
  '秋田県': 'akita',
  '山形県': 'yamagata',
  '福島県': 'fukushima',
  '茨城県': 'ibaraki',
  '栃木県': 'tochigi',
  '群馬県': 'gunma',
  '埼玉県': 'saitama',
  '千葉県': 'chiba',
  '東京都': 'tokyo',
  '神奈川県': 'kanagawa',
  '新潟県': 'niigata',
  '富山県': 'toyama',
  '石川県': 'ishikawa',
  '福井県': 'fukui',
  '山梨県': 'yamanashi',
  '長野県': 'nagano',
  '岐阜県': 'gifu',
  '静岡県': 'shizuoka',
  '愛知県': 'aichi',
  '三重県': 'mie',
  '滋賀県': 'shiga',
  '京都府': 'kyoto',
  '大阪府': 'osaka',
  '兵庫県': 'hyogo',
  '奈良県': 'nara',
  '和歌山県': 'wakayama',
  '鳥取県': 'tottori',
  '島根県': 'shimane',
  '岡山県': 'okayama',
  '広島県': 'hiroshima',
  '山口県': 'yamaguchi',
  '徳島県': 'tokushima',
  '香川県': 'kagawa',
  '愛媛県': 'ehime',
  '高知県': 'kochi',
  '福岡県': 'fukuoka',
  '佐賀県': 'saga',
  '長崎県': 'nagasaki',
  '熊本県': 'kumamoto',
  '大分県': 'oita',
  '宮崎県': 'miyazaki',
  '鹿児島県': 'kagoshima',
  '沖縄県': 'okinawa',
};

export default function JapanMap() {
  const router = useRouter();
  const [hoveredPrefecture, setHoveredPrefecture] = useState<string | null>(null);

  const handlePrefectureClick = (prefecture: string) => {
    // 都道府県名のエンコード（URLに含めるため）
    const encodedPrefecture = encodeURIComponent(prefecture);
    router.push(`/prefecture/${encodedPrefecture}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">地域から探す</h2>

      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        {/* 日本地図 */}
        <div className="w-full md:w-1/2 relative mb-8 md:mb-0">
          <div className="relative" style={{ width: '100%', height: '500px' }}>
            <Image
              src="/images/japan-map.svg"
              alt="日本地図"
              layout="fill"
              objectFit="contain"
              className="pointer-events-none"
            />
            
            {/* 都道府県のクリック用オーバーレイ（実際のプロダクトでは、SVG内の各パスに直接イベントを設定するのがより良い方法です） */}
            <div className="absolute inset-0">
              {/* ここにクリック用の透明なオーバーレイを配置するためのコードが入りますが、
                  今回は単純化のため省略しています。完全な実装ではSVGの各パスにイベントを設定します */}
            </div>
          </div>
        </div>

        {/* 都道府県リスト */}
        <div className="w-full md:w-1/2 grid grid-cols-1 gap-4">
          {Object.entries(prefectures).map(([region, prefsList]) => (
            <div key={region} className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700 border-b pb-1">
                {region === 'hokkaido' ? '北海道' :
                 region === 'tohoku' ? '東北' :
                 region === 'kanto' ? '関東' :
                 region === 'chubu' ? '中部' :
                 region === 'kinki' ? '近畿' :
                 region === 'chugoku' ? '中国' :
                 region === 'shikoku' ? '四国' :
                 region === 'kyushu' ? '九州・沖縄' : region}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {prefsList.map(prefecture => (
                  <button
                    key={prefecture}
                    className="text-sm px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded text-blue-700 transition-colors"
                    onClick={() => handlePrefectureClick(prefecture)}
                    onMouseEnter={() => setHoveredPrefecture(prefecture)}
                    onMouseLeave={() => setHoveredPrefecture(null)}
                  >
                    {prefecture}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}