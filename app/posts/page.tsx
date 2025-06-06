'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import withAuth from '@/lib/auth/withAuth';

// 投稿の型定義
// 投稿の型定義
type Post = {
  id: number;
  created_at: string;
  user_id: string;
  prefecture: string;
  category: string;
  type: string;
  content: string;
  // ユーザー情報（Join用） - ここを修正
  users?: {
    name: string;
  } | null; // オブジェクトまたはnullとして定義
};

function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      try {
        // usersテーブルとjoinして投稿とユーザー名を同時に取得
        const { data, error } = await supabase
          .from('posts')
          .select(`
            id, 
            created_at, 
            user_id, 
            prefecture, 
            category, 
            type, 
            content,
            users (
              name
            )
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // データの形式を修正して型に合わせる
        const formattedData = data?.map(post => ({
          ...post,
          users: post.users && Array.isArray(post.users) ? post.users[0] : post.users
        })) || [];
        
        setPosts(formattedData);
      } catch (err) {
        const message = err instanceof Error ? err.message : '投稿の取得に失敗しました';
        setError(message);
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-4xl mx-auto mt-10">
        <p>エラーが発生しました: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">投稿一覧</h1>
        <Link href="/posts/new" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          新規投稿
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">投稿がありません。最初の投稿を作成しましょう！</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-6 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{post.category}</h2>
                  <div className="text-sm text-gray-500">
                    投稿者: {post.users?.name || '不明'} • {formatDate(post.created_at)}
                  </div>
                </div>
                <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {post.prefecture}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{post.content}</p>
              
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {post.type}
                </span>
                
                <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                  詳細を見る
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(PostsPage);