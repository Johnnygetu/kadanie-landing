import { Clock, GraduationCap, Users, ArrowUpRight } from 'lucide-react';
import type { Course } from '@/types';
import { formatPrice } from '@/lib/format';
import { useNavigate } from '@/lib/router';

export default function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();
  const pct = course.seats_total
    ? Math.round(((course.seats_total - course.seats_left) / course.seats_total) * 100)
    : 0;
  const lowSeats = course.seats_left <= 5;

  return (
    <button
      onClick={() => navigate(`/courses/${course.slug}`)}
      className="group flex flex-col text-left bg-cream-50 rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={course.image_url}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-950/70 via-wine-950/10 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span className="rounded-full bg-cream-50/90 px-3 py-1 text-xs font-semibold text-wine-700">
            {course.level}
          </span>
          {lowSeats && course.seats_left > 0 && (
            <span className="rounded-full bg-wine-700 px-3 py-1 text-xs font-semibold text-cream-100 shadow">
              Only {course.seats_left} left
            </span>
          )}
        </div>
        <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-wine-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 text-xs text-wine-900/60">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
          <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" /> {course.instructor}</span>
        </div>
        <h3 className="mt-2 font-serif text-lg font-semibold text-wine-900 leading-snug">
          {course.title}
        </h3>
        <p className="mt-1.5 text-sm text-wine-900/60 line-clamp-2 flex-1">{course.description}</p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-wine-900/60 mb-1.5">
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {pct}% filled</span>
            <span>{course.seats_left} / {course.seats_total} seats</span>
          </div>
          <div className="h-1.5 rounded-full bg-cream-300 overflow-hidden">
            <div className="h-full rounded-full bg-wine-600 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif text-xl font-semibold text-wine-700">
            {formatPrice(course.price)}
          </span>
          <span className="text-sm font-medium text-wine-600 group-hover:text-wine-700">
            Enroll now
          </span>
        </div>
      </div>
    </button>
  );
}
