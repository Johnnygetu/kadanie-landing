import { Sparkles, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from '@/lib/router';

export default function Footer() {
  const navigate = useNavigate();

  const cols: { title: string; links: { label: string; path: string }[] }[] = [
    {
      title: 'Explore',
      links: [
        { label: 'Categories', path: '/categories' },
        { label: 'Shop Items', path: '/items' },
        { label: 'Book a Service', path: '/services' },
        { label: 'Decor Courses', path: '/courses' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Home', path: '/' },
        { label: 'Our Courses', path: '/courses' },
        { label: 'Services', path: '/services' },
      ],
    },
  ];

  return (
    <footer className="bg-wine-900 text-cream-200 mt-24">
      <div className="container-px max-w-7xl mx-auto py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-wine-700">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-serif text-xl font-semibold text-cream-100">
                Kadanie Décor & Events
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-200/80">
              Curated decoration items, full-service event styling, and professional
              decor courses — turning ordinary spaces into unforgettable moments.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-wine-800 hover:bg-wine-700 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-wine-800 hover:bg-wine-700 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:hello@kadanie.com" className="flex h-10 w-10 items-center justify-center rounded-full bg-wine-800 hover:bg-wine-700 transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-base font-semibold text-cream-100">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => navigate(l.path)}
                      className="text-sm text-cream-200/80 hover:text-cream-100 transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-wine-800 flex flex-col sm:flex-row gap-4 justify-between text-sm text-cream-200/70">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 24 Lily Avenue, Garden City</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 014-2280</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@kadanie.com</span>
          </div>
          <p>© {new Date().getFullYear()} Kadanie Decore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
