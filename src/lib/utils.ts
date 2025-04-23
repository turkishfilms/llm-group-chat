import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get initials from a name (up to 2 characters)
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

// Format timestamp to local time (HH:MM format)
export function formatTime(timestamp: string | Date): string {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

// Generate consistent avatar color index based on username
export function getAvatarColor(username: string): number {
  // Simple hash function to get a consistent color
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Use modulo to get a number between 1 and 6 (we have 6 avatar colors)
  return Math.abs(hash % 6) + 1;
}
