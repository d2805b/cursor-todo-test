'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  // モバイルメニューの外側をクリックしたら閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // ページが変わったらメニューを閉じる
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-blue-600">
            フリーランスマッチング
          </Link>
          
          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={`px-3 py-2 rounded-md ${pathname === '/' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              ホーム
            </Link>
            <Link href="/posts" className={`px-3 py-2 rounded-md ${pathname === '/posts' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              投稿一覧
            </Link>
            
            {user ? (
              <>
                <Link href="/posts/new" className={`px-3 py-2 rounded-md ${pathname === '/posts/new' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  新規投稿
                </Link>
                <Link href="/profile" className={`px-3 py-2 rounded-md ${pathname === '/profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  プロフィール
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="px-3 py-2 text-red-600 hover:text-red-800 rounded-md"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link href="/auth" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors">
                ログイン / 新規登録
              </Link>
            )}
          </div>
          
          {/* モバイルメニューボタン */}
          <button 
            id="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-2 pb-4">
            <Link href="/" className={`block px-4 py-2 rounded-md ${pathname === '/' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              ホーム
            </Link>
            <Link href="/posts" className={`block px-4 py-2 rounded-md ${pathname === '/posts' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              投稿一覧
            </Link>
            
            {user ? (
              <>
                <Link href="/posts/new" className={`block px-4 py-2 rounded-md ${pathname === '/posts/new' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  新規投稿
                </Link>
                <Link href="/profile" className={`block px-4 py-2 rounded-md ${pathname === '/profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  プロフィール
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link href="/auth" className="block px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md mt-2 mx-2">
                ログイン / 新規登録
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}