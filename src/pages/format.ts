export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

export function truncateMiddle(value: string, max = 48): string {
  if (value.length <= max) return value;
  const keep = Math.floor((max - 3) / 2);
  return `${value.slice(0, keep)}...${value.slice(value.length - keep)}`;
}
