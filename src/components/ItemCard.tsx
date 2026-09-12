import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import type { Item } from '@/types';
import { formatPrice } from '@/lib/format';
import { useNavigate } from '@/lib/router';

export default function ItemCard({ item }: { item: Item }) {
  const navigate = useNavigate();
  const isFeatured = (item.tag || '').trim().toLowerCase() === 'featured';

  return (
    <button
      onClick={() => navigate(`/items/${item.slug}`)}
      className="group flex flex-col text-left bg-white rounded-[1.5rem] overflow-hidden shadow-card hover:shadow-soft border border-wine-700/5 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {isFeatured && (
            <span className="rounded-full bg-wine-700/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider text-cream-100 shadow-sm uppercase">
              Featured
            </span>
          )}
        </div>
        <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-wine-700 shadow-sm scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      
      <div className="flex flex-col flex-1 p-5">
        {/* Eyebrow: Seller Name */}
        {item.seller && (
          <span className="text-[10px] font-bold text-wine-900/40 uppercase tracking-widest mb-1.5 truncate">
            {item.seller.name}
          </span>
        )}

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-wine-950 leading-snug mb-3 line-clamp-2">
          {item.name}
        </h3>

        {/* Metadata Grid */}
        <div className="flex items-center justify-between gap-2 mb-4 w-full">
          {item.seller?.general_location && (
            <div className="flex items-center gap-1.5 text-xs text-wine-900/70 font-medium flex-1 min-w-0">
              <MapPin className="h-3.5 w-3.5 text-wine-700/50 shrink-0" /> 
              <span className="truncate">{item.seller.general_location}</span>
            </div>
          )}
          {item.seller?.phone_number && (
            <div className="flex items-center gap-1.5 text-xs text-wine-900/70 font-medium shrink-0">
              <Phone className="h-3.5 w-3.5 text-wine-700/50 shrink-0" /> 
              <span>{item.seller.phone_number}</span>
            </div>
          )}
        </div>

        {/* Footer: Price */}
        <div className="mt-auto pt-4 border-t border-wine-900/5">
          <span className="font-serif text-xl font-bold text-wine-700 leading-none">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
    </button>
  );
}
