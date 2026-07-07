import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SkeletonChart } from '@/components/Skeleton';
import type { UsersChartRow } from '@/types/dashboardAnalytics.types';

const TOOLTIP_STYLE = {
  backgroundColor: '#1f2937',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
};

interface UsersChartPanelProps {
  title: string;
  subtitle: string;
  data: UsersChartRow[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  onRetry: () => void;
}

export function UsersChartPanel({
  title,
  subtitle,
  data,
  loading,
  error,
  isEmpty,
  onRetry,
}: UsersChartPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold dark:text-white">{title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
      {loading ? (
        <SkeletonChart />
      ) : error ? (
        <div className="h-[300px] flex flex-col items-center justify-center text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : isEmpty ? (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">No analytics data available.</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid key="users-grid" strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis key="users-x" dataKey="name" stroke="#9ca3af" />
            <YAxis key="users-y" stroke="#9ca3af" />
            <Tooltip key="users-tooltip" contentStyle={TOOLTIP_STYLE} />
            <Bar key="users-bar" dataKey="users" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
