import { z } from 'zod';

/**
 * Pakistani Mobile Number Regex:
 * Matches formats:
 * - 0300-1788080
 * - 03001788080
 * - 0300 1788080
 * - +923001788080
 * - 923001788080
 */
export const PAKISTANI_PHONE_REGEX = /^(?:\+92|92|0)?(3[0-9]{2})[- ]?([0-9]{7})$/;

/**
 * Helper to normalize any entered Pakistani phone number to standard 03XX-XXXXXXX format
 */
export function normalizePakistaniPhone(phone: string): string {
  const cleaned = phone.replace(/\s+/g, '').replace(/-/g, '');
  const match = cleaned.match(/(?:(?:\+?92)|0)?(3\d{2})(\d{7})$/);
  if (match) {
    return `0${match[1]}-${match[2]}`;
  }
  return phone;
}

export const orderItemSchema = z.object({
  product_id: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price must be positive'),
  quantity: z.number().int().positive('Quantity must be at least 1'),
  image: z.string().optional(),
});

export const createOrderSchema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(2, 'Customer name must be at least 2 characters')
    .max(100, 'Customer name is too long'),
  phone: z
    .string()
    .trim()
    .refine((val) => PAKISTANI_PHONE_REGEX.test(val), {
      message: 'Enter a valid Pakistani mobile number (e.g. 0300-1788080)',
    })
    .transform((val) => normalizePakistaniPhone(val)),
  city: z
    .string()
    .trim()
    .min(2, 'City is required'),
  address: z
    .string()
    .trim()
    .min(5, 'Please provide a complete delivery address (street/house/area)'),
  notes: z.string().trim().max(500, 'Notes are too long').optional().nullable(),
  payment_method: z.enum(['cod', 'bank_transfer']).default('cod'),
  items: z
    .array(orderItemSchema)
    .min(1, 'At least one product item is required in the order'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
