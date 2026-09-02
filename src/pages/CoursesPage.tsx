import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { MOCK_COURSES } from '@/lib/mockData';
import CourseCard from '@/components/CourseCard';
import { Spinner, ErrorState, EmptyState } from '@/components/States';
import SectionHeading from '@/components/SectionHeading';

export default function CoursesPage() {
  const [q, setQ] = useState('');

  const { data, error, loading } = useAsync(async () => {
    return MOCK_COURSES;
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    let list = data;
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(t) || c.description.toLowerCase().includes(t));
    }
    return list;
  }, [data, q]);

  return (
    <div className="pt-32 pb-10 container-px max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Kadanie Courses"
        title="Decor courses"
        subtitle="Practical, project-based courses taught by working professionals — with kits, templates and certificates."
        align="center"
      />

      {/* Search Toolbar */}
      <div className="mt-10 flex justify-center">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-wine-900/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses…"
            className="w-full rounded-full bg-cream-50 border border-wine-700/15 pl-11 pr-4 py-3 text-sm text-wine-900 placeholder:text-wine-900/40 focus:outline-none focus:ring-2 focus:ring-wine-700/30"
          />
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <Spinner />
        ) : error || !data ? (
          <ErrorState message={error ?? 'Could not load courses.'} />
        ) : filtered.length === 0 ? (
          <EmptyState title="No courses match your search" hint="Try a different search term." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
