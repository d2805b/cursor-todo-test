'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/contexts/AuthContext';

interface Profile {
  name: string;
  location: string;
  skills: string[];
}

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('users')
        .select('name, location, skills')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
    router.refresh();
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      {profile ? (
        <>
          <p className="mb-2"><strong>名前:</strong> {profile.name}</p>
          <p className="mb-2"><strong>所在地:</strong> {profile.location}</p>
          <p className="mb-2"><strong>スキル:</strong> {profile.skills.join(', ')}</p>
        </>
      ) : (
        <p>プロフィール情報が見つかりません。</p>
      )}
      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        ログアウト
      </button>
    </div>
  );
}

export default ProfilePage;
