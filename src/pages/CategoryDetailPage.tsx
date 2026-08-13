import { useMemo, useState } from 'react';
import { ArrowLeft, Package, Wand2 } from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import { MOCK_CATEGORIES, MOCK_ITEMS, MOCK_SERVICES } from '@/lib/mockData';
import ItemCard from '@/components/ItemCard';
import ServiceCard from '@/components/ServiceCard';
import { Spinner, ErrorState, EmptyState } from '@/components/States';

export default function CategoryDetailPage({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'items' | 'services'>('items');

  const { data, error, loading } = useAsync(async () => {
    const cat = MOCK_CATEGORIES.find((c) => c.slug === slug);
    if (!cat) throw new Error('Category not found');

    const items = MOCK_ITEMS.filter((i) => i.category_id === cat.id || i.category?.slug === cat.slug);
    const services = MOCK_SERVICES.filter((s) => s.category_id === cat.id || s.category?.slug === cat.slug);

    return {
      category: cat,
      items,
      services,
    };
  }, [slug]);

  const list = useMemo(
    () => (data ? (tab === 'items' ? data.items : data.services) : []),
    [data, tab]
  );

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error || !data) return <div className="pt-32"><ErrorState message={error ?? 'Could not load this category.'} /></div>;

  const { category, items, services } = data;

  return (
    <div className="pt-20">
      {/* Hero banner */}
      <section className="relative h-[44vh] min-h-[320px] overflow-hidden">
        <img src={category.image_url} alt={category.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-950/85 via-wine-950/55 to-wine-950/30" />
        <div className="relative h-full container-px max-w-7xl mx-auto flex flex-col justify-end pb-10">
          <button
            onClick={() => navigate('/categories')}
            className="inline-flex w-fit items-center gap-2 text-sm text-cream-200/80 hover:text-cream-100 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> All categories
          </button>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-cream-100">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-cream-200/85 leading-relaxed">{category.description}</p>
        </div>
      </section>

      {/* Tabs + listings */}
      <section className="container-px max-w-7xl mx-auto py-12">
        <div className="flex items-center gap-2 border-b border-wine-700/15 mb-8">
          <TabButton active={tab === 'items'} onClick={() => setTab('items')} icon={Package} label={`Items (${items.length})`} />
          <TabButton active={tab === 'services'} onClick={() => setTab('services')} icon={Wand2} label={`Services (${services.length})`} />
        </div>

        {list.length === 0 ? (
          <EmptyState
            title={`No ${tab} in this category yet`}
            hint="Check back soon — we add new pieces every week."
          />
        ) : tab === 'items' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((it) => (
              <ItemCard key={it.id} item={it} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function TabButton({
  active, onClick, icon: Icon, label,
}: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
        active ? 'border-wine-700 text-wine-700' : 'border-transparent text-wine-900/60 hover:text-wine-700'
      }`}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}
