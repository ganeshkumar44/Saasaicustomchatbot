import { useEffect, useState } from 'react';
import { Globe, Loader2, Mail, Save, Smartphone, X } from 'lucide-react';
import { toast } from 'sonner';
import { ProfileImageField } from '@/app/components/account/ProfileImageField';
import { useProfileImageUpload } from '@/hooks/useProfileImageUpload';
import type { ManageUserDetail, ManageUserFormState } from '@/types/manageUsers.types';
import {
  formatManageUserDate,
  mapManageUserDetailToForm,
  validateManageUserUpdateForm,
} from '@/utils/manageUsers';
import {
  formatRoleLabel,
  getRoleBadgeClassName,
  USER_ROLE_ADMIN,
  USER_ROLE_SUPERADMIN,
  USER_ROLE_USER,
} from '@/utils/userRole';

interface ManageUserEditModalProps {
  open: boolean;
  user: ManageUserDetail | null;
  loading: boolean;
  updating: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (payload: {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    company: string | null;
    website: string | null;
    language: string;
    bio: string | null;
    role: string;
    profile_image?: File;
  }) => Promise<{ success: boolean; message?: string }>;
  onClearError: () => void;
}

const defaultForm: ManageUserFormState = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  company: '',
  website: '',
  language: 'English',
  bio: '',
  role: 'user',
};

export function ManageUserEditModal({
  open,
  user,
  loading,
  updating,
  error,
  onClose,
  onSave,
  onClearError,
}: ManageUserEditModalProps) {
  const [form, setForm] = useState<ManageUserFormState>(defaultForm);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const {
    inputRef,
    selectedFile,
    displayedImageUrl,
    handleFileChange,
    handleChangeAvatarClick,
    resetProfileImageUpload,
  } = useProfileImageUpload({
    initialImageUrl: user?.profile_image ?? null,
    disabled: updating,
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm(mapManageUserDetailToForm(user));
    resetProfileImageUpload();
    setValidationErrors([]);
    // Only reset the form when switching users — not when profile preview state changes.
  }, [user?.user_id]);

  if (!open) {
    return null;
  }

  const handleClose = () => {
    onClearError();
    setValidationErrors([]);
    resetProfileImageUpload();
    onClose();
  };

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    setForm((current) => ({ ...current, mobile: digitsOnly }));
  };

  const handleSave = async () => {
    onClearError();
    setValidationErrors([]);

    const payload = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      company: form.company.trim() || null,
      website: form.website.trim() || null,
      language: form.language.trim(),
      bio: form.bio.trim() || null,
      role: form.role.trim().toLowerCase(),
      ...(selectedFile ? { profile_image: selectedFile } : {}),
    };

    const validation = validateManageUserUpdateForm(payload);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    const result = await onSave(payload);
    if (result.success) {
      toast.success(result.message ?? 'User updated successfully.');
      handleClose();
    }
  };

  const roleBadgeClassName = getRoleBadgeClassName(form.role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold dark:text-white">Edit Information</h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={updating}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-40"
            aria-label="Close edit user modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-5">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : user ? (
            <>
              <ProfileImageField
                inputRef={inputRef}
                imageUrl={displayedImageUrl}
                disabled={updating}
                onOpenPicker={() => inputRef.current?.click()}
                onChangeAvatarClick={handleChangeAvatarClick}
                onFileChange={(file) => void handleFileChange(file)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, firstName: event.target.value }))
                    }
                    disabled={updating}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, lastName: event.target.value }))
                    }
                    disabled={updating}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <Mail className="inline w-4 h-4 mr-1 mb-0.5" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  disabled={updating}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    <Smartphone className="inline w-4 h-4 mr-1 mb-0.5" />
                    Mobile
                  </label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(event) => handlePhoneChange(event.target.value)}
                    disabled={updating}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Role
                  </label>
                  <select
                    value={form.role.toLowerCase()}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, role: event.target.value }))
                    }
                    disabled={updating}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={USER_ROLE_USER}>User</option>
                    <option value={USER_ROLE_ADMIN}>Admin</option>
                    <option value={USER_ROLE_SUPERADMIN}>Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, company: event.target.value }))
                    }
                    disabled={updating}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    <Globe className="inline w-4 h-4 mr-1 mb-0.5" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, website: event.target.value }))
                    }
                    disabled={updating}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Language
                </label>
                <input
                  type="text"
                  value={form.language}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, language: event.target.value }))
                  }
                  disabled={updating}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, bio: event.target.value }))
                  }
                  disabled={updating}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 space-y-3 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Read-only Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Theme</p>
                    <p className="font-medium dark:text-white capitalize">{user.theme}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Role Badge</p>
                    <span
                      className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleBadgeClassName}`}
                    >
                      {formatRoleLabel(form.role)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Total Chatbots</p>
                    <p className="font-medium dark:text-white">{user.total_chatbots}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Published Chatbots</p>
                    <p className="font-medium dark:text-white">{user.total_published_chatbots}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Draft Chatbots</p>
                    <p className="font-medium dark:text-white">{user.total_draft_chatbots}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Deleted Chatbots</p>
                    <p className="font-medium dark:text-white">{user.total_deleted_chatbots}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Created Date</p>
                    <p className="font-medium dark:text-white">
                      {formatManageUserDate(user.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Updated Date</p>
                    <p className="font-medium dark:text-white">
                      {formatManageUserDate(user.updated_at)}
                    </p>
                  </div>
                </div>
              </div>

              {validationErrors.length > 0 && (
                <div className="rounded-lg border border-red-200 dark:border-red-800 p-3 space-y-1">
                  {validationErrors.map((validationError) => (
                    <p key={validationError} className="text-sm text-red-600 dark:text-red-400">
                      {validationError}
                    </p>
                  ))}
                </div>
              )}

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-8">
              Unable to load user details.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={handleClose}
            disabled={updating}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={updating || loading || !user}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
