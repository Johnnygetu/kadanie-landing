import { useNavigate } from '@/lib/router';
import type { Category } from '@/types';
import * as Icons from 'lucide-react';

export default function CategoryCard({ category, variant = 'icon' }: { category: Category; variant?: 'icon' | 'image' }) {
  const navigate = useNavigate();
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon] ?? Icons.Sparkles;

  if (variant === 'image') {
    return (
      <button
        onClick={() => navigate(`/categories/${category.slug}`)}
        className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 text-left"
      >
        <img
          src={category.image_url}
          alt={category.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-950/90 via-wine-950/40 to-transparent" />
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-50/90 text-wine-700 mb-2 transition-transform group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="font-serif text-lg font-semibold text-cream-100 leading-snug">{category.name}</h3>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cream-100/90 group-hover:gap-2 transition-all">
            Explore <Icons.ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(`/categories/${category.slug}`)}
      className="group flex flex-col items-center justify-center p-4 text-center bg-white border border-wine-700/10 rounded-xl shadow-sm hover:shadow-soft hover:border-wine-700/30 transition-all duration-300 hover:-translate-y-1"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-wine-700 mb-2.5 transition-transform group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-serif text-xs sm:text-sm font-semibold text-wine-900 leading-tight">{category.name}</h3>
    </button>
  );
}
