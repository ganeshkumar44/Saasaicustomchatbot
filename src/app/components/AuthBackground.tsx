import type { ReactNode } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AuthBackground({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Nature Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback
          src="https://saasaicustomchatbot-buc.s3.ap-south-1.amazonaws.com/images/Gemini_Generated_Image_68qdix68qdix68qd.webp"
          alt="Intelligent Conversations AI Enabled"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-[var(--color-bg)]">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
