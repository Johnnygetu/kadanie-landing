import { useAsync } from '@/lib/useAsync';
import { MOCK_CATEGORIES } from '@/lib/mockData';
import CategoryCard from '@/components/CategoryCard';
import { Spinner, ErrorState } from '@/components/States';
import SectionHeading from '@/components/SectionHeading';

export default function CategoriesPage() {
  const { data, error, loading } = useAsync(async () => {
    return {
      categories: MOCK_CATEGORIES,
    };
  }, []);

  return (
    <div className="pt-32 pb-10 container-px max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Browse by category"
        title="All categories"
        subtitle="Discover our complete range of decor, styling, rentals, services, and creative academy courses."
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
              <CategoryCard key={c.id} category={c} variant="image" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
