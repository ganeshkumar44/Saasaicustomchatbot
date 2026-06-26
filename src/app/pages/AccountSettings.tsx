import { useEffect, useState } from 'react';
import { User, Mail, Lock, Bell, Shield, Trash2, Camera, Save, Eye, EyeOff, Globe, Smartphone, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAccountSettings } from '@/hooks/useAccountSettings';
import { updateUserPassword } from '@/store/accountSettingsThunk';
import type { ProfileFormState, UserDetails } from '@/types/account.types';
import {
  validateUpdatePasswordForm,
  validateUpdateProfileForm,
} from '@/utils/accountValidation';

type ConfirmAction = 'activate' | 'deactivate' | 'delete';

const defaultProfile: ProfileFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  timezone: 'America/New_York',
  language: 'English',
  bio: '',
};

function mapUserDetailsToProfile(details: UserDetails): ProfileFormState {
  return {
    firstName: details.first_name,
    lastName: details.last_name,
    email: details.email,
    phone: details.mobile ?? '',
    company: details.company ?? '',
    website: details.website ?? '',
    timezone: 'America/New_York',
    language: details.language,
    bio: details.bio ?? '',
  };
}

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

  const {
    userDetails,
    profileLoading,
    profileUpdating,
    passwordUpdating,
    activateLoading,
    deactivateLoading,
    deleteLoading,
    error,
    getUserDetails,
    updateProfile,
    updatePassword,
    activateAccount,
    deactivateAccount,
    deleteAccount,
    clearError,
    resetState,
  } = useAccountSettings();

  const [profile, setProfile] = useState<ProfileFormState>(defaultProfile);
  const [profileValidationErrors, setProfileValidationErrors] = useState<string[]>([]);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<string[]>([]);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNewConversation: true,
    emailWeeklyReport: true,
    emailBilling: true,
    emailProduct: false,
    pushNewConversation: false,
    pushAlerts: true,
    smsAlerts: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'danger', label: 'Danger Zone', icon: Shield },
  ];

  useEffect(() => {
    if (activeTab === 'profile' || activeTab === 'danger') {
      void getUserDetails();
    }
  }, [activeTab, getUserDetails]);

  useEffect(() => {
    if (userDetails) {
      setProfile(mapUserDetailsToProfile(userDetails));
    }
  }, [userDetails]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  const handleSaveProfile = async () => {
    clearError();
    setProfileValidationErrors([]);

    const payload = {
      first_name: profile.firstName.trim(),
      last_name: profile.lastName.trim(),
      email: profile.email.trim(),
      mobile: profile.phone.trim(),
      company: profile.company.trim() || null,
      website: profile.website.trim() || null,
      language: profile.language.trim(),
      bio: profile.bio.trim() || null,
    };

    const validation = validateUpdateProfileForm(payload);
    if (!validation.isValid) {
      setProfileValidationErrors(validation.errors);
      return;
    }

    await updateProfile(payload);
  };

  const handleSavePassword = async () => {
    clearError();
    setPasswordValidationErrors([]);

    const payload = {
      current_password: passwordForm.currentPassword,
      new_password: passwordForm.newPassword,
      confirm_new_password: passwordForm.confirmNewPassword,
    };

    const validation = validateUpdatePasswordForm(payload);
    if (!validation.isValid) {
      setPasswordValidationErrors(validation.errors);
      return;
    }

    const result = await updatePassword(payload);
    if (updateUserPassword.fulfilled.match(result)) {
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  };

  const handleConfirmAction = async () => {
    if (!confirmAction || !userDetails) {
      return;
    }

    if (confirmAction === 'activate') {
      await activateAccount({ user_id: userDetails.id });
    } else if (confirmAction === 'deactivate') {
      await deactivateAccount();
    } else if (confirmAction === 'delete') {
      await deleteAccount({ user_id: userDetails.id });
    }

    setConfirmAction(null);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 15);
    setProfile((current) => ({ ...current, phone: digitsOnly }));
  };

  const isConfirmLoading =
    activateLoading || deactivateLoading || deleteLoading;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">
              {confirmAction === 'activate' && 'Activate Account'}
              {confirmAction === 'deactivate' && 'Deactivate Account'}
              {confirmAction === 'delete' && 'Delete Account'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {confirmAction === 'activate' &&
                'Are you sure you want to activate your account? You will regain full access to your account.'}
              {confirmAction === 'deactivate' &&
                'Are you sure you want to deactivate your account? You will be logged out and will need to reactivate your account to regain access.'}
              {confirmAction === 'delete' &&
                'Are you sure you want to permanently delete your account? This action cannot be undone and all associated data will be removed.'}
            </p>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setConfirmAction(null);
                  clearError();
                }}
                disabled={isConfirmLoading}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={() => void handleConfirmAction()}
                disabled={isConfirmLoading}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-40 flex items-center gap-2 ${
                  confirmAction === 'delete'
                    ? 'bg-red-600 hover:bg-red-700'
                    : confirmAction === 'deactivate'
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isConfirmLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Account Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account details and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Tabs sidebar */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
              {profileLoading && !userDetails ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              ) : error && !userDetails ? (
                <div className="text-center py-16 space-y-4">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  <button
                    onClick={() => void getUserDetails()}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  {/* Avatar section */}
                  <div className="flex items-center gap-5 pb-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="relative">
                      {userDetails?.profile_image ? (
                        <img
                          src={userDetails.profile_image}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 hover:bg-blue-700 transition-colors">
                        <Camera className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold dark:text-white">{profile.firstName} {profile.lastName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
                      <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        Change avatar
                      </button>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))}
                        disabled={profileUpdating}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
                        disabled={profileUpdating}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      <Mail className="inline w-4 h-4 mr-1 mb-0.5" />Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                      disabled={profileUpdating}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        <Smartphone className="inline w-4 h-4 mr-1 mb-0.5" />Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={e => handlePhoneChange(e.target.value)}
                        disabled={profileUpdating}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company</label>
                      <input
                        type="text"
                        value={profile.company}
                        onChange={e => setProfile(p => ({ ...p, company: e.target.value }))}
                        disabled={profileUpdating}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      <Globe className="inline w-4 h-4 mr-1 mb-0.5" />Website
                    </label>
                    <input
                      type="url"
                      value={profile.website}
                      onChange={e => setProfile(p => ({ ...p, website: e.target.value }))}
                      disabled={profileUpdating}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Timezone</label>
                      <select
                        value={profile.timezone}
                        onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}
                        disabled={profileUpdating}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                        <option value="Asia/Kolkata">India (IST)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Language</label>
                      <select
                        value={profile.language}
                        onChange={e => setProfile(p => ({ ...p, language: e.target.value }))}
                        disabled={profileUpdating}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Portuguese</option>
                        <option>Japanese</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                      disabled={profileUpdating}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {profileValidationErrors.length > 0 && (
                    <div className="rounded-lg border border-red-200 dark:border-red-800 p-3 space-y-1">
                      {profileValidationErrors.map((validationError) => (
                        <p key={validationError} className="text-sm text-red-600 dark:text-red-400">
                          {validationError}
                        </p>
                      ))}
                    </div>
                  )}

                  {error && userDetails && (
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => void handleSaveProfile()}
                      disabled={profileUpdating}
                      className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {profileUpdating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save Changes
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              {/* Change Password */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
                <h2 className="font-semibold dark:text-white">Change Password</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={e => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                      placeholder="Enter current password"
                      disabled={passwordUpdating}
                      className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                      placeholder="Enter new password"
                      disabled={passwordUpdating}
                      className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordForm.confirmNewPassword}
                      onChange={e => setPasswordForm(p => ({ ...p, confirmNewPassword: e.target.value }))}
                      placeholder="Confirm new password"
                      disabled={passwordUpdating}
                      className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {passwordValidationErrors.length > 0 && (
                  <div className="rounded-lg border border-red-200 dark:border-red-800 p-3 space-y-1">
                    {passwordValidationErrors.map((validationError) => (
                      <p key={validationError} className="text-sm text-red-600 dark:text-red-400">
                        {validationError}
                      </p>
                    ))}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => void handleSavePassword()}
                    disabled={passwordUpdating}
                    className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {passwordUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Auth */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold dark:text-white">Two-Factor Authentication</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">Disabled</span>
                </div>
                <button
                  onClick={() => toast.info('2FA setup coming soon')}
                  className="mt-4 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Enable 2FA
                </button>
              </div>

              {/* Active Sessions */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="font-semibold dark:text-white mb-4">Active Sessions</h2>
                {[
                  { device: 'Chrome on macOS', location: 'New York, US', current: true, time: 'Now' },
                  { device: 'Safari on iPhone', location: 'New York, US', current: false, time: '2 hours ago' },
                ].map((session, i) => (
                  <div key={i} className={`flex items-center justify-between py-3 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium dark:text-white">{session.device}</p>
                        <p className="text-xs text-gray-500">{session.location} · {session.time}</p>
                      </div>
                    </div>
                    {session.current ? (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">Current</span>
                    ) : (
                      <button className="text-xs text-red-500 hover:text-red-700 font-medium">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
              {[
                {
                  section: 'Email Notifications',
                  items: [
                    { key: 'emailNewConversation' as const, label: 'New conversation started', desc: 'Get notified when a user starts a new chat' },
                    { key: 'emailWeeklyReport' as const, label: 'Weekly report', desc: 'Summary of your chatbot performance each week' },
                    { key: 'emailBilling' as const, label: 'Billing updates', desc: 'Invoices, payment confirmations, and plan changes' },
                    { key: 'emailProduct' as const, label: 'Product updates', desc: 'News about new features and improvements' },
                  ],
                },
                {
                  section: 'Push Notifications',
                  items: [
                    { key: 'pushNewConversation' as const, label: 'New conversation', desc: 'Real-time alerts for new chats' },
                    { key: 'pushAlerts' as const, label: 'System alerts', desc: 'Important account and usage alerts' },
                  ],
                },
                {
                  section: 'SMS Notifications',
                  items: [
                    { key: 'smsAlerts' as const, label: 'Critical alerts only', desc: 'SMS for high-priority issues only' },
                  ],
                },
              ].map(group => (
                <div key={group.section}>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{group.section}</h3>
                  <div className="space-y-4">
                    {group.items.map(item => (
                      <div key={item.key} className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium dark:text-white">{item.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleNotification(item.key)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            notifications[item.key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notifications[item.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => toast.success('Notification preferences saved')}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Danger Zone Tab */}
          {activeTab === 'danger' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-900/40 p-6">
                <h2 className="font-semibold text-red-600 dark:text-red-400 mb-1">Danger Zone</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">These actions are irreversible. Please proceed with caution.</p>

                <div className="space-y-4">
                  <div className="flex items-start justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <div>
                      <p className="text-sm font-medium dark:text-white">Export account data</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Download all your data including chatbots, conversations, and settings</p>
                    </div>
                    <button
                      onClick={() => toast.success('Export started — you\'ll receive an email when ready')}
                      className="flex-shrink-0 ml-4 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Export
                    </button>
                  </div>

                  {userDetails && !userDetails.is_active && (
                    <div className="flex items-start justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div>
                        <p className="text-sm font-medium dark:text-white">Activate account</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Reactivate your account to regain full access.</p>
                      </div>
                      <button
                        onClick={() => setConfirmAction('activate')}
                        disabled={activateLoading}
                        className="flex-shrink-0 ml-4 px-4 py-2 border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors disabled:opacity-40"
                      >
                        Activate
                      </button>
                    </div>
                  )}

                  {userDetails?.is_active && (
                    <div className="flex items-start justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div>
                        <p className="text-sm font-medium dark:text-white">Deactivate account</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Temporarily disable your account. You can reactivate at any time.</p>
                      </div>
                      <button
                        onClick={() => setConfirmAction('deactivate')}
                        disabled={deactivateLoading}
                        className="flex-shrink-0 ml-4 px-4 py-2 border border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors disabled:opacity-40"
                      >
                        Deactivate
                      </button>
                    </div>
                  )}

                  <div className="flex items-start justify-between p-4 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/10">
                    <div>
                      <p className="text-sm font-medium text-red-700 dark:text-red-400">Delete account</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Permanently delete your account and all associated data. This cannot be undone.</p>
                    </div>
                    <button
                      onClick={() => setConfirmAction('delete')}
                      disabled={deleteLoading}
                      className="flex-shrink-0 ml-4 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-40"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
