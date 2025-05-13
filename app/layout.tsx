import './globals.css';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import Navigation from './components/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <footer className="bg-white border-t py-6 text-center text-gray-600">
            <p>© 2025 フリーランスマッチング All rights reserved.</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}