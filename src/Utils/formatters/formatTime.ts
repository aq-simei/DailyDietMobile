export const formatTime = (date: Date) =>
  new Date(date).toLocaleDateString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
