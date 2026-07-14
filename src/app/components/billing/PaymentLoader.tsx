import { Loader2 } from 'lucide-react';

interface PaymentLoaderProps {
  label?: string;
}

export function PaymentLoader({ label = 'Creating Payment...' }: PaymentLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3 text-gray-600 dark:text-gray-400">
      <Loader2 className="w-8 h-8 animate-spin text-[#003A96]" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
