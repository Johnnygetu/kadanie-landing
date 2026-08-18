import { Clock, ArrowUpRight, Truck, ShieldAlert } from 'lucide-react';
import type { Service } from '@/types';
import { formatPrice } from '@/lib/format';
import { useNavigate } from '@/lib/router';

export default function ServiceCard({ service }: { service: Service }) {
  const navigate = useNavigate();
  const displayName = service.service_name || service.name || 'Service Package';
  const displayImage = service.main_image || service.image_url || '';
  const durationText = service.duration_days
    ? `${service.duration_days} ${service.duration_days === 1 ? 'day' : 'days'} validity`
    : service.duration || 'Flexible duration';

  return (
    <button
      onClick={() => navigate(`/services/${service.slug}`)}
      className="group flex flex-col text-left bg-cream-50 rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={displayImage}
          alt={displayName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {service.tag && (
            <span className="rounded-full bg-wine-700 px-3 py-1 text-xs font-semibold text-cream-100 shadow">
              {service.tag}
            </span>
          )}
          {service.is_active === false && (
            <span className="rounded-full bg-stone-700/90 px-3 py-1 text-xs font-semibold text-white shadow backdrop-blur-sm flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" /> Inactive
            </span>
          )}
        </div>

        <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-wine-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-wine-900/60 mb-1.5">
          <span className="flex items-center gap-1 font-medium">
            <Clock className="h-3.5 w-3.5 text-wine-700" /> {durationText}
          </span>
          <span className={`flex items-center gap-1 font-medium px-2 py-0.5 rounded-full ${
            service.delivery ? 'bg-emerald-100/70 text-emerald-800' : 'bg-wine-900/5 text-wine-900/60'
          }`}>
            <Truck className="h-3 w-3" /> {service.delivery ? 'Delivery included' : 'On-site'}
          </span>
        </div>
        <h3 className="font-serif text-lg font-semibold text-wine-900 leading-snug">
          {displayName}
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
