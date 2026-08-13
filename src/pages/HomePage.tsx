import { useEffect, useState } from 'react';
import { ArrowRight, Star, Sparkles, ShieldCheck, Truck, Heart, ShoppingBag } from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import { MOCK_CATEGORIES, MOCK_ITEMS, MOCK_SERVICES, MOCK_COURSES } from '@/lib/mockData';
import CategoryCard from '@/components/CategoryCard';
import ItemCard from '@/components/ItemCard';
import ServiceCard from '@/components/ServiceCard';
import CourseCard from '@/components/CourseCard';
import SectionHeading from '@/components/SectionHeading';
import { Spinner, ErrorState } from '@/components/States';

export default function HomePage() {
  const navigate = useNavigate();
  const { data, error, loading } = useAsync(async () => {
    const categories = MOCK_CATEGORIES;
    const allItems = MOCK_ITEMS;
    const grouped = categories.map((c) => ({
      category: c,
      items: allItems.filter((it) => it.category_id === c.id),
    }));

    return {
      categories,
      grouped,
      services: MOCK_SERVICES.slice(0, 3),
      courses: MOCK_COURSES.slice(0, 3),
    };
  }, []);

  if (loading) return <Spinner />;
  if (error || !data) return <ErrorState message={error ?? 'Could not load the catalog.'} />;

  return (
    <div className="pt-20">
      <Hero />
      <TrustBar />

      {/* Category browse */}
      <section className="container-px max-w-7xl mx-auto pt-20">
        <SectionHeading
          eyebrow="Browse by occasion"
          title="Explore our categories"
          subtitle="From weddings to festivals, every celebration deserves its own signature style."
        />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {data.categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Kadanie Store — items grouped by category */}
      <section className="bg-cream-100 py-20 mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-wine-700/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-wine-700">
              <ShoppingBag className="h-4 w-4" /> Kadanie Store
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-semibold text-wine-900">
              Shop decoration items by category
            </h2>
            <p className="mt-3 text-wine-900/60 max-w-xl">
              Hand-picked pieces for every celebration, organized by the occasions we know and love.
            </p>
          </div>

          <div className="space-y-16">
            {data.grouped.map(({ category, items }) => (
              <div key={category.id}>
                <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-wine-900">{category.name}</h3>
                    <p className="mt-1 text-sm text-wine-900/60 max-w-xl">{category.description}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/categories/${category.slug}`)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-wine-700 hover:gap-3 transition-all"
                  >
                    View {category.name} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {items.length === 0 ? (
                  <p className="text-sm text-wine-900/50 italic">New items coming soon to this category.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((it) => (
                      <ItemCard key={it.id} item={it} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/items')}
              className="inline-flex items-center gap-2 rounded-full bg-wine-700 px-6 py-3 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors active:scale-95"
            >
              Shop all items <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="container-px max-w-7xl mx-auto py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Done for you"
            title="Signature decor services"
            subtitle="Let our stylists handle every detail — from concept to on-day execution."
          />
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-wine-700 hover:gap-3 transition-all"
          >
            All services <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Courses CTA band */}
      <section className="container-px max-w-7xl mx-auto py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-wine-700 text-cream-100 p-10 sm:p-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cream-100/10 blur-2xl" />
          <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-wine-500/30 blur-2xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream-200/80">
                <Sparkles className="h-4 w-4" /> Kadanie Academy
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold leading-tight">
                Turn your love of decor into a career.
              </h2>
              <p className="mt-4 text-cream-200/85 leading-relaxed max-w-lg">
                Learn wedding styling, balloon art, florals and the business of decor
                from working professionals — with kits, templates and lifetime community access.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/courses')}
                  className="rounded-full bg-cream-100 px-6 py-3 text-sm font-semibold text-wine-700 hover:bg-cream-200 transition-colors active:scale-95"
                >
                  Browse courses
                </button>
                <button
                  onClick={() => navigate('/courses/wedding-decor-masterclass')}
                  className="rounded-full border border-cream-100/40 px-6 py-3 text-sm font-semibold text-cream-100 hover:bg-cream-100/10 transition-colors"
                >
                  Masterclass details
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.courses.slice(0, 2).map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/courses/${c.slug}`)}
                  className="group text-left rounded-2xl overflow-hidden bg-cream-50/10 backdrop-blur-sm border border-cream-100/20 hover:bg-cream-50/20 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={c.image_url} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="font-serif text-base font-semibold">{c.title}</p>
                    <p className="mt-1 text-xs text-cream-200/75">{c.duration} · {c.level}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="container-px max-w-7xl mx-auto pb-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Kadanie Academy"
            title="Upcoming decor courses"
            subtitle="Practical, project-based courses with real kits and certificates."
          />
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-wine-700 hover:gap-3 transition-all"
          >
            All courses <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const slides = [
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={src} alt="Decor" className="h-full w-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-wine-950/85 via-wine-950/55 to-wine-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-wine-950/70 to-transparent" />

      <div className="relative h-full container-px max-w-7xl mx-auto flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream-100/15 backdrop-blur-sm border border-cream-100/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream-100">
            <Sparkles className="h-4 w-4" /> Kadanie Decore
          </span>
          <h1 className="mt-5 font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold text-cream-100 leading-[1.05] text-balance">
            Beautiful spaces, <br />
            <span className="italic text-cream-200">unforgettable</span> moments.
          </h1>
          <p className="mt-6 text-lg text-cream-200/85 leading-relaxed max-w-xl">
            Shop curated decoration items, book full-service styling, and learn the
            craft from the pros — all in one elegant home for celebration decor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/categories')}
              className="rounded-full bg-cream-100 px-7 py-3.5 text-sm font-semibold text-wine-700 hover:bg-cream-200 transition-colors active:scale-95 shadow-soft"
            >
              Explore collections
            </button>
            <button
              onClick={() => navigate('/services')}
              className="rounded-full border border-cream-100/40 px-7 py-3.5 text-sm font-semibold text-cream-100 hover:bg-cream-100/10 transition-colors"
            >
              Book a service
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-cream-100/80">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-cream-200 text-cream-200" />
              <span className="text-sm font-semibold">4.9</span>
              <span className="text-sm">avg rating</span>
            </div>
            <span className="h-4 w-px bg-cream-100/30" />
            <div className="text-sm">
              <span className="font-semibold">2,400+</span> events styled
            </div>
            <span className="h-4 w-px bg-cream-100/30" />
            <div className="text-sm">
              <span className="font-semibold">12</span> categories
            </div>
          </div>
        </div>
      </div>

      {/* slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-cream-100' : 'w-1.5 bg-cream-100/50'}`}
          />
        ))}
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: ShieldCheck, title: 'Quality assured', text: 'Hand-checked pieces' },
    { icon: Truck, title: 'Free delivery', text: 'On orders over $75' },
    { icon: Heart, title: 'Loved by 2,400+', text: 'Couples & hosts' },
    { icon: Sparkles, title: 'Expert styling', text: 'By working pros' },
  ];
  return (
    <section className="container-px max-w-7xl mx-auto -mt-10 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl bg-cream-50 p-6 shadow-soft">
        {items.map((it) => (
          <div key={it.title} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-wine-700/10 text-wine-700">
              <it.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-wine-900">{it.title}</p>
              <p className="text-xs text-wine-900/60">{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
