'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// Supabaseのusersテーブルの型を定義
type User = {
  id: string;
  name: string;
  location: string;
  skills: string[];
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); // 初期値の型を明示的に指定

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data as User[]); // 型アサーションを追加
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>Location: {user.location}</p>
            <p>Skills: {user.skills.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
