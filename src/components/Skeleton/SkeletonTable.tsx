import { memo } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';

interface SkeletonTableProps {
  rowCount?: number;
  variant?: 'manage-users' | 'generic';
}

const ManageUsersRow = memo(function ManageUsersRow() {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="w-10 h-10 rounded-full" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-40" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-28" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-5 w-16 rounded-full" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-10" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-5 w-20 rounded-full" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-5 w-16 rounded-full" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Skeleton className="h-5 w-5 ml-auto" />
      </td>
    </tr>
  );
});

export const SkeletonTable = memo(function SkeletonTable({
  rowCount = 9,
  variant = 'manage-users',
}: SkeletonTableProps) {
  if (variant === 'manage-users') {
    return (
      <>
        {Array.from({ length: rowCount }).map((_, index) => (
          <ManageUsersRow key={`manage-user-skeleton-${index}`} />
        ))}
      </>
    );
  }

  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <tr key={`table-skeleton-${index}`}>
          <td className="px-6 py-4" colSpan={5}>
            <Skeleton className="h-4 w-full" />
          </td>
        </tr>
      ))}
    </>
  );
});
