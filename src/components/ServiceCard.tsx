import { Star, Clock, ArrowUpRight } from 'lucide-react';
import type { Service } from '@/types';
import { formatPrice } from '@/lib/format';
import { useNavigate } from '@/lib/router';

export default function ServiceCard({ service }: { service: Service }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/services/${service.slug}`)}
      className="group flex flex-col text-left bg-cream-50 rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image_url}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {service.tag && (
          <span className="absolute top-3 left-3 rounded-full bg-wine-700 px-3 py-1 text-xs font-semibold text-cream-100 shadow">
            {service.tag}
          </span>
        )}
        <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-wine-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-wine-600">
            <Star className="h-3.5 w-3.5 fill-wine-600" />
            <span className="font-semibold">{service.rating.toFixed(1)}</span>
          </span>
          <span className="flex items-center gap-1 text-wine-900/50">
            <Clock className="h-3.5 w-3.5" /> {service.duration}
          </span>
        </div>
        <h3 className="mt-2 font-serif text-lg font-semibold text-wine-900 leading-snug">
          {service.name}
        </h3>
        <p className="mt-1.5 text-sm text-wine-900/60 line-clamp-2 flex-1">{service.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif text-xl font-semibold text-wine-700">
            from {formatPrice(service.price)}
          </span>
          <span className="text-sm font-medium text-wine-600 group-hover:text-wine-700">
            View package
          </span>
        </div>
      </div>
    </button>
  );
}
