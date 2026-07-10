import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Sparkles, Settings, ArrowRight, Upload, CheckCircle, X, Loader2, Globe } from 'lucide-react';
import { toast } from 'sonner';
import {
  CHATBOT_AI_MODELS,
  CHATBOT_LANGUAGE,
  CHATBOT_PERSONALITY_OPTIONS,
  getChatbotAiModelByApiValue,
  getChatbotAiModelById,
} from '@/constants/chatbot';
import { useChatbot } from '@/hooks/useChatbot';
import { KnowledgeBaseProcessingBanner } from '@/components/knowledgebase/KnowledgeBaseProcessingBanner';
import {
  validateChatbotBasicInfo,
  validateChatbotBehaviour,
  validateKnowledgeBaseFiles,
  validateKnowledgeBaseUpload,
  validateKnowledgeBaseUrl,
} from '@/utils/chatbotValidation';

export function CreateChatbot() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    chatbotId,
    chatbotReview,
    currentStep,
    createDraftLoading,
    createDraftError,
    basicInfoLoading,
    basicInfoError,
    behaviourLoading,
    behaviourError,
    knowledgeBaseLoading,
    knowledgeBaseError,
    isKnowledgeBaseProcessing,
    reviewLoading,
    reviewError,
    publishLoading,
    publishError,
    publishResponse,
    publishSuccess,
    ensureChatbotDraft,
    updateBasicInfo,
    updateBehaviour,
    uploadKnowledgeBase,
    getReview,
    publishChatbot,
    goToStep,
    clearErrors,
    resetWizard,
  } = useChatbot();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    personality: 'professional',
    aiModel: CHATBOT_AI_MODELS[0].id as (typeof CHATBOT_AI_MODELS)[number]['id'],
    language: CHATBOT_LANGUAGE.id as string,
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const step = currentStep;
  const hasFiles = uploadedFiles.length > 0;
  const hasUrls = uploadedUrls.length > 0;
  const hasKnowledgeSources = hasFiles || hasUrls;
  const isUploadingKnowledgeBase = step === 3 && knowledgeBaseLoading;
  const isStepLoading =
    createDraftLoading
    || basicInfoLoading
    || behaviourLoading
    || knowledgeBaseLoading
    || reviewLoading
    || publishLoading;

  useEffect(() => {
    if (!chatbotId && !createDraftLoading) {
      void ensureChatbotDraft();
    }
  }, [chatbotId, createDraftLoading, ensureChatbotDraft]);

  useEffect(() => {
    if (!chatbotId) {
      return;
    }

    setFormData({
      name: '',
      description: '',
      personality: 'professional',
      aiModel: CHATBOT_AI_MODELS[0].id,
      language: CHATBOT_LANGUAGE.id as string,
    });
    setUploadedFiles([]);
    setUploadedUrls([]);
    setUrlInput('');
    setValidationErrors([]);
  }, [chatbotId]);

  useEffect(() => {
    if (!chatbotReview) {
      return;
    }

    const personalityId =
      CHATBOT_PERSONALITY_OPTIONS.find(
        (option) => option.apiValue === chatbotReview.personality,
      )?.id ?? 'professional';

    const aiModelId = chatbotReview.ai_model
      ? getChatbotAiModelByApiValue(chatbotReview.ai_model).id
      : CHATBOT_AI_MODELS[0].id;

    setFormData((prev) => ({
      ...prev,
      name: chatbotReview.chatbot_name ?? prev.name,
      description: chatbotReview.description ?? prev.description,
      personality: personalityId,
      aiModel: aiModelId,
      language: CHATBOT_LANGUAGE.id,
    }));
  }, [chatbotReview]);

  useEffect(() => {
    if (currentStep === 4 && chatbotId) {
      void getReview();
    }
  }, [currentStep, chatbotId, getReview]);

  useEffect(() => {
    if (publishSuccess && publishResponse) {
      toast.success('Chatbot published successfully');
      navigate(`/dashboard/chatbot/${publishResponse.chatbot_id}/settings`);
    }
  }, [publishSuccess, publishResponse, navigate]);

  useEffect(() => {
    return () => {
      resetWizard();
    };
  }, [resetWizard]);

  const addFiles = (files: FileList | null) => {
    if (!files) {
      return;
    }

    const incoming = Array.from(files);
    const validation = validateKnowledgeBaseFiles([...uploadedFiles, ...incoming]);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    const existingKeys = new Set(uploadedFiles.map((file) => `${file.name}-${file.size}`));
    const merged = [...uploadedFiles];

    incoming.forEach((file) => {
      const fileKey = `${file.name}-${file.size}`;
      if (!existingKeys.has(fileKey)) {
        existingKeys.add(fileKey);
        merged.push(file);
      }
    });

    setValidationErrors([]);
    setUploadedFiles(merged);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(event.target.files);
    event.target.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, fileIndex) => fileIndex !== index));
  };

  const handleAddUrl = () => {
    const validation = validateKnowledgeBaseUrl(urlInput);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    const trimmedUrl = urlInput.trim();
    const normalizedUrl = trimmedUrl.toLowerCase();

    if (uploadedUrls.some((url) => url.toLowerCase() === normalizedUrl)) {
      setValidationErrors(['This URL has already been added.']);
      return;
    }

    setValidationErrors([]);
    setUploadedUrls((previousUrls) => [...previousUrls, trimmedUrl]);
    setUrlInput('');
  };

  const removeUrl = (index: number) => {
    setUploadedUrls((previousUrls) => previousUrls.filter((_, urlIndex) => urlIndex !== index));
  };

  const handleBasicInfoNext = async () => {
    clearErrors();
    const validation = validateChatbotBasicInfo(formData.name, formData.description);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    await updateBasicInfo({
      chatbot_name: formData.name.trim(),
      description: formData.description.trim(),
    });
  };

  const handleBehaviourNext = async () => {
    clearErrors();
    const validation = validateChatbotBehaviour(
      formData.personality,
      formData.aiModel,
      formData.language,
    );

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    const personalityOption = CHATBOT_PERSONALITY_OPTIONS.find(
      (option) => option.id === formData.personality,
    );

    await updateBehaviour({
      personality: personalityOption?.apiValue ?? 'Professional',
      ai_model: getChatbotAiModelById(formData.aiModel).apiValue,
      language: CHATBOT_LANGUAGE.apiValue,
    });
  };

  const handleKnowledgeNext = async () => {
    clearErrors();
    const validation = validateKnowledgeBaseUpload(uploadedFiles, uploadedUrls);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    await uploadKnowledgeBase({
      files: uploadedFiles,
      urls: uploadedUrls,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
    setValidationErrors([]);
    await publishChatbot();
  };

  const handleNext = async () => {
    if (step === 1) {
      await handleBasicInfoNext();
      return;
    }

    if (step === 2) {
      await handleBehaviourNext();
      return;
    }

    if (step === 3) {
      await handleKnowledgeNext();
    }
  };

  const reviewName = (chatbotReview?.chatbot_name ?? formData.name) || '—';
  const reviewPersonality = chatbotReview?.personality ?? formData.personality;
  const reviewAiModel = chatbotReview?.ai_model ?? getChatbotAiModelById(formData.aiModel).label;
  const reviewLanguage = chatbotReview?.language ?? CHATBOT_LANGUAGE.label;
  const reviewKnowledgeSummary = chatbotReview?.knowledgebase
    ? `${chatbotReview.knowledgebase.total_knowledge_sources} source(s)`
    : hasKnowledgeSources
      ? `${uploadedFiles.length} file(s), ${uploadedUrls.length} URL(s)`
      : '—';

  const stepError =
    createDraftError
    ?? basicInfoError
    ?? behaviourError
    ?? (isUploadingKnowledgeBase || isKnowledgeBaseProcessing ? null : knowledgeBaseError)
    ?? reviewError
    ?? publishError;

  if (createDraftLoading && !chatbotId) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.csv,.md"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Create New Chatbot</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Set up your AI-powered chatbot in minutes</p>
      </div>

      {isKnowledgeBaseProcessing && (
        <div className="mb-6">
          <KnowledgeBaseProcessingBanner context="create" />
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[
          { n: 1, label: 'Basic Info' },
          { n: 2, label: 'Behavior' },
          { n: 3, label: 'Knowledge' },
          { n: 4, label: 'Review' },
        ].map(({ n, label }) => (
          <div key={n} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  n <= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {n}
              </div>
              <span className={`text-xs ${n <= step ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>{label}</span>
            </div>
            {n < 4 && (
              <div
                className={`flex-1 h-1 mx-3 mb-5 ${n < step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'}`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Basic Information</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Give your chatbot a name and purpose</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chatbot Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="e.g., Customer Support Bot"
                required
                disabled={basicInfoLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                placeholder="Describe what your chatbot does..."
                required
                disabled={basicInfoLoading}
              />
            </div>
          </div>
        )}

        {/* Step 2: Personality & Behavior */}
        {step === 2 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Personality & Behavior</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Configure how your chatbot responds</p>
              </div>
            </div>

            {/* Personality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Personality</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CHATBOT_PERSONALITY_OPTIONS.map((personality) => (
                  <button
                    key={personality.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, personality: personality.id })}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.personality === personality.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                    disabled={behaviourLoading}
                  >
                    <p className="font-medium dark:text-white capitalize">{personality.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {personality.id === 'professional' && 'Formal and business-like'}
                      {personality.id === 'friendly' && 'Warm and approachable'}
                      {personality.id === 'casual' && 'Relaxed and conversational'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">AI Model</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CHATBOT_AI_MODELS.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, aiModel: model.id })}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.aiModel === model.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    disabled={behaviourLoading}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium dark:text-white">{model.label}</span>
                      <div className="flex items-center gap-1.5">
                        {model.id === 'gemini-2.5-flash' && (
                          <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                            Fast
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                          {model.provider}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{model.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                disabled={behaviourLoading}
              >
                <option value={CHATBOT_LANGUAGE.id}>{CHATBOT_LANGUAGE.label}</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Knowledge Base */}
        {step === 3 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Knowledge Base</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upload training data or add website URLs for your chatbot</p>
              </div>
            </div>

            <div
              className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center transition-colors ${
                knowledgeBaseLoading
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer'
              }`}
              onClick={knowledgeBaseLoading ? undefined : handleFileUpload}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (!knowledgeBaseLoading) {
                  addFiles(event.dataTransfer.files);
                }
              }}
            >
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Supported: PDF, DOC, DOCX, TXT, CSV, MD (Max 4MB per file)
                </p>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={knowledgeBaseLoading}
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
                  disabled={knowledgeBaseLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white disabled:opacity-60"
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
                  disabled={knowledgeBaseLoading || !urlInput.trim()}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  Add URL
                </button>
              </div>
            </div>

            {isUploadingKnowledgeBase && (
              <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                  <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                  <span>Uploading knowledge base files...</span>
                </div>
              </div>
            )}

            {!isUploadingKnowledgeBase && isKnowledgeBaseProcessing && (
              <KnowledgeBaseProcessingBanner context="create" />
            )}

            {(hasFiles || hasUrls) && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Knowledge Sources ({uploadedFiles.length + uploadedUrls.length})
                </p>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${file.size}-${index}`}
                    className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
                      disabled={knowledgeBaseLoading}
                    >
                      <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                ))}
                {uploadedUrls.map((url, index) => (
                  <div
                    key={`${url}-${index}`}
                    className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Globe className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{url}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeUrl(index)}
                      className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
                      disabled={knowledgeBaseLoading}
                    >
                      <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!hasKnowledgeSources && !knowledgeBaseLoading && (
              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Required:</strong> Upload at least one file or add a website URL to continue.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Review & Create</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Confirm your chatbot configuration</p>
              </div>
            </div>

            {reviewLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: 'Name', value: reviewName },
                  { label: 'Personality', value: reviewPersonality },
                  { label: 'AI Model', value: reviewAiModel },
                  { label: 'Language', value: reviewLanguage },
                  { label: 'Knowledge Sources', value: reviewKnowledgeSummary },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
                    <span className="text-sm font-medium dark:text-white capitalize">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {validationErrors.length > 0 && !isUploadingKnowledgeBase && (
          <div className="rounded-lg border border-red-200 dark:border-red-800 p-3 space-y-1">
            {validationErrors.map((validationError) => (
              <p key={validationError} className="text-sm text-red-600 dark:text-red-400">
                {validationError}
              </p>
            ))}
          </div>
        )}

        {stepError && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">{stepError}</p>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => goToStep(step - 1)}
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              disabled={isStepLoading}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => void handleNext()}
              disabled={isStepLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {(step === 1 && basicInfoLoading) || (step === 2 && behaviourLoading) || isUploadingKnowledgeBase ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isUploadingKnowledgeBase ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                <>
                  {step === 3 ? 'Continue' : 'Next'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          ) : (
            <button
              type="submit"
              disabled={publishLoading || reviewLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {publishLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Chatbot
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
