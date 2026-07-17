import { useState } from 'react';
import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';

const TABS = [
  'Dashboard',
  'Analytics',
  'Chat History',
  'Settings',
  'Knowledge Base',
  'Users',
  'Billing',
  'Dark Mode',
] as const;

type Tab = (typeof TABS)[number];

const TAB_CONTENT: Record<Tab, { title: string; lines: string[] }> = {
  Dashboard: {
    title: 'Command center for every chatbot',
    lines: ['Active bots overview', 'Recent conversations', 'Quick usage snapshot'],
  },
  Analytics: {
    title: 'Measure what matters',
    lines: ['Conversation trends', 'Resolution rate', 'Visitor growth'],
  },
  'Chat History': {
    title: 'Review every conversation',
    lines: ['Searchable transcripts', 'Resolved vs pending', 'Export-ready records'],
  },
  Settings: {
    title: 'Brand and behavior controls',
    lines: ['Widget appearance', 'Welcome message', 'Domain allowlists'],
  },
  'Knowledge Base': {
    title: 'Ground answers in your content',
    lines: ['PDF uploads', 'Website URL indexing', 'Source freshness'],
  },
  Users: {
    title: 'Role-aware access',
    lines: ['Team invitations', 'Admin permissions', 'Account oversight'],
  },
  Billing: {
    title: 'Plan visibility',
    lines: ['Current plan status', 'Usage awareness', 'Upgrade path'],
  },
  'Dark Mode': {
    title: 'Comfortable for every shift',
    lines: ['Light and dark themes', 'Saved preference', 'Operator-friendly UI'],
  },
};

export function DashboardPreviewSection() {
  const [active, setActive] = useState<Tab>('Dashboard');
  const content = TAB_CONTENT[active];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Product preview"
            title="A dashboard built for operators"
            description="Explore the surfaces your team will use every day — from analytics to knowledge and settings."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  active === tab
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6 sm:p-8 text-white shadow-2xl">
            <p className="text-xs uppercase tracking-wider text-blue-200">{active}</p>
            <h3 className="mt-2 text-2xl font-bold">{content.title}</h3>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {content.lines.map((line) => (
                <li
                  key={line}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-100"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
