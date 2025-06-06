'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// 投稿の型定義
type Post = {
  id: number;
  created_at: string;
  user_id: string;
  prefecture: string;
  category: string;
  type: string;
  content: string;
  users?: {
    name: string;
  } | null;
};

export default function CategoryPageClient({ categoryName }: { categoryName: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select('*, users(name)')
          .eq('category', categoryName)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : '投稿の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [categoryName]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{categoryName}カテゴリーの投稿</h1>
      {posts.length === 0 ? (
        <p>投稿がありません</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.content}</p>
              <p>投稿者: {post.users?.name || '不明'}</p>
              <p>都道府県: {post.prefecture}</p>
              <p>タイプ: {post.type}</p>
              <p>投稿日時: {new Date(post.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 