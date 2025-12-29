import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  //49.99
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

//Format Errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  // Zod
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join(". ");
  }

  // Prisma unique constraint
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    const field = Array.isArray(error.meta?.target)
      ? error.meta.target[0]
      : "Email";

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  //  Fallback
  if (typeof error?.message === "string") {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
