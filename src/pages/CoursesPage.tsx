import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAsync } from '@/lib/useAsync';
import type { Course } from '@/types';
import CourseCard from '@/components/CourseCard';
import { Spinner, ErrorState, EmptyState } from '@/components/States';
import SectionHeading from '@/components/SectionHeading';

export default function CoursesPage() {
  const [q, setQ] = useState('');
  const [level, setLevel] = useState<string>('all');

  const { data, error, loading } = useAsync(async () => {
    const { data, error } = await supabase.from('courses').select('*').order('created_at');
    if (error) throw error;
    return data as Course[];
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    let list = data;
    if (level !== 'all') list = list.filter((c) => c.level === level);
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(t) || c.description.toLowerCase().includes(t));
    }
    return list;
  }, [data, q, level]);

  return (
    <div className="pt-32 pb-10 container-px max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Kadanie Academy"
        title="Decor courses"
        subtitle="Practical, project-based courses taught by working professionals — with kits, templates and certificates."
        align="center"
      />

      <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-wine-900/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses…"
            className="w-full rounded-full bg-cream-50 border border-wine-700/15 pl-11 pr-4 py-3 text-sm text-wine-900 placeholder:text-wine-900/40 focus:outline-none focus:ring-2 focus:ring-wine-700/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                level === l ? 'bg-wine-700 text-cream-100' : 'bg-cream-50 text-wine-900/70 border border-wine-700/10 hover:bg-cream-100'
              }`}
            >
              {l === 'all' ? 'All levels' : l}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <Spinner />
        ) : error || !data ? (
          <ErrorState message={error ?? 'Could not load courses.'} />
        ) : filtered.length === 0 ? (
          <EmptyState title="No courses match your filters" hint="Try a different search or level." />
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
