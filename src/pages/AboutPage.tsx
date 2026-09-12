import { Sparkles, Heart, Award, Users, Quote } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useNavigate } from '@/lib/router';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-10">
      <section className="container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our story"
          title="Decor with a heartbeat"
          subtitle="Kadanie Décor & Events began with a simple belief — that every celebration deserves a space that feels truly yours."
          align="center"
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-card aspect-[4/3]">
            <img src="https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Kadanie studio" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-5 text-wine-900/75 leading-relaxed">
            <p>
              What started as a small studio styling friends' weddings has grown into a full
              decoration house — curating items, designing services, and teaching the next
              generation of stylists through Kadanie Courses.
            </p>
            <p>
              We believe decor is more than beautiful objects. It's the feeling of walking into a
              room and knowing, instantly, that something special is about to happen.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <Stat icon={Users} value="2,400+" label="Events styled" />
              <Stat icon={Award} value="800+" label="Students taught" />
              <Stat icon={Heart} value="4.9★" label="Average rating" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-px max-w-7xl mx-auto mt-20">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: 'Crafted, not copied', text: 'Every design starts with your story — never a template.' },
            { icon: Heart, title: 'People first', text: 'From first call to last guest, we treat your day like our own.' },
            { icon: Award, title: 'Built to last', text: 'Quality pieces and timeless style you can return to for years.' },
          ].map((v) => (
            <div key={v.title} className="rounded-3xl bg-cream-50 p-8 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-wine-700/10 text-wine-700">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-wine-900">{v.title}</h3>
              <p className="mt-2 text-sm text-wine-900/60 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="container-px max-w-4xl mx-auto mt-20">
        <div className="rounded-[2rem] bg-wine-700 text-cream-100 p-10 sm:p-14 text-center shadow-soft">
          <Quote className="h-10 w-10 mx-auto text-cream-200/70" />
          <p className="mt-5 font-serif text-2xl sm:text-3xl leading-relaxed text-balance">
            "Kadanie turned our wedding into a dream. Every guest asked who did the decor —
            and now two of them are taking their courses."
          </p>
          <p className="mt-5 text-sm text-cream-200/80">— Aisha & Daniel, married 2025</p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px max-w-7xl mx-auto mt-20 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-wine-900">Let's create something beautiful</h2>
        <p className="mt-3 text-wine-900/60 max-w-xl mx-auto">
          Browse our collections, book a service, or learn the craft — wherever you are in your journey.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button onClick={() => navigate('/categories')} className="rounded-full bg-wine-700 px-6 py-3 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors active:scale-95">
            Explore collections
          </button>
          <button onClick={() => navigate('/courses')} className="rounded-full border border-wine-700/30 px-6 py-3 text-sm font-semibold text-wine-700 hover:bg-wine-700/10 transition-colors">
            See courses
          </button>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }) {
  return (
    <div className="text-center">
      <Icon className="h-5 w-5 mx-auto text-wine-600" />
      <p className="mt-2 font-serif text-2xl font-semibold text-wine-800">{value}</p>
      <p className="text-xs text-wine-900/60">{label}</p>
    </div>
  );
}
