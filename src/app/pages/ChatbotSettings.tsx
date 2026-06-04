import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Save, Trash2, Copy, Eye, Code, Palette, MessageSquare, Shield, Database, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

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
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const copyToClipboard = async (text: string) => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success('Code copied to clipboard!');
      } else {
        // Fallback for older browsers or when Clipboard API is blocked
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
        } catch (err) {
          toast.error('Failed to copy code');
        }
        textArea.remove();
      }
    } catch (err) {
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
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white mb-6">General Settings</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Chatbot Name
                  </label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Greeting Message
                  </label>
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableTyping}
                      onChange={(e) => setSettings({ ...settings, enableTyping: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium dark:text-white">Collect Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ask users for their email before chatting</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.collectEmail}
                      onChange={(e) => setSettings({ ...settings, collectEmail: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white mb-6">Appearance</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Color
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Widget Position
                  </label>
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showAvatar}
                      onChange={(e) => setSettings({ ...settings, showAvatar: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'knowledge' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white mb-6">Knowledge Base</h2>
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                  <div className="flex flex-col items-center">
                    <Database className="w-12 h-12 text-gray-400 mb-4" />
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

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded Files (3)</p>
                  {['Product Documentation.pdf', 'FAQ Database.csv', 'User Guide.docx'].map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
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
                      const embedCode = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatAI']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
  }(window, document, 'script', 'chatai', 'https://cdn.chatai.com/widget.js'));
  chatai('init', 'YOUR_CHATBOT_ID');
</script>`;
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
