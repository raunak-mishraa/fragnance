import crypto from "crypto";

export function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}
