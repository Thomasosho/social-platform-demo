import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatPostDate = (dateString: string): string => {
  const date = parseISO(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  if (diffInHours < 24) {
    return format(date, 'h:mm a');
  }
  if (diffInHours < 168) { // Less than a week
    return format(date, 'EEE h:mm a');
  }
  return format(date, 'MMM d, yyyy');
};

export const formatRelativeTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

