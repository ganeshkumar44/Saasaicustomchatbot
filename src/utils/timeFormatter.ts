const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

const MONTH_SHORT_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

function padMinutes(minutes: number): string {
  return String(minutes).padStart(2, '0');
}

function startOfLocalDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function formatAbsolutePlaygroundDate(date: Date): string {
  return `${date.getDate()} ${MONTH_SHORT_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function formatClockTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${padMinutes(date.getMinutes())}`;
}

/** Day label for Playground: Today / Yesterday / 10 Jul 2026 */
export function formatPlaygroundDayLabel(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  const todayStart = startOfLocalDay(new Date());
  const dateStart = startOfLocalDay(date);
  const dayDiff = Math.round((todayStart - dateStart) / DAY_MS);

  if (dayDiff === 0) {
    return 'Today';
  }

  if (dayDiff === 1) {
    return 'Yesterday';
  }

  return formatAbsolutePlaygroundDate(date);
}

/** Message timestamp: Yesterday · 11:22 or 10 Jul 2026 · 11:22 */
export function formatPlaygroundMessageTimestamp(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return `${formatPlaygroundDayLabel(isoDate)} · ${formatClockTime(date)}`;
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
