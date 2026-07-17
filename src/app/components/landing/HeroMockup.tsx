import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Bot, Sparkles, TrendingUp } from 'lucide-react';

export function HeroMockup() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-violet-400/10 to-cyan-400/20 blur-2xl" />

      <div className="relative rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-900/10 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 text-xs font-medium text-slate-500">NexGenChat Dashboard</span>
        </div>

        <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[110px_1fr]">
          <aside className="border-r border-slate-100 bg-slate-50/70 p-3 space-y-2">
            {['Overview', 'Bots', 'Knowledge', 'Analytics'].map((item, index) => (
              <div
                key={item}
                className={`rounded-lg px-2 py-2 text-[11px] font-medium ${
                  index === 0
                    ? 'bg-[#2563EB] text-white'
                    : 'text-slate-500 bg-white border border-slate-100'
                }`}
              >
                {item}
              </div>
            ))}
          </aside>

          <div className="p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: 'Conversations', value: '12.4k' },
                { label: 'Resolution', value: '94%' },
                { label: 'Avg Reply', value: '1.2s' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
                >
                  <p className="text-[10px] text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-sm sm:text-lg font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-700">Live Chat Preview</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-xs text-slate-700">
                  Do you offer multi-language support?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-[#2563EB] px-3 py-2 text-xs text-white">
                  Yes — NexGenChat can converse in multiple languages based on visitor preference.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingCard
        className="absolute -left-3 sm:-left-6 top-16"
        delay={0.15}
        reduceMotion={Boolean(reduceMotion)}
      >
        <Bot className="h-4 w-4 text-[#2563EB]" />
        <div>
          <p className="text-xs font-semibold text-slate-900">AI Ready</p>
          <p className="text-[10px] text-slate-500">Knowledge indexed</p>
        </div>
      </FloatingCard>

      <FloatingCard
        className="absolute -right-2 sm:-right-4 top-8"
        delay={0.3}
        reduceMotion={Boolean(reduceMotion)}
      >
        <TrendingUp className="h-4 w-4 text-[#7C3AED]" />
        <div>
          <p className="text-xs font-semibold text-slate-900">+38% CSAT</p>
          <p className="text-[10px] text-slate-500">This month</p>
        </div>
      </FloatingCard>

      <FloatingCard
        className="absolute right-4 sm:right-10 -bottom-4"
        delay={0.45}
        reduceMotion={Boolean(reduceMotion)}
      >
        <Sparkles className="h-4 w-4 text-[#06B6D4]" />
        <div>
          <p className="text-xs font-semibold text-slate-900">Smart Prompt</p>
          <p className="text-[10px] text-slate-500">On-brand replies</p>
        </div>
      </FloatingCard>
    </div>
  );
}

function FloatingCard({
  children,
  className,
  delay,
  reduceMotion,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  reduceMotion: boolean;
}) {
  const content = (
    <div
      className={`flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-xl backdrop-blur ${className ?? ''}`}
    >
      {children}
    </div>
  );

  if (reduceMotion) {
    return content;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { delay, duration: 0.4 },
        y: { delay: delay + 0.4, duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-xl backdrop-blur">
        {children}
      </div>
    </motion.div>
  );
}
