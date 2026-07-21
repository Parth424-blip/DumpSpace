export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const timeString = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  if (diffDays === 0 && now.getDate() === date.getDate()) {
    return `Today at ${timeString}`;
  }
  if ((diffDays === 1) || (diffDays === 0 && now.getDate() !== date.getDate())) {
    return `Yesterday at ${timeString}`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) + ` at ${timeString}`;
}
