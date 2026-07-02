export function formatResolutionRate(value: string): string {
  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    return '0%';
  }

  if (Number.isInteger(parsed)) {
    return `${parsed}%`;
  }

  return `${parsed.toFixed(2).replace(/\.?0+$/, '')}%`;
}

export function formatAverageResponseTime(value: string): string {
  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    return '0 sec';
  }

  return `${parsed.toFixed(2)} sec`;
}
