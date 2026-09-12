import { BadgeCheck, MapPin, Store, ChevronRight } from 'lucide-react';
import { useNavigate } from '@/lib/router';
import type { Seller } from '@/types';

export default function SellerCard({ seller }: { seller: Seller }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/sellers/${seller.id}`)}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 border border-wine-700/10 cursor-pointer"
    >
      {/* Abstract Cover Gradient */}
      <div className="h-24 w-full bg-gradient-to-r from-wine-800 via-wine-700 to-wine-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_50%)]" />
      </div>

      <div className="px-6 pb-6 relative flex-1 flex flex-col">
        {/* Overlapping Avatar */}
        <div className="-mt-12 mb-4 flex justify-between items-end">
          <div className="relative rounded-full p-1 bg-white shadow-sm inline-block">
            {seller.profile_picture ? (
              <img 
                src={seller.profile_picture} 
                alt={seller.name} 
                className="h-20 w-20 rounded-full object-cover border border-cream-200 transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200 text-2xl font-bold text-wine-900 border border-wine-700/10 transition-transform duration-500 group-hover:scale-105">
                {seller.name.charAt(0)}
              </div>
            )}
            {seller.verified && (
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-sm">
                <BadgeCheck className="h-5 w-5 text-wine-700" />
              </div>
            )}
          </div>
          
          <div className="mb-2 bg-cream-100 text-wine-800 text-xs font-semibold px-3 py-1 rounded-full border border-wine-700/10 flex items-center gap-1.5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <Store className="h-3 w-3" />
            Visit Store
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl font-semibold text-wine-900 truncate transition-colors duration-300 group-hover:text-wine-700">
            {seller.name}
          </h3>
          {seller.general_location && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-wine-900/60 truncate">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-wine-700/50" />
              {seller.general_location}
            </p>
          )}
          
          {seller.description && (
            <p className="mt-4 text-sm text-wine-900/70 line-clamp-2 leading-relaxed">
              {seller.description}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-cream-200/60 p-4 bg-cream-50/50 flex items-center justify-between group-hover:bg-wine-50/30 transition-colors duration-300">
        <span className="text-sm font-semibold text-wine-900/70 group-hover:text-wine-800 transition-colors">
          View Profile & Services
        </span>
        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm text-wine-700 border border-cream-200 group-hover:bg-wine-700 group-hover:text-white group-hover:border-wine-700 transition-all duration-300">
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
