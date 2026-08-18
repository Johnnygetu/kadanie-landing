import { useState } from 'react';
import { ArrowLeft, Check, Phone, MessageCircle } from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import { MOCK_ITEMS } from '@/lib/mockData';
import { formatPrice } from '@/lib/format';
import { Spinner, ErrorState } from '@/components/States';

export default function ItemDetailPage({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);

  const { data: item, error, loading } = useAsync(async () => {
    const it = MOCK_ITEMS.find((i) => i.slug === slug);
    if (!it) throw new Error('Item not found');
    return it;
  }, [slug]);

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error || !item) return <div className="pt-32"><ErrorState message={error ?? 'Could not load this item.'} /></div>;

  const gallery = item.gallery.length ? item.gallery : [item.image_url];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container-px max-w-6xl mx-auto">
        
        {/* Top Navigation */}
        <button
          onClick={() => navigate('/items')}
          className="inline-flex items-center gap-2 text-sm font-medium text-wine-900/60 hover:text-wine-700 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Items
        </button>

        {/* Page Header */}
        <div className="mb-8">
          {item.tag && (
            <div className="mb-3">
              <span className="rounded-full bg-wine-50 text-wine-700 px-3 py-1 text-sm font-semibold border border-wine-100">
                {item.tag}
              </span>
            </div>
          )}
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-wine-900 tracking-tight leading-tight">
            {item.name}
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Visuals & Details */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
            
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden shadow-sm border border-stone-100 bg-stone-50">
                <img 
                  src={gallery[activeImg]} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-opacity duration-300" 
                  key={activeImg} 
                />
              </div>
              
              {gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative h-20 w-24 sm:h-24 sm:w-32 rounded-xl overflow-hidden shrink-0 transition-all ${
                        activeImg === i ? 'ring-2 ring-wine-700 ring-offset-2' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={g} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <section>
              <h2 className="text-xl font-serif font-semibold text-wine-900 mb-4">About this item</h2>
              <p className="text-base text-wine-900/70 leading-relaxed max-w-3xl">
                {item.description}
              </p>
            </section>

            {/* Features */}
            {item.features && item.features.length > 0 && (
              <section>
                <h2 className="text-xl font-serif font-semibold text-wine-900 mb-4">Product details</h2>
                <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                  {item.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-wine-900/80">
                      <div className="mt-0.5 rounded-full bg-stone-100 p-1 shrink-0 text-wine-700">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Purchase / Action Card */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-card">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-serif text-4xl font-bold text-wine-900">{formatPrice(item.price)}</span>
              </div>
              <p className="text-sm text-wine-900/50 mb-8">per unit</p>

              <div className="flex flex-col gap-3">
                <button 
                  className="w-full rounded-full bg-wine-700 px-6 py-4 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    if (item.seller?.phone_number) {
                      window.location.href = `tel:${item.seller.phone_number.replace(/\s+/g, '')}`;
                    }
                  }}
                >
                  <Phone className="h-4 w-4" /> 
                  Call to Order
                </button>
                <button 
                  className="w-full rounded-full bg-white border border-stone-200 px-6 py-4 text-sm font-semibold text-wine-900 shadow-sm hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    if (item.seller?.email) {
                      window.location.href = `mailto:${item.seller.email}`;
                    }
                  }}
                >
                  <MessageCircle className="h-4 w-4 text-wine-700" /> 
                  Send a Message
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
