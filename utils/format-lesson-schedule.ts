export function formatLessonSchedule(scheduledAt: string) {
  const date = new Date(scheduledAt);

  return new Intl.DateTimeFormat("en-IE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
