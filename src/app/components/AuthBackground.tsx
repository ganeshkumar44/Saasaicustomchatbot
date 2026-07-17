import type { ReactNode } from 'react';
import { Bot, MessagesSquare, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { NgMarkDark } from '@/assets/logos';

const PLATFORM_HIGHLIGHTS = [
  {
    icon: Bot,
    title: 'Custom AI Chatbots',
    description: 'Train intelligent assistants on your own knowledge base in minutes.',
  },
  {
    icon: MessagesSquare,
    title: 'Human-like Conversations',
    description: 'Deliver accurate, context-aware replies across every channel.',
  },
  {
    icon: Zap,
    title: 'Instant Deployment',
    description: 'Embed on any website with a single snippet, no code required.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Scalable',
    description: 'Enterprise-grade security built to grow with your business.',
  },
] as const;

export function AuthBackground({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Left side - Futuristic AI light panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,58,150,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,58,150,0.08) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
          aria-hidden
        />
        {/* Glow blobs */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute bottom-[-6rem] right-[-4rem] w-[28rem] h-[28rem] rounded-full bg-indigo-300/30 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl"
          aria-hidden
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center w-full px-12 xl:px-16 py-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-blue-100 flex items-center justify-center">
              <NgMarkDark className="w-7 h-auto" />
            </div>
            <span className="text-xl font-bold text-gray-900">NexGenChat</span>
          </div>

          <span className="inline-flex items-center gap-2 self-start rounded-full bg-blue-100/70 px-3 py-1 text-xs font-medium text-[#003A96] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Customer Engagement
          </span>

          <h1 className="text-2xl xl:text-3xl font-bold leading-tight text-gray-900">
            Build smarter{' '}
            <span className="bg-gradient-to-r from-[#003A96] to-indigo-500 bg-clip-text text-transparent">
              AI chatbots
            </span>
            <span className="block">for your business</span>
          </h1>

          <p className="mt-4 text-sm text-gray-600">
            Create, customize, and deploy intelligent chatbots trained on your data —
            delivering instant, human-like support to your customers around the clock.
          </p>

          <ul className="mt-10 space-y-5">
            {PLATFORM_HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-blue-100 text-[#003A96]">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Auth Form (scrolls when content exceeds viewport) */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto overscroll-contain flex justify-center p-6 lg:p-12 bg-[var(--color-bg)]">
        <div className="w-full max-w-md my-auto py-2">
          {children}
        </div>
      </div>
    </div>
  );
}
