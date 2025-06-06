'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    setIsLoading(false);
    
    if (error) {
      setError(error.message);
    } else {
      alert('サインアップが完了しました！メールを確認してください。');
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    setIsLoading(false);
    
    if (error) {
      setError(error.message);
    } else {
      router.push('/');
      router.refresh(); // セッション変更を反映
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">ログイン / 新規登録</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">メールアドレス</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">パスワード</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {isLoading ? '読み込み中...' : 'ログイン'}
        </button>
        
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          {isLoading ? '読み込み中...' : '新規登録'}
        </button>
      </div>
    </div>
  );
}