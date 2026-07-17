import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';
import { NgMarkDark } from '@/assets/logos';
import { LandingButton } from '@/app/components/landing/LandingButton';
import { LANDING_NAV_ITEMS, LANDING_PRODUCT_NAME } from '@/constants/landing';

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/70 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm">
              <NgMarkDark className="w-6 h-auto" />
            </span>
            <span className="text-lg font-bold text-slate-900">{LANDING_PRODUCT_NAME}</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {LANDING_NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <LandingButton to="/signin" variant="ghost" className="px-4 py-2">
              Login
            </LandingButton>
            <LandingButton to="/register" variant="primary" className="px-4 py-2">
              Get Started
            </LandingButton>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1" aria-label="Mobile">
            {LANDING_NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="px-3 py-3 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/signin"
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-800"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-[#2563EB] px-4 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
