import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import type { Category, Course } from '@/types';
import CategoryCard from '@/components/CategoryCard';
import CourseCard from '@/components/CourseCard';
import { Spinner, ErrorState } from '@/components/States';
import SectionHeading from '@/components/SectionHeading';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const { data, error, loading } = useAsync(async () => {
    const [cats, courses] = await Promise.all([
      supabase.from('categories').select('*').order('created_at'),
      supabase.from('courses').select('*').order('created_at').limit(3),
    ]);
    if (cats.error) throw cats.error;
    if (courses.error) throw courses.error;
    return {
      categories: cats.data as Category[],
      courses: courses.data as Course[],
    };
  }, []);

  return (
    <div className="pt-32 pb-10 container-px max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Browse by occasion"
        title="All categories"
        subtitle="Pick a celebration and discover the items and services we curate for it."
        align="center"
      />
      <div className="mt-12">
        {loading ? (
          <Spinner />
        ) : error || !data ? (
          <ErrorState message={error ?? 'Could not load categories.'} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        )}
      </div>

      {/* Courses */}
      <section className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Kadanie Academy"
            title="Courses"
            subtitle="Learn the craft of decoration from working professionals — project-based, with kits and certificates."
          />
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-wine-700 hover:gap-3 transition-all"
          >
            All courses <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        {!loading && !error && data && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
