import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useNavigate } from '@/lib/router';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Categories', path: '/categories' },
  { label: 'Items', path: '/items' },
  { label: 'Services', path: '/services' },
  { label: 'Courses', path: '/courses' },
];

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(window.location.hash.replace(/^#/, '') || '/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onHash = () => {
      setCurrent(window.location.hash.replace(/^#/, '') || '/');
      setOpen(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-wine-700/95 backdrop-blur-md shadow-soft' : 'bg-wine-700'
      }`}
    >
      <div className="container-px max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => go('/')} className="flex items-center gap-2.5 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-wine-700 shadow-soft transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl font-semibold tracking-wide text-cream-100">
              Kadanie <span className="text-cream-200/90">Décor & Events</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = current === l.path;
              return (
                <button
                  key={l.path}
                  onClick={() => go(l.path)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-cream-50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <button
              onClick={() => go('/courses')}
              className="rounded-full bg-cream-100 px-5 py-2.5 text-sm font-semibold text-wine-700 shadow-soft transition-all hover:bg-white hover:shadow-lg active:scale-95"
            >
              Book a Course
            </button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-cream-100 hover:bg-wine-800"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-wine-700 border-t border-wine-800 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="container-px max-w-7xl mx-auto py-4 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => go(l.path)}
              className="text-left px-4 py-3 rounded-xl text-white font-medium hover:bg-wine-800 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go('/courses')}
            className="mt-2 rounded-xl bg-cream-100 px-4 py-3 text-center font-semibold text-wine-700"
          >
            Book a Course
          </button>
        </nav>
      </div>
    </header>
  );
}
