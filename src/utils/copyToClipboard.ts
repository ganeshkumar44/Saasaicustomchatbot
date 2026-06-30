import { toast } from 'sonner';

export async function copyToClipboard(text: string, successMessage = 'Copied to clipboard!'): Promise<void> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      toast.success(successMessage);
    } catch {
      toast.error('Failed to copy');
    }

    textArea.remove();
  } catch {
    toast.error('Failed to copy');
  }
}
