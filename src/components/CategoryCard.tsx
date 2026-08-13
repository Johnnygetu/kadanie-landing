import { useNavigate } from '@/lib/router';
import type { Category } from '@/types';
import * as Icons from 'lucide-react';

export default function CategoryCard({ category }: { category: Category }) {
  const navigate = useNavigate();
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon] ?? Icons.Sparkles;

  return (
    <button
      onClick={() => navigate(`/categories/${category.slug}`)}
      className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 text-left"
    >
      <img
        src={category.image_url}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-wine-950/85 via-wine-950/30 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-50/90 text-wine-700 mb-3 transition-transform group-hover:scale-110">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="font-serif text-2xl font-semibold text-cream-100">{category.name}</h3>
        <p className="mt-1 text-sm text-cream-200/80 line-clamp-2">{category.description}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cream-100/90 group-hover:gap-2 transition-all">
          Explore <Icons.ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}
