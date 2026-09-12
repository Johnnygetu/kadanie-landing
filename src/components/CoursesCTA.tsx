import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import { useNavigate } from '@/lib/router';
import { MOCK_COURSES } from '@/lib/mockData';
import CourseCard from '@/components/CourseCard';

export default function CoursesCTA() {
  const navigate = useNavigate();
  // Display top 3 featured masterclasses from Kadanie Academy
  const featuredCourses = MOCK_COURSES.slice(0, 3);

  return (
    <section className="bg-cream-100/70 border-t border-wine-700/10 py-16 sm:py-20 mt-16">
      <div className="container-px max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wine-700/10 text-wine-700 text-xs font-semibold mb-3">
              <GraduationCap className="h-4 w-4" />
              <span>Kadanie Academy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-wine-900 tracking-tight">
              Master the Craft with Our Courses
            </h2>
            <p className="mt-2 text-wine-900/70 text-sm sm:text-base max-w-xl">
              Learn event styling, floral architecture, balloon installation, and business operations directly from seasoned professionals.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-2 rounded-full bg-wine-700 px-6 py-3 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-all active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              View All Courses
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
