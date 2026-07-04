import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  validateProfileImage,
  validateProfileImageIntegrity,
} from '@/utils/accountValidation';

interface UseProfileImageUploadOptions {
  initialImageUrl?: string | null;
  disabled?: boolean;
}

export function useProfileImageUpload({
  initialImageUrl = null,
  disabled = false,
}: UseProfileImageUploadOptions = {}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const displayedImageUrl = previewUrl ?? initialImageUrl ?? null;

  const openPicker = useCallback(() => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  }, [disabled]);

  const clearSelection = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [previewUrl]);

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (!file || disabled) {
        return;
      }

      const validation = validateProfileImage(file);
      if (!validation.isValid) {
        toast.error(validation.errors[0]);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        return;
      }

      const integrityValidation = await validateProfileImageIntegrity(file);
      if (!integrityValidation.isValid) {
        toast.error(integrityValidation.errors[0]);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        return;
      }

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    },
    [disabled, previewUrl],
  );

  const handleChangeAvatarClick = useCallback(() => {
    if (selectedFile) {
      clearSelection();
      return;
    }

    openPicker();
  }, [clearSelection, openPicker, selectedFile]);

  const resetProfileImageUpload = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return {
    inputRef,
    selectedFile,
    previewUrl,
    displayedImageUrl,
    openPicker,
    clearSelection,
    handleFileChange,
    handleChangeAvatarClick,
    resetProfileImageUpload,
  };
}
