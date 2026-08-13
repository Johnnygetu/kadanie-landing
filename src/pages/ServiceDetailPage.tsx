import { useState } from 'react';
import { ArrowLeft, Star, Check, Clock, Calendar, Users, Phone, Mail, User } from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import { MOCK_SERVICES } from '@/lib/mockData';
import { formatPrice } from '@/lib/format';
import { Spinner, ErrorState } from '@/components/States';

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', date: '', guests: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const { data, error, loading } = useAsync(async () => {
    const service = MOCK_SERVICES.find((s) => s.slug === slug);
    if (!service) throw new Error('Service not found');
    return service;
  }, [slug]);

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error || !data) return <div className="pt-32"><ErrorState message={error ?? 'Could not load this service.'} /></div>;

  const service = data;
  const gallery = service.gallery.length ? service.gallery : [service.image_url];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate brief mock submission delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    setDone(true);
  }

  return (
    <div className="pt-28 pb-10 container-px max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/services')}
        className="inline-flex items-center gap-2 text-sm text-wine-900/60 hover:text-wine-700 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to services
      </button>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
            <img src={gallery[active]} alt={service.name} className="h-full w-full object-cover animate-fade-in" key={active} />
            {service.tag && (
              <span className="absolute top-4 left-4 rounded-full bg-wine-700 px-3 py-1 text-xs font-semibold text-cream-100 shadow">
                {service.tag}
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
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-wine-600">
              <Star className="h-4 w-4 fill-wine-600" />
              <span className="font-semibold">{service.rating.toFixed(1)}</span>
              <span className="text-wine-900/50">· {service.reviews_count} reviews</span>
            </span>
            <span className="flex items-center gap-1.5 text-wine-900/60">
              <Clock className="h-4 w-4" /> {service.duration}
            </span>
          </div>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-wine-900">{service.name}</h1>
          <p className="mt-4 text-wine-900/70 leading-relaxed">{service.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-4xl font-semibold text-wine-700">{formatPrice(service.price)}</span>
            <span className="text-sm text-wine-900/50">starting price</span>
          </div>

          {service.features.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-wine-900/80">
                  <Check className="h-4 w-4 mt-0.5 text-wine-600 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Enquiry form */}
      <div className="mt-14 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-2xl font-semibold text-wine-900">Request this service</h2>
          <p className="mt-2 text-sm text-wine-900/60 leading-relaxed">
            Tell us about your event and our stylists will get back to you within 24 hours
            with a tailored quote and availability.
          </p>
          <div className="mt-6 space-y-3 text-sm text-wine-900/70">
            <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-wine-600" /> Flexible dates, subject to availability</p>
            <p className="flex items-center gap-2"><Users className="h-4 w-4 text-wine-600" /> Any scale — intimate to grand</p>
            <p className="flex items-center gap-2"><Check className="h-4 w-4 text-wine-600" /> Free consultation & quote</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          {done ? (
            <div className="rounded-3xl bg-wine-700 text-cream-100 p-8 text-center animate-scale-in">
              <Check className="h-10 w-10 mx-auto" />
              <h3 className="mt-3 font-serif text-2xl font-semibold">Enquiry received</h3>
              <p className="mt-2 text-cream-200/85 text-sm">
                Thank you, {form.name || 'friend'}! Our team will reach out to you shortly.
              </p>
              <button
                onClick={() => { setDone(false); setForm({ name: '', email: '', date: '', guests: '', notes: '' }); }}
                className="mt-5 rounded-full bg-cream-100 px-5 py-2.5 text-sm font-semibold text-wine-700 hover:bg-cream-200 transition-colors"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-3xl bg-cream-50 p-6 sm:p-8 shadow-card space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field icon={User} label="Full name">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Your name" />
                </Field>
                <Field icon={Mail} label="Email">
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@email.com" />
                </Field>
                <Field icon={Calendar} label="Event date">
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" />
                </Field>
                <Field icon={Phone} label="Approx. guests">
                  <input value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="input" placeholder="e.g. 80" />
                </Field>
              </div>
              <Field label="Notes">
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="input resize-none" placeholder="Tell us about your vision, venue, theme…" />
              </Field>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-wine-700 px-6 py-3.5 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors active:scale-95 disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Request a quote'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(123,1,30,0.15);
          background: #fdfbf6;
          padding: 0.7rem 1rem;
          font-size: 0.875rem;
          color: #4a0113;
        }
        .input:focus { outline: none; box-shadow: 0 0 0 2px rgba(123,1,30,0.25); }
      `}</style>
    </div>
  );
}

function Field({
  icon: Icon, label, children,
}: { icon?: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-wine-900/60 mb-1.5">
        {Icon && <Icon className="h-3.5 w-3.5" />} {label}
      </span>
      {children}
    </label>
  );
}
