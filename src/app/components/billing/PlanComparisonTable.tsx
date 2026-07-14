import { Check, X } from 'lucide-react';
import type { PlanComparisonData } from '@/types/pricing.types';

interface PlanComparisonTableProps {
  comparison: PlanComparisonData | null;
  loading?: boolean;
}

function renderCellValue(value: string | boolean | number | null) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto" />
    ) : (
      <X className="w-4 h-4 text-gray-300 dark:text-gray-600 mx-auto" />
    );
  }
  if (value === null || value === undefined || value === '') {
    return <span className="text-gray-400">—</span>;
  }
  return <span>{String(value)}</span>;
}

export function PlanComparisonTable({
  comparison,
  loading = false,
}: PlanComparisonTableProps) {
  if (loading) {
    return (
      <div className="h-48 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-pulse" />
    );
  }

  if (!comparison || comparison.plans.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              Feature
            </th>
            {comparison.plans.map((plan) => (
              <th
                key={plan.plan_id}
                className={`p-4 text-center font-semibold dark:text-white ${
                  plan.recommended ? 'bg-blue-50/70 dark:bg-blue-950/30' : ''
                }`}
              >
                <div>{plan.display_name}</div>
                {plan.current_plan ? (
                  <div className="mt-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                    Current
                  </div>
                ) : null}
                {plan.recommended ? (
                  <div className="mt-1 text-xs font-medium text-[#003A96] dark:text-blue-300">
                    Recommended
                  </div>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.rows.map((row) => (
            <tr
              key={row.feature_key}
              className="border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <td className="p-4 font-medium text-gray-800 dark:text-gray-200">
                {row.feature_label}
              </td>
              {row.values.map((cell) => {
                const planMeta = comparison.plans.find((p) => p.plan_id === cell.plan_id);
                return (
                  <td
                    key={`${row.feature_key}-${cell.plan_id}`}
                    className={`p-4 text-center text-gray-700 dark:text-gray-300 ${
                      planMeta?.recommended ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    {renderCellValue(cell.value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
