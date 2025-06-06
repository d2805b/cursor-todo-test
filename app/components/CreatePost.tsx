'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/contexts/AuthContext';

// 都道府県のリスト
const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

// 募集カテゴリのリスト
const CATEGORIES = [
  'デザイン', 'プログラミング', 'マーケティング', 'ライティング', '翻訳', 
  'イラスト', '動画制作', '写真', '営業', '企画', 'コンサルティング', 
  'その他'
];

// 募集タイプのリスト
const TYPES = [
  '仕事仲間募集', '勉強仲間募集'
];

export default function CreatePost() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // フォームの状態
  const [formData, setFormData] = useState({
    prefecture: '',
    category: '',
    type: '',
    content: '',
  });

  // フォーム入力の変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('ログインが必要です');
      return;
    }
    
    // 必須項目の検証
    if (!formData.prefecture || !formData.category || !formData.type || !formData.content) {
      setError('すべての項目を入力してください');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: user.id,
            prefecture: formData.prefecture,
            category: formData.category,
            type: formData.type,
            content: formData.content,
          }
        ]);
      
      if (error) {
        throw error;
      }
      
      // 投稿一覧ページにリダイレクト
      router.push('/posts');
      router.refresh();
      } catch (err) {
      const message = err instanceof Error ? err.message : '投稿に失敗しました';
      setError(message);
      console.error('Error creating post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">新規投稿作成</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">都道府県 *</label>
          <select
            name="prefecture"
            value={formData.prefecture}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">選択してください</option>
            {PREFECTURES.map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">募集カテゴリ *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">選択してください</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">募集タイプ *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">選択してください</option>
            {TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">募集内容 *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            className="w-full p-2 border rounded"
            placeholder="募集内容を詳しく書いてください。"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {isSubmitting ? '投稿中...' : '投稿する'}
        </button>
      </form>
    </div>
  );
}