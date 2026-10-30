import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format amounts into standard Pakistani Rupee (PKR) representation.
 * e.g., 1250 -> "Rs. 1,250"
 */
export function formatPKR(amount: number): string {
  return `Rs. ${new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

/**
 * Generate human-friendly fallback order number if database trigger doesn't generate one
 */
export function generateOrderNumber(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `BN-${randomSuffix}`;
}

/**
 * Common Pakistani cities for convenient checkout selection
 */
export const PAKISTAN_MAJOR_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Gujranwala',
  'Sialkot',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Jhang',
  'Rahim Yar Khan',
  'Gujrat',
  'Mardan',
  'Kasur',
  'Dera Ghazi Khan',
  'Sahiwal',
  'Nawabshah',
  'Mingora',
  'Mirpur Khas',
  'Okara',
  'Abbottabad',
  'Muzaffarabad',
  'Gilgit',
  'Other City'
] as const;
