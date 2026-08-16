import { useState } from 'react';
import { ArrowLeft, Star, Check, ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import { MOCK_ITEMS } from '@/lib/mockData';
import { formatPrice } from '@/lib/format';
import { Spinner, ErrorState } from '@/components/States';

export default function ItemDetailPage({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);

  const { data, error, loading } = useAsync(async () => {
    const item = MOCK_ITEMS.find((it) => it.slug === slug);
    if (!item) throw new Error('Item not found');
    return item;
  }, [slug]);

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error || !data) return <div className="pt-32"><ErrorState message={error ?? 'Could not load this item.'} /></div>;

  const item = data;
  const gallery = item.gallery.length ? item.gallery : [item.image_url];

  return (
    <div className="pt-28 pb-10 container-px max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/items')}
        className="inline-flex items-center gap-2 text-sm text-wine-900/60 hover:text-wine-700 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to items
      </button>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
            <img src={gallery[active]} alt={item.name} className="h-full w-full object-cover animate-fade-in" key={active} />
            {item.tag && (
              <span className="absolute top-4 left-4 rounded-full bg-wine-700 px-3 py-1 text-xs font-semibold text-cream-100 shadow">
                {item.tag}
              </span>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                    active === i ? 'border-wine-700' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 text-sm text-wine-600">
            <Star className="h-4 w-4 fill-wine-600" />
            <span className="font-semibold">{item.rating.toFixed(1)}</span>
            <span className="text-wine-900/50">· {item.reviews_count} reviews</span>
          </div>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-wine-900">{item.name}</h1>
          <p className="mt-4 text-wine-900/70 leading-relaxed">{item.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-4xl font-semibold text-wine-700">{formatPrice(item.price)}</span>
            <span className="text-sm text-wine-900/50">per unit</span>
          </div>

          {item.features.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {item.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-wine-900/80">
                  <Check className="h-4 w-4 mt-0.5 text-wine-600 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          )}

          {/* Quantity + add */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-wine-700/20 bg-cream-50 overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-wine-700 hover:bg-wine-700/10 transition-colors">−</button>
              <span className="px-4 py-3 font-semibold text-wine-900 min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-wine-700 hover:bg-wine-700/10 transition-colors">+</button>
            </div>
            <button
              onClick={() => setAdded(true)}
              className="flex-1 min-w-[12rem] inline-flex items-center justify-center gap-2 rounded-full bg-wine-700 px-7 py-3.5 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              {added ? 'Added to cart' : 'Add to cart'}
            </button>
          </div>

          {/* Trust row */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, t: 'Free delivery', s: 'Over 750 ETB' },
              { icon: ShieldCheck, t: 'Quality assured', s: 'Hand-checked' },
              { icon: RefreshCw, t: 'Easy returns', s: '14 days' },
            ].map((r) => (
              <div key={r.t} className="rounded-2xl bg-cream-50 p-4 text-center">
                <r.icon className="h-5 w-5 mx-auto text-wine-700" />
                <p className="mt-2 text-xs font-semibold text-wine-900">{r.t}</p>
                <p className="text-xs text-wine-900/50">{r.s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
