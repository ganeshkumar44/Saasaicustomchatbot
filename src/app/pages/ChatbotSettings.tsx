import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Save, Trash2, Copy, Eye, Code, Palette, MessageSquare, Shield, Database, ArrowLeft, Cpu } from 'lucide-react';
import { toast } from 'sonner';

const AI_MODELS = [
  { id: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', desc: 'Most capable multimodal model' },
  { id: 'gpt-4.1', label: 'GPT-4.1', provider: 'OpenAI', desc: 'Latest GPT-4 generation' },
  { id: 'gpt-5.0', label: 'GPT-5.0', provider: 'OpenAI', desc: 'Next-gen reasoning & knowledge' },
  { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', provider: 'Google', desc: 'Long context & multimodal' },
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', provider: 'Google', desc: 'Fast & cost-effective' },
  { id: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'Anthropic', desc: 'Excellent at reasoning & code' },
  { id: 'claude-3-opus', label: 'Claude 3 Opus', provider: 'Anthropic', desc: 'Best for complex analysis' },
  { id: 'llama-3.1', label: 'Llama 3.1', provider: 'Meta', desc: 'Open-source, privacy-friendly' },
];

const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400',
  Google: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400',
  Anthropic: 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400',
  Meta: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400',
};

export function ChatbotSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    name: 'Customer Support Bot',
    greeting: 'Hello! How can I help you today?',
    placeholder: 'Type your message...',
    primaryColor: '#3b82f6',
    position: 'bottom-right',
    showAvatar: true,
    collectEmail: false,
    enableTyping: true,
    // Messages tab
    chatTitle: 'Chat with us',
    welcomeMessage: 'Hi there! 👋 Welcome to our support chat. How can we assist you today?',
    // Security / AI model
    aiModel: 'gpt-4o',
    allowedDomains: '',
    rateLimitEnabled: true,
    rateLimit: 20,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

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
    { id: 'general', label: 'General', icon: Bot },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'knowledge', label: 'Knowledge Base', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'embed', label: 'Embed Code', icon: Code },
  ];

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this chatbot? This action cannot be undone.')) {
      toast.success('Chatbot deleted successfully!');
      navigate('/dashboard');
    }
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
    </label>
  );

  return (
    <div className="p-6">
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
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">

            {/* General */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold dark:text-white mb-6">General Settings</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chatbot Name</label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Greeting Message</label>
                  <textarea
                    value={settings.greeting}
                    onChange={(e) => setSettings({ ...settings, greeting: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium dark:text-white">Typing Indicator</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Show typing animation when bot is responding</p>
                  </div>
                  <Toggle checked={settings.enableTyping} onChange={v => setSettings({ ...settings, enableTyping: v })} />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium dark:text-white">Collect Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ask users for their email before chatting</p>
                  </div>
                  <Toggle checked={settings.collectEmail} onChange={v => setSettings({ ...settings, collectEmail: v })} />
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold dark:text-white mb-6">Appearance</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="w-20 h-12 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
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
                        onClick={() => setSettings({ ...settings, position })}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          settings.position === position
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
                  <Toggle checked={settings.showAvatar} onChange={v => setSettings({ ...settings, showAvatar: v })} />
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
                    value={settings.chatTitle}
                    onChange={(e) => setSettings({ ...settings, chatTitle: e.target.value })}
                    placeholder="e.g., Chat with us"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Welcome Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Welcome Message</label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">The first message shown to users when they open the chat</p>
                  <textarea
                    value={settings.welcomeMessage}
                    onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                    rows={4}
                    placeholder="e.g., Hi there! 👋 How can we help you today?"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right">{settings.welcomeMessage.length} / 500</p>
                </div>

                {/* Input Placeholder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Input Placeholder</label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Placeholder text shown inside the message input field</p>
                  <input
                    type="text"
                    value={settings.placeholder}
                    onChange={(e) => setSettings({ ...settings, placeholder: e.target.value })}
                    placeholder="e.g., Type your message..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Live Preview */}
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Preview</p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden max-w-sm">
                    <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: settings.primaryColor }}>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium text-sm">{settings.chatTitle || 'Chat with us'}</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 min-h-[80px]">
                      <div className="bg-white dark:bg-gray-700 rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm">
                        <p className="text-sm dark:text-white">{settings.welcomeMessage || '...'}</p>
                      </div>
                    </div>
                    <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <p className="text-xs text-gray-400">{settings.placeholder || 'Type your message...'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Knowledge Base */}
            {activeTab === 'knowledge' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold dark:text-white mb-6">Knowledge Base</h2>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                  <div className="flex flex-col items-center">
                    <Database className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Drag and drop files here, or click to browse</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Supported: PDF, DOC, DOCX, TXT, CSV, MD (Max 10MB)
                    </p>
                    <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Choose Files
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded Files (3)</p>
                  {['Product Documentation.pdf', 'FAQ Database.csv', 'User Guide.docx'].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium dark:text-white">{file}</span>
                      </div>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
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
                    {AI_MODELS.map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => setSettings({ ...settings, aiModel: model.id })}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          settings.aiModel === model.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium dark:text-white text-sm">{model.label}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PROVIDER_COLORS[model.provider]}`}>
                            {model.provider}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{model.desc}</p>
                      </button>
                    ))}
                  </div>
                  {settings.aiModel && (
                    <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                      Currently using: <strong>{AI_MODELS.find(m => m.id === settings.aiModel)?.label}</strong>
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Allowed Domains</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Restrict widget to specific domains (comma-separated). Leave empty to allow all.</p>
                  <input
                    type="text"
                    value={settings.allowedDomains}
                    onChange={e => setSettings({ ...settings, allowedDomains: e.target.value })}
                    placeholder="e.g., mysite.com, app.mysite.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium dark:text-white">Rate Limiting</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Limit messages per user per hour</p>
                  </div>
                  <Toggle checked={settings.rateLimitEnabled} onChange={v => setSettings({ ...settings, rateLimitEnabled: v })} />
                </div>

                {settings.rateLimitEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max messages per user / hour
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={settings.rateLimit}
                      onChange={e => setSettings({ ...settings, rateLimit: Number(e.target.value) })}
                      className="w-40 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Embed Code */}
            {activeTab === 'embed' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white mb-2">Embed Code</h2>
                  <p className="text-gray-600 dark:text-gray-400">Copy and paste this code into your website</p>
                </div>

                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
                    <code>{`<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatAI']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
  }(window, document, 'script', 'chatai', 'https://cdn.chatai.com/widget.js'));
  chatai('init', 'YOUR_CHATBOT_ID');
</script>`}</code>
                  </pre>
                  <button
                    onClick={() => {
                      const embedCode = `<script>\n  (function(w,d,s,o,f,js,fjs){\n    w['ChatAI']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };\n    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];\n    js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);\n  }(window, document, 'script', 'chatai', 'https://cdn.chatai.com/widget.js'));\n  chatai('init', 'YOUR_CHATBOT_ID');\n</script>`;
                      copyToClipboard(embedCode);
                    }}
                    className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleDelete}
              className="px-6 py-3 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete Chatbot
            </button>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
