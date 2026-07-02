const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

function padMinutes(minutes: number): string {
  return String(minutes).padStart(2, '0');
}

export function formatRelativeLastActivity(lastActivity: string): string {
  const activityDate = new Date(lastActivity);

  if (Number.isNaN(activityDate.getTime())) {
    return '—';
  }

  const diffMs = Math.max(0, Date.now() - activityDate.getTime());
  const totalMinutes = Math.floor(diffMs / MINUTE_MS);
  const totalHours = Math.floor(diffMs / HOUR_MS);
  const totalDays = Math.floor(diffMs / DAY_MS);

  if (totalMinutes < 1) {
    return 'Just now';
  }

  if (totalHours < 1) {
    return `${totalMinutes} min`;
  }

  if (totalDays < 1) {
    const hours = totalHours;
    const minutes = totalMinutes % 60;

    return `${hours} hr ${padMinutes(minutes)} min`;
  }

  if (totalDays < 7) {
    return totalDays === 1 ? '1 day' : `${totalDays} days`;
  }

  if (totalDays < 30) {
    const weeks = Math.floor(totalDays / 7);

    return weeks === 1 ? '1 week' : `${weeks} weeks`;
  }

  if (totalDays < 365) {
    const months = Math.floor(totalDays / 30);

    return months === 1 ? '1 month' : `${months} months`;
  }

  const years = Math.floor(totalDays / 365);

  return years === 1 ? '1 year' : `${years} years`;
}
