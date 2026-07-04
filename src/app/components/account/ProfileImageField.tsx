import { Camera, User } from 'lucide-react';
import type { RefObject } from 'react';

interface ProfileImageFieldProps {
  inputRef: RefObject<HTMLInputElement | null>;
  imageUrl: string | null;
  disabled?: boolean;
  sizeClass?: string;
  iconClass?: string;
  onOpenPicker: () => void;
  onChangeAvatarClick: () => void;
  onFileChange: (file: File | null) => void;
  changeLabel?: string;
}

export function ProfileImageField({
  inputRef,
  imageUrl,
  disabled = false,
  sizeClass = 'w-20 h-20',
  iconClass = 'w-8 h-8',
  onOpenPicker,
  onChangeAvatarClick,
  onFileChange,
  changeLabel = 'Change avatar',
}: ProfileImageFieldProps) {
  return (
    <div className="flex items-center gap-5">
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          void onFileChange(file);
        }}
      />
      <div className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className={`${sizeClass} rounded-full object-cover`}
          />
        ) : (
          <div
            className={`${sizeClass} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center`}
          >
            <User className={`${iconClass} text-white`} />
          </div>
        )}
        <button
          type="button"
          onClick={onOpenPicker}
          disabled={disabled}
          className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Camera className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
      <button
        type="button"
        onClick={onChangeAvatarClick}
        disabled={disabled}
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {changeLabel}
      </button>
    </div>
  );
}
