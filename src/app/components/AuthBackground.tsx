import type { ReactNode } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AuthBackground({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left side - Nature Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback
          src="https://saasaicustomchatbot-buc.s3.ap-south-1.amazonaws.com/images/Gemini_Generated_Image_68qdix68qdix68qd.webp"
          alt="Intelligent Conversations AI Enabled"
          className="absolute inset-0 w-full h-full object-cover"
        />
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
