import { ArrowLeft, BadgeCheck, MapPin, Store, Sparkles, Phone } from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import { MOCK_SELLERS, MOCK_SERVICES } from '@/lib/mockData';
import ServiceCard from '@/components/ServiceCard';
import { Spinner, ErrorState } from '@/components/States';
import { getTelegramUrl } from '@/lib/telegram';
import { TelegramIcon } from '@/components/TelegramIcon';

export default function SellerStorePage({ id }: { id: string }) {
  const navigate = useNavigate();

  const { data, error, loading } = useAsync(async () => {
    const seller = MOCK_SELLERS.find(s => s.id === id || String(s.id) === id);
    if (!seller) throw new Error('Seller not found');
    
    const services = MOCK_SERVICES.filter(service => service.seller_id === seller.id || String(service.seller_id) === String(seller.id));
    
    return { seller, services };
  }, [id]);

  if (loading) return <Spinner />;  
  if (error || !data) return <ErrorState message={error ?? 'Could not load seller.'} />;

  const { seller, services } = data;
  const hasContent = services.length > 0;

  return (
    <div className="pt-24 pb-20 bg-cream-200 min-h-screen">
      <div className="container-px max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-wine-900/60 hover:text-wine-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        {/* Store Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-wine-700/10 overflow-hidden mb-12">
          <div className="h-48 w-full bg-gradient-to-r from-wine-800 via-wine-700 to-wine-600 relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_50%)]" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 mb-6">
              <div className="relative rounded-full p-1.5 bg-white shadow-md inline-block">
                {seller.profile_picture ? (
                  <img 
                    src={seller.profile_picture} 
                    alt={seller.name} 
                    className="h-32 w-32 rounded-full object-cover border border-cream-200"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-cream-200 text-5xl font-bold text-wine-900 border border-wine-700/10">
                    {seller.name.charAt(0)}
                  </div>
                )}
                {seller.verified && (
                  <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-sm">
                    <BadgeCheck className="h-8 w-8 text-wine-700" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 pb-2">
                <h1 className="font-serif text-3xl font-semibold text-wine-900 mb-2">
                  {seller.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-wine-900/70">
                  {seller.general_location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 shrink-0 text-wine-700/60" />
                      {seller.general_location}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Store className="h-4 w-4 shrink-0 text-wine-700/60" />
                    {services.length} Services
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                {seller.telegram && (
                  <a 
                    href={getTelegramUrl(seller.telegram)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-full bg-[#0088cc] px-6 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-[#0077b3] transition-colors"
                  >
                    <TelegramIcon className="h-4 w-4" />
                    Message
                  </a>
                )}
                <a 
                  href={`tel:${seller.phone_number}`}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-full bg-cream-200 px-6 py-2.5 text-sm font-semibold text-wine-900 hover:bg-wine-700 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {seller.phone_number}
                </a>
              </div>
            </div>

            {seller.description && (
              <p className="text-wine-900/80 leading-relaxed max-w-3xl text-lg">
                {seller.description}
              </p>
            )}
          </div>
        </div>

        {/* Listings */}
        {!hasContent ? (
          <div className="rounded-3xl bg-white border border-wine-700/10 p-16 text-center shadow-sm">
            <Sparkles className="h-12 w-12 text-wine-900/20 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-semibold text-wine-900">No services yet</h3>
            <p className="mt-2 text-wine-900/60">This seller hasn't posted any services.</p>
          </div>
        ) : (
          <div className="space-y-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-wine-700" />
                <h2 className="font-serif text-2xl font-semibold text-wine-900">Services</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
