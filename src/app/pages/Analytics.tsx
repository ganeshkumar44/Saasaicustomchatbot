import { TrendingUp, Users, MessageSquare, Clock, Target, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const conversationData = [
  { id: 'jan1', date: 'Jan 1', conversations: 120, resolved: 110, escalated: 10 },
  { id: 'jan2', date: 'Jan 2', conversations: 180, resolved: 165, escalated: 15 },
  { id: 'jan3', date: 'Jan 3', conversations: 150, resolved: 140, escalated: 10 },
  { id: 'jan4', date: 'Jan 4', conversations: 220, resolved: 200, escalated: 20 },
  { id: 'jan5', date: 'Jan 5', conversations: 280, resolved: 260, escalated: 20 },
  { id: 'jan6', date: 'Jan 6', conversations: 200, resolved: 185, escalated: 15 },
  { id: 'jan7', date: 'Jan 7', conversations: 240, resolved: 225, escalated: 15 },
];

const responseTimeData = [
  { id: 'h00', hour: '00:00', time: 1.2 },
  { id: 'h04', hour: '04:00', time: 0.8 },
  { id: 'h08', hour: '08:00', time: 2.1 },
  { id: 'h12', hour: '12:00', time: 3.5 },
  { id: 'h16', hour: '16:00', time: 2.8 },
  { id: 'h20', hour: '20:00', time: 1.9 },
];

const categoriesData = [
  { id: 'tech', name: 'Technical Support', value: 35, color: '#3b82f6' },
  { id: 'bill', name: 'Billing', value: 25, color: '#8b5cf6' },
  { id: 'gen', name: 'General Inquiry', value: 20, color: '#10b981' },
  { id: 'prod', name: 'Product Info', value: 15, color: '#f59e0b' },
  { id: 'other', name: 'Other', value: 5, color: '#6b7280' },
];

const topQuestions = [
  { id: 1, question: 'How do I reset my password?', count: 142 },
  { id: 2, question: 'What are your business hours?', count: 98 },
  { id: 3, question: 'How can I track my order?', count: 87 },
  { id: 4, question: 'Do you offer refunds?', count: 76 },
  { id: 5, question: 'How to contact support?', count: 65 },
];

export function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUp className="w-4 h-4" />
              18%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Conversations</p>
          <p className="text-3xl font-bold dark:text-white mt-1">8,543</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last month</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUp className="w-4 h-4" />
              5%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Resolution Rate</p>
          <p className="text-3xl font-bold dark:text-white mt-1">94.2%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last month</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
              <ArrowDown className="w-4 h-4" />
              12%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Response Time</p>
          <p className="text-3xl font-bold dark:text-white mt-1">1.8s</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last month</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUp className="w-4 h-4" />
              23%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Unique Users</p>
          <p className="text-3xl font-bold dark:text-white mt-1">3,421</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last month</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h2 className="text-lg font-semibold dark:text-white">Conversation Trends</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Last 7 days performance</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={conversationData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Area type="monotone" dataKey="conversations" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h2 className="text-lg font-semibold dark:text-white">Resolution Status</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Resolved vs Escalated</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Bar dataKey="resolved" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="escalated" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h2 className="text-lg font-semibold dark:text-white">Response Time by Hour</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average response time (seconds)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line type="monotone" dataKey="time" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h2 className="text-lg font-semibold dark:text-white">Conversation Categories</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Distribution by topic</p>
          </div>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {categoriesData.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-sm dark:text-white">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold dark:text-white">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Questions */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold dark:text-white">Top Questions</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Most frequently asked questions</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topQuestions.map((item, index) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium dark:text-white">{item.question}</p>
                  <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                      style={{ width: `${(item.count / 142) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
