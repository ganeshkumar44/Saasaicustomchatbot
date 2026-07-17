import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router';
import { NgMarkDark } from '@/assets/logos';
import { LANDING_PRODUCT_NAME } from '@/constants/landing';

const PRODUCT_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Documentation', href: '#developers' },
] as const;

const COMPANY_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Security', href: '#security' },
  { label: 'Contact', href: '#contact' },
  { label: 'Get Started', to: '/register' },
] as const;

const RESOURCE_LINKS = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
  { label: 'API', href: '#developers' },
  { label: 'Embed Guide', href: '#developers' },
] as const;

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <NgMarkDark className="w-6 h-auto" />
              </span>
              <span className="text-lg font-bold text-white">{LANDING_PRODUCT_NAME}</span>
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              AI-powered chatbots for every website. Train on your content, embed in minutes,
              and deliver always-on support that converts visitors into customers.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-lg border border-slate-700 p-2 hover:bg-slate-900"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-slate-700 p-2 hover:bg-slate-900"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="rounded-lg border border-slate-700 p-2 hover:bg-slate-900"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@nexgenchat.com"
                aria-label="Email"
                className="rounded-lg border border-slate-700 p-2 hover:bg-slate-900"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
        </div>

        <div
          id="privacy"
          className="mt-12 pt-6 border-t border-slate-800 scroll-mt-20 text-xs text-slate-500 space-y-3"
        >
          <p id="terms">
            Privacy Policy and Terms pages are being finalized. For data or legal questions,
            contact hello@nexgenchat.com.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p>
              © {year} {LANDING_PRODUCT_NAME}. All rights reserved.
            </p>
            <p>Built for modern SaaS teams.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLink =
  | { label: string; href: string; to?: undefined }
  | { label: string; to: string; href?: undefined };

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {'to' in link && link.to ? (
              <Link to={link.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
