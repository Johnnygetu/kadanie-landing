import { ArrowUpRight, Clock, Users } from 'lucide-react';
import type { Course } from '@/types';
import { formatPrice } from '@/lib/format';
import { useNavigate } from '@/lib/router';

export default function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/courses/${course.slug}`)}
      className="group flex flex-col text-left bg-white rounded-[1.5rem] overflow-hidden shadow-card hover:shadow-soft border border-wine-700/5 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={course.image_url}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="rounded-full bg-wine-700/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider text-cream-100 shadow-sm uppercase">
            {course.level}
          </span>
        </div>
        <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-wine-700 shadow-sm scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      
      <div className="flex flex-col flex-1 p-5">
        {/* Eyebrow: Instructor */}
        <span className="text-[10px] font-bold text-wine-900/40 uppercase tracking-widest mb-1.5 truncate">
          {course.instructor}
        </span>

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-wine-950 leading-snug mb-3 line-clamp-2">
          {course.title}
        </h3>

        {/* Metadata Grid */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-wine-900/70 font-medium">
            <Clock className="h-3.5 w-3.5 text-wine-700/50 shrink-0" /> 
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-wine-900/70 font-medium">
            <Users className="h-3.5 w-3.5 text-wine-700/50 shrink-0" /> 
            <span>{course.seats_left} seats left</span>
          </div>
        </div>

        {/* Footer: Price */}
        <div className="mt-auto pt-4 border-t border-wine-900/5">
          <span className="font-serif text-xl font-bold text-wine-700 leading-none">
            {formatPrice(course.price)}
          </span>
        </div>
      </div>
    </button>
  );
}
