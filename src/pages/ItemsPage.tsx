import { useMemo, useState } from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAsync } from '@/lib/useAsync';
import type { Category, Item } from '@/types';
import ItemCard from '@/components/ItemCard';
import { Spinner, ErrorState, EmptyState } from '@/components/States';
import SectionHeading from '@/components/SectionHeading';

export default function ItemsPage() {
  const [cat, setCat] = useState<string>('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'new' | 'low' | 'high' | 'rating'>('new');

  const { data, error, loading } = useAsync(async () => {
    const [cats, items] = await Promise.all([
      supabase.from('categories').select('id,name,slug').order('name'),
      supabase.from('items').select('*, category:categories(slug,name)').order('created_at'),
    ]);
    if (cats.error) throw cats.error;
    if (items.error) throw items.error;
    return {
      categories: cats.data as Pick<Category, 'id' | 'name' | 'slug'>[],
      items: items.data as (Item & { category: { slug: string; name: string } | null })[],
    };
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    let list = data.items;
    if (cat !== 'all') list = list.filter((i) => i.category?.slug === cat);
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter(
        (i) => i.name.toLowerCase().includes(t) || i.description.toLowerCase().includes(t)
      );
    }
    list = [...list].sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    return list;
  }, [data, cat, q, sort]);

  return (
    <div className="pt-32 pb-10 container-px max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Shop the look"
        title="Decoration items"
        subtitle="Curated pieces for every celebration and every corner of your home."
        align="center"
      />

      {/* Toolbar */}
      <div className="mt-10 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-wine-900/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search items…"
            className="w-full rounded-full bg-cream-50 border border-wine-700/15 pl-11 pr-4 py-3 text-sm text-wine-900 placeholder:text-wine-900/40 focus:outline-none focus:ring-2 focus:ring-wine-700/30"
          />
        </div>
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-4 w-4 text-wine-900/50" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full bg-cream-50 border border-wine-700/15 px-4 py-3 text-sm font-medium text-wine-900 focus:outline-none focus:ring-2 focus:ring-wine-700/30"
          >
            <option value="new">Newest</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      {/* Category chips */}
      {data && (
        <div className="mt-5 flex flex-wrap gap-2 no-scrollbar overflow-x-auto pb-1">
          <Chip active={cat === 'all'} onClick={() => setCat('all')}>All</Chip>
          {data.categories.map((c) => (
            <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</Chip>
          ))}
        </div>
      )}

      <div className="mt-10">
        {loading ? (
          <Spinner />
        ) : error || !data ? (
          <ErrorState message={error ?? 'Could not load items.'} />
        ) : filtered.length === 0 ? (
          <EmptyState title="No items match your filters" hint="Try clearing the search or choosing another category." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((it) => (
              <ItemCard key={it.id} item={it} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? 'bg-wine-700 text-cream-100' : 'bg-cream-50 text-wine-900/70 hover:bg-cream-100 border border-wine-700/10'
      }`}
    >
      {children}
    </button>
  );
}
