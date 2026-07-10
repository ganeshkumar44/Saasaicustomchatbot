import { ConfirmDialog } from '@/app/components/ui/ConfirmDialog';

interface PermanentlyDeleteChatbotConfirmDialogProps {
  open: boolean;
  loading?: boolean;
  error?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function PermanentlyDeleteChatbotConfirmDialog({
  open,
  loading = false,
  error = null,
  onCancel,
  onConfirm,
}: PermanentlyDeleteChatbotConfirmDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      title="Permanently Delete Chatbot"
      message={
        'This action cannot be undone.\nThe chatbot and all related data will be permanently deleted forever.'
      }
      confirmLabel="Permanently Delete"
      confirmVariant="danger"
      loading={loading}
      error={error}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
