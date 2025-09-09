// lib/validation-schemas.ts
import { z } from 'zod';

export const emailSchema = z.string().email('Please enter a valid email address');
export const otpSchema = z.string().length(6, 'OTP must be exactly 6 digits').regex(/^\d+$/, 'OTP must contain only numbers');

export const loginSchema = z.object({
  email: emailSchema,
});

export const verifyOtpSchema = z.object({
  email: emailSchema,
  code: otpSchema,
});