import type { ReactNode } from 'react';

export function AuthBackground({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #24243e 60%, #0f0c29 100%)' }}
    >
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large orb top-left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            top: '-15%', left: '-10%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'floatA 12s ease-in-out infinite',
          }}
        />
        {/* Large orb bottom-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            bottom: '-20%', right: '-10%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(99,102,241,0.12) 50%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'floatB 15s ease-in-out infinite',
          }}
        />
        {/* Medium orb centre */}
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            top: '30%', left: '40%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(59,130,246,0.1) 60%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'floatC 18s ease-in-out infinite',
          }}
        />
        {/* Small accent top-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: 250, height: 250,
            top: '5%', right: '15%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
            filter: 'blur(35px)',
            animation: 'floatA 10s ease-in-out infinite reverse',
          }}
        />
        {/* Small accent bottom-left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 200, height: 200,
            bottom: '10%', left: '10%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)',
            filter: 'blur(30px)',
            animation: 'floatB 9s ease-in-out infinite reverse',
          }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -40px) scale(1.05); }
          66%       { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-40px, 30px) scale(1.06); }
          70%       { transform: translate(25px, -25px) scale(0.95); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-30px, -50px) scale(1.08); }
        }
      `}</style>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        <div
          className="rounded-2xl p-8 border border-white/10 shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
