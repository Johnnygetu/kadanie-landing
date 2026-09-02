import { useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import { MOCK_CATEGORIES, MOCK_ITEMS, MOCK_SERVICES, MOCK_COURSES } from '@/lib/mockData';
import CategoryCard from '@/components/CategoryCard';
import ItemCard from '@/components/ItemCard';
import ServiceCard from '@/components/ServiceCard';
import CourseCard from '@/components/CourseCard';
import { Spinner, ErrorState } from '@/components/States';

export default function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const { data, error, loading } = useAsync(async () => {
    const categories = MOCK_CATEGORIES;
    const allItems = MOCK_ITEMS;
    return {
      categories,
      items: allItems,
      services: MOCK_SERVICES,
      courses: MOCK_COURSES,
    };
  }, []);

  if (loading) return <Spinner />;
  if (error || !data) return <ErrorState message={error ?? 'Could not load the catalog.'} />;

  const filteredItems = data.items.filter((item) => {
    if (q.trim()) {
      const lowerQ = q.toLowerCase();
      if (!item.name.toLowerCase().includes(lowerQ) && !item.description.toLowerCase().includes(lowerQ)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="pt-24 pb-20 bg-cream-200 min-h-screen">
      <div className="container-px max-w-7xl mx-auto">
        
        {/* Search Section */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-wine-900/40" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for decor items..."
              className="w-full rounded-full bg-white border border-wine-700/10 pl-11 pr-4 py-2.5 text-sm text-wine-900 placeholder:text-wine-900/40 focus:outline-none focus:ring-2 focus:ring-wine-700/30 shadow-sm transition-shadow"
            />
          </div>
          <button 
            onClick={() => navigate('/items')}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-wine-700 px-6 py-2.5 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors shrink-0"
          >
            Search
          </button>
        </div>

        {/* Categories Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl font-semibold text-wine-900">Browse Categories</h2>
            <button onClick={() => navigate('/categories')} className="text-sm font-semibold text-wine-700 hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
            {data.categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>

        {/* Featured Listings */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl font-semibold text-wine-900">
              {q ? 'Search Results' : 'Featured Listings'}
            </h2>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-white border border-wine-700/10 px-4 py-2 text-sm font-medium text-wine-900 shadow-sm hover:bg-cream-100 transition-colors">
                <SlidersHorizontal className="h-4 w-4 text-wine-900/50" />
                Sort
              </button>
              <button onClick={() => navigate('/items')} className="text-sm font-semibold text-wine-700 hover:underline hidden sm:inline-flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {filteredItems.length === 0 ? (
            <div className="rounded-3xl bg-white border border-wine-700/10 p-12 text-center shadow-sm">
              <Sparkles className="h-8 w-8 text-wine-900/20 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-wine-900">No listings found</h3>
              <button 
                onClick={() => setQ('')} 
                className="mt-6 rounded-full bg-wine-700 px-6 py-2.5 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.slice(0, 6).map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </div>
          )}
        </div>

        {/* All Services */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl font-semibold text-wine-900">All Services</h2>
            <button onClick={() => navigate('/services')} className="text-sm font-semibold text-wine-700 hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.slice(0, 6).map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>

        {/* Kadanie Store */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl font-semibold text-wine-900">Kadanie Store</h2>
            <button onClick={() => navigate('/items')} className="text-sm font-semibold text-wine-700 hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.slice(0, 6).map((it) => (
              <ItemCard key={it.id} item={it} />
            ))}
          </div>
        </div>

        {/* Kadanie Courses */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl font-semibold text-wine-900">Kadanie Courses</h2>
            <button onClick={() => navigate('/courses')} className="text-sm font-semibold text-wine-700 hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.courses.slice(0, 6).map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
