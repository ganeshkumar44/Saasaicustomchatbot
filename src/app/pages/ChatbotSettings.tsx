import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Save, Trash2, Copy, Eye, Code, Palette, MessageSquare, Shield, Database, ArrowLeft, Cpu, Loader2, FlaskConical } from 'lucide-react';
import { toast } from 'sonner';
import { CHATBOT_AI_MODELS } from '@/constants/chatbot';
import { ChatbotDeleteActionsMenu } from '@/app/components/chatbot/ChatbotDeleteActionsMenu';
import { DeleteChatbotConfirmDialog } from '@/app/components/chatbot/DeleteChatbotConfirmDialog';
import { PermanentlyDeleteChatbotConfirmDialog } from '@/app/components/chatbot/PermanentlyDeleteChatbotConfirmDialog';
import { PlaygroundChatPanel } from '@/app/components/playground/PlaygroundChatPanel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { KnowledgeBaseProcessingBanner } from '@/components/knowledgebase/KnowledgeBaseProcessingBanner';
import { useChatbotSettings } from '@/hooks/useChatbotSettings';
import { useDeleteChatbot } from '@/hooks/useDeleteChatbot';
import { usePermanentlyDeleteChatbot } from '@/hooks/usePermanentlyDeleteChatbot';
import { useActivateChatbot } from '@/hooks/useActivateChatbot';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import type {
  AppearanceSettingsForm,
  GeneralSettingsForm,
  MessageSettingsForm,
  SecuritySettingsForm,
} from '@/types/chatbotSettings.types';
import {
  mapDetailsToAppearanceForm,
  mapDetailsToGeneralForm,
  mapDetailsToMessageForm,
  mapDetailsToSecurityForm,
} from '@/utils/chatbotSettingsForm';
import {
  getKnowledgebaseDocumentsKey,
  getKnowledgebaseUrlDocuments,
  getUploadedKnowledgebaseDocuments,
} from '@/utils/knowledgebaseDocuments';
import { isAllowedKnowledgeFile, validateKnowledgeBaseUrl } from '@/utils/chatbotValidation';
import {
  canDeleteChatbot,
  canActivateChatbot,
  canPermanentlyDeleteChatbot,
} from '@/utils/chatbotPermissions';
import { isChatbotDeleted } from '@/utils/chatbotList';

export function ChatbotSettings() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [generalForm, setGeneralForm] = useState<GeneralSettingsForm>({
    chatbot_name: '',
    description: '',
    typing_indicator: true,
  });
  const [appearanceForm, setAppearanceForm] = useState<AppearanceSettingsForm>({
    primary_color: '#000000',
    widget_position: 'bottom-right',
    show_avatar: true,
  });
  const [messageForm, setMessageForm] = useState<MessageSettingsForm>({
    chat_title: '',
    welcome_message: '',
    input_placeholder: '',
  });
  const [securityForm, setSecurityForm] = useState<SecuritySettingsForm>({
    ai_model: CHATBOT_AI_MODELS[0].apiValue,
    allowed_domains: '',
  });
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newUrls, setNewUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [deleteDocumentIds, setDeleteDocumentIds] = useState<number[]>([]);

  const {
    chatbotId,
    chatbotDetails,
    loading,
    error,
    invalidChatbotId,
    generalLoading,
    appearanceLoading,
    messageLoading,
    securityLoading,
    knowledgebaseLoading,
    isKnowledgeBaseProcessing,
    refetch,
    updateGeneralSettings,
    updateAppearanceSettings,
    updateMessageSettings,
    updateSecuritySettings,
    updateKnowledgeBase,
    parseAllowedDomainsInput,
  } = useChatbotSettings();

  const handleDeleteSuccess = useCallback(() => {
    navigate('/dashboard/chatbots');
  }, [navigate]);

  const {
    deleteLoading,
    deleteError,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  } = useDeleteChatbot({
    onSuccess: handleDeleteSuccess,
  });

  const {
    permanentDeleteLoading,
    permanentDeleteError,
    isPermanentDeleteDialogOpen,
    openPermanentDeleteDialog,
    closePermanentDeleteDialog,
    confirmPermanentDelete,
  } = usePermanentlyDeleteChatbot({
    onSuccess: handleDeleteSuccess,
  });

  const handleActivateSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const {
    activateLoading,
    activateChatbot: activateChatbotHandler,
  } = useActivateChatbot({
    onSuccess: handleActivateSuccess,
  });

  const isDeletedChatbot = isChatbotDeleted(chatbotDetails?.status ?? '');
  const showSoftDelete = canDeleteChatbot(user, chatbotDetails?.user_id) && !isDeletedChatbot;
  const showPermanentDelete = canPermanentlyDeleteChatbot(
    user,
    chatbotDetails?.owner_role,
  );
  const showDeleteMenu = showSoftDelete || showPermanentDelete;
  const showActivateButton = isDeletedChatbot && canActivateChatbot(user);
  const isDeleteActionLoading = deleteLoading || permanentDeleteLoading;

  const knowledgebaseDocumentsKey = getKnowledgebaseDocumentsKey(
    chatbotDetails?.knowledgebase_documents,
  );

  useEffect(() => {
    if (!chatbotDetails) {
      return;
    }

    setGeneralForm(mapDetailsToGeneralForm(chatbotDetails));
    setAppearanceForm(mapDetailsToAppearanceForm(chatbotDetails));
    setMessageForm(mapDetailsToMessageForm(chatbotDetails));
    setSecurityForm(mapDetailsToSecurityForm(chatbotDetails));
    setNewFiles([]);
    setDeleteDocumentIds([]);
  }, [
    chatbotDetails?.id,
    chatbotDetails?.settings_updated_at,
    chatbotDetails?.updated_at,
    knowledgebaseDocumentsKey,
  ]);

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success('Code copied to clipboard!');
      } else {
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
          toast.success('Code copied to clipboard!');
        } catch {
          toast.error('Failed to copy code');
        }
        textArea.remove();
      }
    } catch {
      toast.error('Failed to copy code');
    }
  };

  const tabs = [
    { id: 'playground', label: 'Playground', icon: FlaskConical },
    { id: 'general', label: 'General', icon: Bot },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'knowledge', label: 'Knowledge Base', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'embed', label: 'Embed Code', icon: Code },
  ];

  const activeTabSaveLoading =
    activeTab === 'general'
      ? generalLoading
      : activeTab === 'appearance'
        ? appearanceLoading
        : activeTab === 'messages'
          ? messageLoading
          : activeTab === 'security'
            ? securityLoading
            : activeTab === 'knowledge'
              ? knowledgebaseLoading
              : false;

  const isEditableTab = ['general', 'appearance', 'messages', 'knowledge', 'security'].includes(
    activeTab,
  );

  const handleSaveChanges = async () => {
    if (!chatbotId || !isEditableTab) {
      return;
    }

    switch (activeTab) {
      case 'general':
        await updateGeneralSettings({
          chatbot_id: chatbotId,
          chatbot_name: generalForm.chatbot_name,
          description: generalForm.description,
          typing_indicator: generalForm.typing_indicator,
        });
        break;
      case 'appearance':
        await updateAppearanceSettings({
          chatbot_id: chatbotId,
          primary_color: appearanceForm.primary_color,
          widget_position: appearanceForm.widget_position,
          show_avatar: appearanceForm.show_avatar,
        });
        break;
      case 'messages':
        await updateMessageSettings({
          chatbot_id: chatbotId,
          chat_title: messageForm.chat_title,
          welcome_message: messageForm.welcome_message,
          input_placeholder: messageForm.input_placeholder,
        });
        break;
      case 'security':
        await updateSecuritySettings({
          chatbot_id: chatbotId,
          ai_model: securityForm.ai_model,
          allowed_domains: parseAllowedDomainsInput(securityForm.allowed_domains),
        });
        break;
      case 'knowledge': {
        const saved = await updateKnowledgeBase({
          chatbot_id: chatbotId,
          delete_document_ids: deleteDocumentIds,
          files: newFiles,
          urls: newUrls,
        });

        if (saved) {
          setNewFiles([]);
          setNewUrls([]);
          setUrlInput('');
          setDeleteDocumentIds([]);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleChooseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length === 0) {
      return;
    }

    const invalidFiles = selectedFiles.filter((file) => !isAllowedKnowledgeFile(file));
    if (invalidFiles.length > 0) {
      toast.error(`Unsupported file type: ${invalidFiles[0].name}`);
      event.target.value = '';
      return;
    }

    setNewFiles((previousFiles) => [...previousFiles, ...selectedFiles]);
    event.target.value = '';
  };

  const handleRemoveExistingDocument = (documentId: number) => {
    setDeleteDocumentIds((previousIds) =>
      previousIds.includes(documentId)
        ? previousIds
        : [...previousIds, documentId],
    );
  };

  const handleRemoveNewFile = (fileIndex: number) => {
    setNewFiles((previousFiles) => previousFiles.filter((_, index) => index !== fileIndex));
  };

  const handleAddUrl = () => {
    const validation = validateKnowledgeBaseUrl(urlInput);
    if (!validation.isValid) {
      toast.error(validation.errors[0]);
      return;
    }

    const trimmedUrl = urlInput.trim();
    const normalizedUrl = trimmedUrl.toLowerCase();
    const alreadyAdded = newUrls.some((url) => url.toLowerCase() === normalizedUrl);
    const alreadyExists = getKnowledgebaseUrlDocuments(
      chatbotDetails?.knowledgebase_documents,
    ).some(
      (document) =>
        !deleteDocumentIds.includes(document.id)
        && (document.url ?? '').toLowerCase() === normalizedUrl,
    );

    if (alreadyAdded || alreadyExists) {
      toast.error('This URL is already in the knowledge base.');
      return;
    }

    setNewUrls((previousUrls) => [...previousUrls, trimmedUrl]);
    setUrlInput('');
  };

  const handleRemoveNewUrl = (urlIndex: number) => {
    setNewUrls((previousUrls) => previousUrls.filter((_, index) => index !== urlIndex));
  };

  const Toggle = ({
    checked,
    onChange,
    disabled,
  }: {
    checked: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
  }) => (
    <label className="relative inline-flex items-center cursor-default">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div
        className={`w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
          checked
            ? 'bg-blue-600 after:translate-x-full after:border-white'
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      />
    </label>
  );

  if (invalidChatbotId) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-red-600 dark:text-red-400">Invalid chatbot ID.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loading && !chatbotDetails) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error && !chatbotDetails) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center space-y-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!chatbotDetails) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">No chatbot details found.</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  const embedCode = chatbotDetails.embed_code;
  const uploadedFileDocuments = getUploadedKnowledgebaseDocuments(
    chatbotDetails.knowledgebase_documents,
  );
  const uploadedUrlDocuments = getKnowledgebaseUrlDocuments(
    chatbotDetails.knowledgebase_documents,
  );
  const visibleUploadedFileDocuments = uploadedFileDocuments.filter(
    (document) => !deleteDocumentIds.includes(document.id),
  );
  const visibleUploadedUrlDocuments = uploadedUrlDocuments.filter(
    (document) => !deleteDocumentIds.includes(document.id),
  );

  return (
    <div className="p-6">
      <DeleteChatbotConfirmDialog
        open={isDialogOpen}
        loading={deleteLoading}
        error={deleteError}
        onCancel={closeDeleteDialog}
        onConfirm={() => void confirmDelete()}
      />
      <PermanentlyDeleteChatbotConfirmDialog
        open={isPermanentDeleteDialogOpen}
        loading={permanentDeleteLoading}
        error={permanentDeleteError}
        onCancel={closePermanentDeleteDialog}
        onConfirm={() => void confirmPermanentDelete()}
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.csv,.md"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold dark:text-white">Chatbot Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Configure and customize your chatbot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mobile tab dropdown */}
        <div className="md:hidden">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger
              aria-label="Select settings section"
              className="h-12 w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm font-medium text-gray-900 dark:text-white shadow-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
            >
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              {tabs.map((tab) => (
                <SelectItem
                  key={tab.id}
                  value={tab.id}
                  className="rounded-md py-2.5 pl-3 pr-8 text-sm font-medium text-gray-900 dark:text-white cursor-pointer focus:bg-blue-50 focus:text-blue-700 dark:focus:bg-blue-950/60 dark:focus:text-blue-300"
                >
                  <span className="flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs Sidebar — tablet/desktop */}
        <div className="hidden md:block lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const isPlaygroundTab = tab.id === 'playground';

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isPlaygroundTab && isActive
                      ? 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 ring-1 ring-violet-300 dark:ring-violet-700'
                      : isPlaygroundTab
                        ? 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-950'
                        : isActive
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeTab === 'playground' && chatbotId ? (
            <PlaygroundChatPanel
              chatbotId={chatbotId}
              chatbotName={chatbotDetails.chatbot_name ?? 'Chatbot'}
              enabled={activeTab === 'playground'}
            />
          ) : (
          <>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">

            {/* General */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold dark:text-white mb-6">General Settings</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chatbot Name</label>
                  <input
                    type="text"
                    value={generalForm.chatbot_name}
                    onChange={(event) =>
                      setGeneralForm({ ...generalForm, chatbot_name: event.target.value })}
                    disabled={generalLoading}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chatbot Description</label>
                  <textarea
                    value={generalForm.description}
                    onChange={(event) =>
                      setGeneralForm({ ...generalForm, description: event.target.value })}
                    disabled={generalLoading}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium dark:text-white">Typing Indicator</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Show typing animation when bot is responding</p>
                  </div>
                  <Toggle
                    checked={generalForm.typing_indicator}
                    onChange={(value) =>
                      setGeneralForm({ ...generalForm, typing_indicator: value })}
                    disabled={generalLoading}
                  />
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold dark:text-white mb-6">Appearance</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
                  <div className="flex items-center gap-3 md:gap-4">
                    <input
                      type="color"
                      value={appearanceForm.primary_color}
                      onChange={(event) =>
                        setAppearanceForm({ ...appearanceForm, primary_color: event.target.value })}
                      disabled={appearanceLoading}
                      aria-label="Primary color picker"
                      className="h-12 w-12 min-w-12 shrink-0 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer bg-transparent p-0 overflow-hidden appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-md md:h-12 md:w-20 md:min-w-20"
                    />
                    <input
                      type="text"
                      value={appearanceForm.primary_color}
                      onChange={(event) =>
                        setAppearanceForm({ ...appearanceForm, primary_color: event.target.value })}
                      disabled={appearanceLoading}
                      className="min-w-0 flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Widget Position</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['bottom-right', 'bottom-left', 'top-right', 'top-left'].map((position) => (
                      <button
                        key={position}
                        type="button"
                        onClick={() =>
                          setAppearanceForm({ ...appearanceForm, widget_position: position })}
                        disabled={appearanceLoading}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          appearanceForm.widget_position === position
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-medium dark:text-white capitalize">{position.replace('-', ' ')}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium dark:text-white">Show Avatar</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Display chatbot avatar in messages</p>
                  </div>
                  <Toggle
                    checked={appearanceForm.show_avatar}
                    onChange={(value) =>
                      setAppearanceForm({ ...appearanceForm, show_avatar: value })}
                    disabled={appearanceLoading}
                  />
                </div>
              </div>
            )}

            {/* Messages */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">Messages</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize the text users see when they open your chat widget</p>
                </div>

                {/* Chat Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Chat Title</label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Displayed in the header of the chat widget</p>
                  <input
                    type="text"
                    value={messageForm.chat_title}
                    onChange={(event) =>
                      setMessageForm({ ...messageForm, chat_title: event.target.value })}
                    disabled={messageLoading}
                    placeholder="e.g., Chat with us"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Welcome Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Welcome Message</label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">The first message shown to users when they open the chat</p>
                  <textarea
                    value={messageForm.welcome_message}
                    onChange={(event) =>
                      setMessageForm({ ...messageForm, welcome_message: event.target.value })}
                    disabled={messageLoading}
                    rows={4}
                    placeholder="e.g., Hi there! 👋 How can we help you today?"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right">{messageForm.welcome_message.length} / 500</p>
                </div>

                {/* Input Placeholder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Input Placeholder</label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Placeholder text shown inside the message input field</p>
                  <input
                    type="text"
                    value={messageForm.input_placeholder}
                    onChange={(event) =>
                      setMessageForm({ ...messageForm, input_placeholder: event.target.value })}
                    disabled={messageLoading}
                    placeholder="e.g., Type your message..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Live Preview */}
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Preview</p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden max-w-sm">
                    <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: appearanceForm.primary_color }}>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium text-sm">{messageForm.chat_title || 'Chat with us'}</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 min-h-[80px]">
                      <div className="bg-white dark:bg-gray-700 rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm">
                        <p className="text-sm dark:text-white">{messageForm.welcome_message || '...'}</p>
                      </div>
                    </div>
                    <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <p className="text-xs text-gray-400">{messageForm.input_placeholder || 'Type your message...'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Knowledge Base */}
            {activeTab === 'knowledge' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold dark:text-white mb-6">Knowledge Base</h2>

                {(knowledgebaseLoading || isKnowledgeBaseProcessing) && (
                  <KnowledgeBaseProcessingBanner context="settings" />
                )}

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                  <div className="flex flex-col items-center">
                    <Database className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Drag and drop files here, or click to browse</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Supported: PDF, DOC, DOCX, TXT, CSV, MD (Max 2MB per file)
                    </p>
                    <button
                      type="button"
                      onClick={handleChooseFiles}
                      disabled={knowledgebaseLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Choose Files
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Add Website URL
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(event) => setUrlInput(event.target.value)}
                      placeholder="https://example.com"
                      disabled={knowledgebaseLoading}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          handleAddUrl();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddUrl}
                      disabled={knowledgebaseLoading || !urlInput.trim()}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {visibleUploadedFileDocuments.length > 0
                  || visibleUploadedUrlDocuments.length > 0
                  || newFiles.length > 0
                  || newUrls.length > 0 ? (
                    <>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Knowledge Sources (
                        {visibleUploadedFileDocuments.length
                          + visibleUploadedUrlDocuments.length
                          + newFiles.length
                          + newUrls.length}
                        )
                      </p>
                      {visibleUploadedFileDocuments.map((document) => (
                        <div
                          key={document.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <span className="text-sm font-medium dark:text-white truncate">
                              {document.original_file_name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingDocument(document.id)}
                            disabled={knowledgebaseLoading}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      {visibleUploadedUrlDocuments.map((document) => (
                        <div
                          key={document.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Database className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span className="text-sm font-medium dark:text-white truncate">
                              {document.url}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingDocument(document.id)}
                            disabled={knowledgebaseLoading}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      {newFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${file.size}-${index}`}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium dark:text-white">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveNewFile(index)}
                            disabled={knowledgebaseLoading}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      {newUrls.map((url, index) => (
                        <div
                          key={`${url}-${index}`}
                          className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Database className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span className="text-sm font-medium dark:text-white truncate">
                              {url}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveNewUrl(index)}
                            disabled={knowledgebaseLoading}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No documents or URLs uploaded yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold dark:text-white mb-6">Security & AI Model</h2>

                {/* AI Model Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Model</label>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Choose which AI model powers this chatbot. Changes take effect immediately.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {CHATBOT_AI_MODELS.map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() =>
                          setSecurityForm({ ...securityForm, ai_model: model.apiValue })}
                        disabled={securityLoading}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          securityForm.ai_model === model.apiValue
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium dark:text-white text-sm">{model.label}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                            {model.provider}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{model.desc}</p>
                      </button>
                    ))}
                  </div>
                  {securityForm.ai_model && (
                    <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                      Currently using: <strong>{securityForm.ai_model}</strong>
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Allowed Domains</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Restrict widget to specific domains (comma-separated). Leave empty to allow all.</p>
                  <input
                    type="text"
                    value={securityForm.allowed_domains}
                    onChange={(event) =>
                      setSecurityForm({ ...securityForm, allowed_domains: event.target.value })}
                    disabled={securityLoading}
                    placeholder="e.g., mysite.com, app.mysite.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Embed Code */}
            {activeTab === 'embed' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white mb-2">Embed Code</h2>
                  <p className="text-gray-600 dark:text-gray-400">Copy and paste this code into your website</p>
                </div>

                <div>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
                    <code>{embedCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              {showDeleteMenu && (
                <ChatbotDeleteActionsMenu
                  variant="button"
                  disabled={isDeleteActionLoading}
                  loading={isDeleteActionLoading}
                  showDelete={showSoftDelete}
                  showPermanentDelete={showPermanentDelete}
                  onDelete={() => {
                    if (chatbotId) {
                      openDeleteDialog(chatbotId);
                    }
                  }}
                  onPermanentDelete={() => {
                    if (chatbotId) {
                      openPermanentDeleteDialog(chatbotId);
                    }
                  }}
                />
              )}
              {showActivateButton && (
                <button
                  type="button"
                  onClick={() => {
                    if (chatbotId) {
                      void activateChatbotHandler(chatbotId);
                    }
                  }}
                  disabled={activateLoading}
                  className="px-6 py-3 border border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-950 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {activateLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : null}
                  Activate Chatbot
                </button>
              )}
              {!showDeleteMenu && !showActivateButton && <div />}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  if (chatbotId) {
                    navigate(`/dashboard/chatbot/${chatbotId}/preview`);
                  }
                }}
                aria-label="Preview"
                title="Preview"
                className="px-3 sm:px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              {activeTab === 'embed' ? (
                <button
                  type="button"
                  onClick={() => copyToClipboard(embedCode)}
                  aria-label="Copy"
                  title="Copy"
                  className="px-3 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-5 h-5" />
                  <span className="hidden sm:inline">Copy</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleSaveChanges()}
                  disabled={isDeletedChatbot || !isEditableTab || activeTabSaveLoading}
                  aria-label={activeTabSaveLoading ? 'Saving...' : 'Save Changes'}
                  title={activeTabSaveLoading ? 'Saving...' : 'Save Changes'}
                  className="px-3 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {activeTabSaveLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">
                    {activeTabSaveLoading ? 'Saving...' : 'Save Changes'}
                  </span>
                </button>
              )}
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
