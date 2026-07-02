const MINUTE_MS = 60_000;

export function getVisitorDisplayName(
  visitorName: string | null,
  visitorEmail: string | null,
): string {
  const trimmedName = visitorName?.trim();

  if (trimmedName) {
    return trimmedName;
  }

  const trimmedEmail = visitorEmail?.trim();

  if (trimmedEmail) {
    return trimmedEmail;
  }

  return 'Visitor';
}

export function formatSessionDuration(
  sessionStartedAt: string,
  lastActivity: string,
): string {
  const start = new Date(sessionStartedAt);
  const end = new Date(lastActivity);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return '—';
  }

  const diffMinutes = Math.max(1, Math.round((end.getTime() - start.getTime()) / MINUTE_MS));

  return `${diffMinutes} min`;
}

export function formatSessionTimestamp(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatChatMessageTime(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function getSessionStatusClassName(status: string): string {
  if (status === 'resolved') {
    return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400';
  }

  if (status === 'active') {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400';
  }

  return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400';
}
