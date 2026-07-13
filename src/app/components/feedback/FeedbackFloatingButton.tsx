import { useMemo, useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { FeedbackModal } from '@/app/components/feedback/FeedbackModal';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import { selectUserDetails } from '@/store/accountSettingsSelectors';

export function FeedbackFloatingButton() {
  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const userDetails = useAppSelector(selectUserDetails);

  const initialName = useMemo(() => {
    const first = user?.first_name?.trim() ?? '';
    const last = user?.last_name?.trim() ?? '';
    return `${first} ${last}`.trim();
  }, [user?.first_name, user?.last_name]);

  const initialEmail = user?.email?.trim() ?? '';
  const initialPhone = userDetails?.mobile?.trim() ?? '';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2 rounded-l-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg pl-3 pr-3 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
        aria-label="Open feedback form"
      >
        {/* <MessageSquarePlus className="w-5 h-5 shrink-0" /> */}
        <span
          className="text-xs font-semibold tracking-wide uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Feedback
        </span>
      </button>

      <FeedbackModal
        open={open}
        initialName={initialName}
        initialEmail={initialEmail}
        initialPhone={initialPhone}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
