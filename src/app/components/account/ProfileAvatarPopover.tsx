import { useState, type RefObject } from 'react';
import { Camera, Trash2, Upload, User } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover';

interface ProfileAvatarPopoverProps {
  inputRef: RefObject<HTMLInputElement | null>;
  imageUrl: string | null;
  disabled?: boolean;
  removeDisabled?: boolean;
  showRemove?: boolean;
  onFileChange: (file: File | null) => void;
  onChangeAvatar: () => void;
  onRemoveAvatar: () => void;
}

export function ProfileAvatarPopover({
  inputRef,
  imageUrl,
  disabled = false,
  removeDisabled = false,
  showRemove = false,
  onFileChange,
  onChangeAvatar,
  onRemoveAvatar,
}: ProfileAvatarPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleChangeAvatar = () => {
    setOpen(false);
    onChangeAvatar();
  };

  const handleRemoveAvatar = () => {
    setOpen(false);
    onRemoveAvatar();
  };

  return (
    <>
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

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label="Manage profile picture"
            className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#003A96] flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-800">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm">
              <Camera className="w-3.5 h-3.5 text-white" />
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-60 p-0 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-800">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Profile Photo
            </p>
          </div>

          <div className="flex flex-col items-center px-4 py-5 gap-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50 dark:ring-gray-800"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#003A96] flex items-center justify-center ring-4 ring-gray-50 dark:ring-gray-800">
                <User className="w-10 h-10 text-white" />
              </div>
            )}

            <div className="w-full space-y-2">
              <button
                type="button"
                onClick={handleChangeAvatar}
                disabled={disabled}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Upload className="w-4 h-4" />
                Change avatar
              </button>

              {showRemove && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  disabled={disabled || removeDisabled}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Avatar
                </button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
