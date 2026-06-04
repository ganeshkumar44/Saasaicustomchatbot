import { MessageSquare, Users, TrendingUp, Zap, ArrowUp, ArrowDown, MoreVertical } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const statsData = [
  { id: 'mon', name: 'Mon', conversations: 240, users: 120 },
  { id: 'tue', name: 'Tue', conversations: 380, users: 180 },
  { id: 'wed', name: 'Wed', conversations: 320, users: 150 },
  { id: 'thu', name: 'Thu', conversations: 450, users: 220 },
  { id: 'fri', name: 'Fri', conversations: 520, users: 280 },
  { id: 'sat', name: 'Sat', conversations: 290, users: 140 },
  { id: 'sun', name: 'Sun', conversations: 350, users: 170 },
];

const recentChats = [
  { id: 1, user: 'Alice Johnson', message: 'How do I reset my password?', time: '2 min ago', status: 'active' },
  { id: 2, user: 'Bob Smith', message: 'What are your business hours?', time: '15 min ago', status: 'resolved' },
  { id: 3, user: 'Carol White', message: 'I need help with my order', time: '1 hour ago', status: 'active' },
  { id: 4, user: 'David Brown', message: 'Product pricing question', time: '2 hours ago', status: 'resolved' },
];

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUp className="w-4 h-4" />
              12%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Conversations</p>
          <p className="text-3xl font-bold dark:text-white mt-1">2,543</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUp className="w-4 h-4" />
              8%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Active Users</p>
          <p className="text-3xl font-bold dark:text-white mt-1">1,234</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
              <ArrowDown className="w-4 h-4" />
              3%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Resolution Rate</p>
          <p className="text-3xl font-bold dark:text-white mt-1">94.5%</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUp className="w-4 h-4" />
              15%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Response Time</p>
          <p className="text-3xl font-bold dark:text-white mt-1">1.2s</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold dark:text-white">Conversations</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last 7 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={statsData}>
              <defs>
                <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Area type="monotone" dataKey="conversations" stroke="#3b82f6" fillOpacity={1} fill="url(#colorConversations)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold dark:text-white">Active Users</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last 7 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="users" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Chats */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold dark:text-white">Recent Conversations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {recentChats.map((chat) => (
                <tr key={chat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                        {chat.user.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium dark:text-white">{chat.user}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 dark:text-gray-300">{chat.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {chat.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        chat.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {chat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
