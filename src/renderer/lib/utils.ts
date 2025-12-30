import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind merge support
 * Use this for all conditional class name logic
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
