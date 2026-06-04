import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Sparkles, MessageSquare, Settings, ArrowRight, Upload, CheckCircle, X } from 'lucide-react';

const AI_MODELS = [
  { id: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', desc: 'Most capable multimodal model', badge: 'Popular' },
  { id: 'gpt-4.1', label: 'GPT-4.1', provider: 'OpenAI', desc: 'Latest GPT-4 generation', badge: 'New' },
  { id: 'gpt-5.0', label: 'GPT-5.0', provider: 'OpenAI', desc: 'Next-gen reasoning & knowledge', badge: 'Latest' },
  { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', provider: 'Google', desc: 'Long context & multimodal', badge: null },
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', provider: 'Google', desc: 'Fast & cost-effective', badge: 'Fast' },
  { id: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'Anthropic', desc: 'Excellent at reasoning & code', badge: null },
  { id: 'claude-3-opus', label: 'Claude 3 Opus', provider: 'Anthropic', desc: 'Best for complex analysis', badge: null },
  { id: 'llama-3.1', label: 'Llama 3.1', provider: 'Meta', desc: 'Open-source, privacy-friendly', badge: null },
];

const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400',
  Google: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400',
  Anthropic: 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400',
  Meta: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400',
};

export function CreateChatbot() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    personality: 'professional',
    aiModel: 'gpt-4o',
    language: 'en',
    uploadedFiles: [] as string[],
  });

  const handleFileUpload = () => {
    setFormData({ ...formData, uploadedFiles: [...formData.uploadedFiles, 'document.pdf'] });
  };

  const removeFile = (index: number) => {
    setFormData({
      ...formData,
      uploadedFiles: formData.uploadedFiles.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/chatbot/1/settings');
  };

  const hasFiles = formData.uploadedFiles.length > 0;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Create New Chatbot</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Set up your AI-powered chatbot in minutes</p>
      </div>

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
                {['professional', 'friendly', 'casual'].map((personality) => (
                  <button
                    key={personality}
                    type="button"
                    onClick={() => setFormData({ ...formData, personality })}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.personality === personality
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium dark:text-white capitalize">{personality}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {personality === 'professional' && 'Formal and business-like'}
                      {personality === 'friendly' && 'Warm and approachable'}
                      {personality === 'casual' && 'Relaxed and conversational'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">AI Model</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AI_MODELS.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, aiModel: model.id })}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.aiModel === model.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium dark:text-white">{model.label}</span>
                      <div className="flex items-center gap-1.5">
                        {model.badge && (
                          <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                            {model.badge}
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PROVIDER_COLORS[model.provider]}`}>
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
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="hi">Hindi</option>
                <option value="pt">Portuguese</option>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Upload training data for your chatbot</p>
              </div>
            </div>

            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
              onClick={handleFileUpload}
            >
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Supported: PDF, DOC, DOCX, TXT, CSV, MD (Max 10MB)
                </p>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose Files
                </button>
              </div>
            </div>

            {hasFiles && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded Files ({formData.uploadedFiles.length})</p>
                {formData.uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{file}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!hasFiles && (
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Optional:</strong> You can skip this step and add knowledge base files later from chatbot settings.
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

            <div className="space-y-4">
              {[
                { label: 'Name', value: formData.name || '—' },
                { label: 'Personality', value: formData.personality },
                { label: 'AI Model', value: AI_MODELS.find(m => m.id === formData.aiModel)?.label ?? formData.aiModel },
                { label: 'Language', value: formData.language === 'en' ? 'English' : formData.language },
                { label: 'Knowledge Files', value: hasFiles ? `${formData.uploadedFiles.length} file(s)` : 'None (can add later)' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
                  <span className="text-sm font-medium dark:text-white capitalize">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <div className="flex items-center gap-3">
              {/* Step 3: show "Skip & Continue" only when no files are selected */}
              {step === 3 && !hasFiles && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  Skip & Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
              {(step !== 3 || hasFiles) && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  {step === 3 ? 'Continue' : 'Next'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Create Chatbot
              <Sparkles className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
