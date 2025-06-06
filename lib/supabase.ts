import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase クライアントを作成
const clientUrl: string = supabaseUrl ?? 'http://localhost';
const clientKey: string = supabaseAnonKey ?? 'public-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase環境変数が設定されていません。開発用のダミー値を使用します。');
}

export const supabase = createClient(clientUrl, clientKey);
