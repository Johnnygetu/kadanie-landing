import { useState } from 'react';
import { ArrowLeft, Check, Clock, Phone, User, Truck, CheckCircle2, ShieldAlert, MessageCircle, MapPin } from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import { MOCK_SERVICES } from '@/lib/mockData';
import { formatPrice } from '@/lib/format';
import { Spinner, ErrorState } from '@/components/States';

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);

  const { data: service, error, loading } = useAsync(async () => {
    const srv = MOCK_SERVICES.find((s) => s.slug === slug);
    if (!srv) throw new Error('Service not found');
    return srv;
  }, [slug]);

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error || !service) return <div className="pt-32"><ErrorState message={error ?? 'Could not load this service.'} /></div>;

  const serviceName = service.service_name || service.name || 'Service';
  const mainImg = service.main_image || service.image_url || '';
  const secondaryImages = service.images || service.gallery || [];
  const gallery = secondaryImages.length ? secondaryImages : [mainImg];
  const durationText = service.duration_days
    ? `${service.duration_days} ${service.duration_days === 1 ? 'day' : 'days'} validity`
    : service.duration || 'Flexible duration';

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container-px max-w-6xl mx-auto">
        
        {/* Top Navigation */}
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 text-sm font-medium text-wine-900/60 hover:text-wine-700 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </button>

        {/* Page Header */}
        <div className="mb-8">
          {service.tag && (
            <div className="mb-3">
              <span className="rounded-full bg-wine-50 text-wine-700 px-3 py-1 text-sm font-semibold border border-wine-100">
                {service.tag}
              </span>
            </div>
          )}
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-wine-900 tracking-tight leading-tight">
            {serviceName}
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
                  alt={serviceName} 
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
              <h2 className="text-xl font-serif font-semibold text-wine-900 mb-4">About this service</h2>
              <p className="text-base text-wine-900/70 leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </section>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <section>
                <h2 className="text-xl font-serif font-semibold text-wine-900 mb-4">What's included</h2>
                <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-wine-900/80">
                      <div className="mt-0.5 rounded-full bg-emerald-100/80 p-1 shrink-0 text-emerald-700">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>

          {/* Right Column: Sticky Sidebar with Pricing & Seller Info */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
            
            {/* Pricing & Summary Card */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-card">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-serif text-4xl font-bold text-wine-900">{formatPrice(service.price)}</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-wine-900/80">
                  <Clock className="h-5 w-5 text-wine-700/60 shrink-0" />
                  <span><strong>Duration:</strong> {durationText}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-wine-900/80">
                  <Truck className="h-5 w-5 text-wine-700/60 shrink-0" />
                  <span>
                    <strong>Delivery:</strong> {service.delivery ? 'Setup & delivery included' : 'Self-pickup / On-site only'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-wine-900/80">
                  {service.is_active ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span className="text-emerald-700 font-medium">Currently Available</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="h-5 w-5 text-stone-400 shrink-0" />
                      <span className="text-stone-500 font-medium">Currently Unavailable</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  disabled={!service.is_active}
                  className="w-full rounded-full bg-wine-700 px-6 py-4 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={() => {
                    if (service.seller?.phone_number) {
                      window.location.href = `tel:${service.seller.phone_number.replace(/\s+/g, '')}`;
                    }
                  }}
                >
                  <Phone className="h-4 w-4" /> 
                  {service.is_active ? 'Call to Book' : 'Not Available'}
                </button>
                <button 
                  disabled={!service.is_active}
                  className="w-full rounded-full bg-white border border-stone-200 px-6 py-4 text-sm font-semibold text-wine-900 shadow-sm hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={() => {
                    if (service.seller?.email) {
                      window.location.href = `mailto:${service.seller.email}`;
                    }
                  }}
                >
                  <MessageCircle className="h-4 w-4 text-wine-700" /> 
                  Send a Message
                </button>
              </div>
            </div>

            {/* Seller Profile Card */}
            {service.seller && (
              <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-wine-900/50 mb-5">Provided By</h3>
                
                <div className="flex gap-4 items-center mb-5">
                  <img 
                    src={service.seller.profile_picture || 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=150&q=80'} 
                    alt={service.seller.name} 
                    className="h-16 w-16 rounded-full object-cover shadow-sm bg-white" 
                  />
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-wine-900 flex items-center gap-1.5">
                      {service.seller.name}
                      {service.seller.verified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-600" aria-label="Verified Seller" />
                      )}
                    </h4>
                    <p className="text-sm text-wine-900/60 mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {service.seller.general_location}
                    </p>
                  </div>
                </div>

                {service.seller.description && (
                  <p className="text-sm text-wine-900/70 mb-2 leading-relaxed line-clamp-3">
                    {service.seller.description}
                  </p>
                )}

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
