export const formatDate = (date: Date) =>
  new Date(date).toLocaleTimeString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
