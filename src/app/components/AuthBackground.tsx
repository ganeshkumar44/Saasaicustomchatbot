import type { ReactNode } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AuthBackground({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Nature Visual */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600340053706-32d1278206ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Peaceful forest with sunlight filtering through trees"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-[var(--color-bg)]">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
