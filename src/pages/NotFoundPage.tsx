import { useNavigate } from '@/lib/router';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="pt-32 pb-20 container-px max-w-2xl mx-auto text-center">
      <p className="font-serif text-7xl font-semibold text-wine-700">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-wine-900">Page not found</h1>
      <p className="mt-3 text-wine-900/60">The page you're looking for doesn't exist or has moved.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-wine-700 px-6 py-3 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors active:scale-95"
      >
        <Home className="h-4 w-4" /> Back to home
      </button>
    </div>
  );
}
