import { useState } from 'react';
import { ArrowLeft, Clock, GraduationCap, Users, Check, Star, BookOpen, Award, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import type { Course } from '@/types';
import { formatPrice } from '@/lib/format';
import { Spinner, ErrorState } from '@/components/States';

export default function CourseDetailPage({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const { data, error, loading } = useAsync(async () => {
    const { data, error } = await supabase.from('courses').select('*').eq('slug', slug).maybeSingle();
    if (error) throw error;
    if (!data) throw new Error('Course not found');
    return data as Course;
  }, [slug]);

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error || !data) return <div className="pt-32"><ErrorState message={error ?? 'Could not load this course.'} /></div>;

  const course = data;
  const soldOut = course.seats_left <= 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      const { error } = await supabase.from('registrations').insert({
        course_id: course.id,
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });
      if (error) throw error;
      setDone(true);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Could not complete your registration.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[46vh] min-h-[340px] overflow-hidden">
        <img src={course.image_url} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-950/90 via-wine-950/55 to-wine-950/30" />
        <div className="relative h-full container-px max-w-7xl mx-auto flex flex-col justify-end pb-10">
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex w-fit items-center gap-2 text-sm text-cream-200/80 hover:text-cream-100 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> All courses
          </button>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="rounded-full bg-cream-50/90 px-3 py-1 text-xs font-semibold text-wine-700">{course.level}</span>
            <span className="rounded-full bg-cream-100/15 backdrop-blur-sm border border-cream-100/20 px-3 py-1 text-xs font-semibold text-cream-100">{course.duration}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-cream-100 max-w-3xl text-balance">{course.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-cream-200/85 text-sm">
            <GraduationCap className="h-4 w-4" /> Taught by {course.instructor}
          </p>
        </div>
      </section>

      <div className="container-px max-w-7xl mx-auto py-12 grid lg:grid-cols-5 gap-10">
        {/* Left: details */}
        <div className="lg:col-span-3">
          <p className="text-wine-900/75 leading-relaxed text-lg">{course.description}</p>

          {/* Highlights */}
          {course.highlights.length > 0 && (
            <div className="mt-8">
              <h2 className="font-serif text-xl font-semibold text-wine-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-wine-600" /> What's included
              </h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5 rounded-2xl bg-cream-50 p-4 shadow-card">
                    <Check className="h-4 w-4 mt-0.5 text-wine-600 shrink-0" />
                    <span className="text-sm text-wine-900/80">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum */}
          {course.curriculum.length > 0 && (
            <div className="mt-10">
              <h2 className="font-serif text-xl font-semibold text-wine-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-wine-600" /> Curriculum
              </h2>
              <ol className="mt-4 space-y-3">
                {course.curriculum.map((c, i) => (
                  <li key={c} className="flex items-start gap-3 rounded-2xl border border-wine-700/10 bg-cream-50 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wine-700 text-cream-100 text-sm font-semibold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-wine-900/80 pt-1.5">{c}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Right: registration */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl bg-cream-50 p-6 shadow-soft">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-3xl font-semibold text-wine-700">{formatPrice(course.price)}</span>
                <div className="flex items-center gap-1 text-sm text-wine-600">
                  <Star className="h-4 w-4 fill-wine-600" />
                  <span className="font-semibold">4.9</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Stat icon={Clock} label="Duration" value={course.duration} />
                <Stat icon={GraduationCap} label="Level" value={course.level} />
                <Stat icon={Users} label="Seats left" value={String(course.seats_left)} />
              </div>

              {soldOut ? (
                <div className="mt-5 rounded-2xl bg-wine-700/10 text-wine-700 text-center py-4 text-sm font-semibold">
                  This course is fully booked
                </div>
              ) : done ? (
                <div className="mt-5 rounded-2xl bg-wine-700 text-cream-100 p-6 text-center animate-scale-in">
                  <Award className="h-9 w-9 mx-auto" />
                  <h3 className="mt-2 font-serif text-xl font-semibold">You're registered!</h3>
                  <p className="mt-1.5 text-sm text-cream-200/85">
                    We've reserved your seat, {form.name || 'friend'}. Check your email for next steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-5 space-y-3">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="input" />
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="input" />
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" className="input" />
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={2} placeholder="Anything we should know? (optional)" className="input resize-none" />
                  {err && <p className="text-sm text-wine-700 bg-wine-700/10 rounded-xl px-4 py-2">{err}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-wine-700 px-6 py-3.5 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors active:scale-95 disabled:opacity-60"
                  >
                    {submitting ? 'Registering…' : `Register for ${formatPrice(course.price)}`}
                  </button>
                  <p className="text-center text-xs text-wine-900/50">
                    Secure your spot — only {course.seats_left} seats remaining
                  </p>
                </form>
              )}
            </div>
          </div>
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

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-cream-100 p-3">
      <Icon className="h-4 w-4 mx-auto text-wine-600" />
      <p className="mt-1 text-xs text-wine-900/50">{label}</p>
      <p className="text-xs font-semibold text-wine-900 truncate">{value}</p>
    </div>
  );
}
