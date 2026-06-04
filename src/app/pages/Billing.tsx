import { useState } from 'react';
import { CreditCard, Download, Check, Zap, Crown, Rocket, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const usageData = [
  { id: 'jul', month: 'Jul', cost: 45 },
  { id: 'aug', month: 'Aug', cost: 52 },
  { id: 'sep', month: 'Sep', cost: 48 },
  { id: 'oct', month: 'Oct', cost: 65 },
  { id: 'nov', month: 'Nov', cost: 78 },
  { id: 'dec', month: 'Dec', cost: 85 },
];

const invoices = [
  { id: 'INV-001', date: '2024-01-01', amount: 85, status: 'paid' },
  { id: 'INV-002', date: '2023-12-01', amount: 78, status: 'paid' },
  { id: 'INV-003', date: '2023-11-01', amount: 65, status: 'paid' },
  { id: 'INV-004', date: '2023-10-01', amount: 48, status: 'paid' },
];

const plans = [
  {
    name: 'Starter',
    price: 29,
    icon: Zap,
    features: [
      '1,000 conversations/month',
      '1 chatbot',
      'Basic analytics',
      'Email support',
      '7-day chat history',
    ],
  },
  {
    name: 'Pro',
    price: 79,
    icon: Rocket,
    popular: true,
    features: [
      '10,000 conversations/month',
      '5 chatbots',
      'Advanced analytics',
      'Priority support',
      'Unlimited chat history',
      'Custom branding',
    ],
  },
  {
    name: 'Enterprise',
    price: 299,
    icon: Crown,
    features: [
      'Unlimited conversations',
      'Unlimited chatbots',
      'Custom analytics',
      'Dedicated support',
      'Unlimited chat history',
      'Custom branding',
      'API access',
      'SSO & SAML',
    ],
  },
];

export function Billing() {
  const [currentPlan] = useState('Pro');

  const handleUpgrade = (planName: string) => {
    toast.success(`Upgraded to ${planName} plan!`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Billing & Plans</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your subscription and payment methods</p>
      </div>

      {/* Current Usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Bill</p>
              <p className="text-2xl font-bold dark:text-white">$85.00</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Next billing: Jan 31, 2024</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Conversations Used</p>
              <p className="text-2xl font-bold dark:text-white">6,543</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">65% of 10,000 limit</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Billing Cycle</p>
              <p className="text-2xl font-bold dark:text-white">Monthly</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Renews automatically</p>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="mb-6">
          <h2 className="text-lg font-semibold dark:text-white">Usage Over Time</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your monthly spending trend</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value) => [`$${value}`, 'Cost']}
            />
            <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-gray-900 rounded-xl p-6 border-2 transition-all ${
                currentPlan === plan.name
                  ? 'border-blue-600 shadow-xl'
                  : plan.popular
                  ? 'border-purple-600'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              {currentPlan === plan.name && (
                <div className="absolute -top-3 right-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Current Plan
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    plan.popular
                      ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <plan.icon
                    className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold dark:text-white">${plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.name)}
                disabled={currentPlan === plan.name}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  currentPlan === plan.name
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {currentPlan === plan.name ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold dark:text-white mb-4">Payment Method</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium dark:text-white">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/25</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Update
          </button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold dark:text-white">Invoice History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
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
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap font-medium dark:text-white">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium dark:text-white">
                    ${invoice.amount}.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2 ml-auto">
                      <Download className="w-4 h-4" />
                      Download
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
