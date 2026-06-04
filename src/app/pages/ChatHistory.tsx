import { useState } from 'react';
import { Search, Filter, Download, MessageSquare, Clock, User, ChevronRight } from 'lucide-react';

const mockConversations = [
  {
    id: 1,
    user: 'Alice Johnson',
    email: 'alice@example.com',
    messages: 12,
    duration: '8 min',
    timestamp: '2024-01-15 14:32',
    status: 'resolved',
    preview: 'How do I reset my password?',
  },
  {
    id: 2,
    user: 'Bob Smith',
    email: 'bob@example.com',
    messages: 5,
    duration: '3 min',
    timestamp: '2024-01-15 13:45',
    status: 'resolved',
    preview: 'What are your business hours?',
  },
  {
    id: 3,
    user: 'Carol White',
    email: 'carol@example.com',
    messages: 18,
    duration: '15 min',
    timestamp: '2024-01-15 12:20',
    status: 'active',
    preview: 'I need help with my order',
  },
  {
    id: 4,
    user: 'David Brown',
    email: 'david@example.com',
    messages: 7,
    duration: '5 min',
    timestamp: '2024-01-15 11:10',
    status: 'resolved',
    preview: 'Product pricing question',
  },
  {
    id: 5,
    user: 'Emma Wilson',
    email: 'emma@example.com',
    messages: 23,
    duration: '22 min',
    timestamp: '2024-01-15 10:05',
    status: 'escalated',
    preview: 'Technical issue with payment',
  },
];

export function ChatHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const conversation = selectedConversation
    ? mockConversations.find((c) => c.id === selectedConversation)
    : null;

  const mockMessages = [
    { id: 1, sender: 'user', text: 'How do I reset my password?', time: '14:32' },
    { id: 2, sender: 'bot', text: 'I can help you reset your password. Please click on the "Forgot Password" link on the login page.', time: '14:32' },
    { id: 3, sender: 'user', text: "I don't see that link", time: '14:33' },
    { id: 4, sender: 'bot', text: 'The link is located below the password input field. Would you like me to send you a direct link via email?', time: '14:33' },
    { id: 5, sender: 'user', text: 'Yes, please', time: '14:34' },
    { id: 6, sender: 'bot', text: 'I\'ve sent a password reset link to your registered email address. Please check your inbox.', time: '14:34' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Chat History</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">View and analyze past conversations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
              {mockConversations
                .filter(
                  (conv) =>
                    conv.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    conv.preview.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left ${
                      selectedConversation === conv.id ? 'bg-blue-50 dark:bg-blue-950' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                          {conv.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium dark:text-white text-sm">{conv.user}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{conv.email}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {conv.preview}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {conv.messages}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {conv.duration}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          conv.status === 'resolved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                            : conv.status === 'active'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400'
                        }`}
                      >
                        {conv.status}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Conversation Details */}
        <div className="lg:col-span-2">
          {selectedConversation && conversation ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden h-[calc(100vh-180px)] flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {conversation.user.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold dark:text-white">{conversation.user}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{conversation.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{conversation.timestamp}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{conversation.duration}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      } rounded-2xl px-4 py-3`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 h-[calc(100vh-180px)] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold dark:text-white mb-2">No Conversation Selected</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a conversation from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
