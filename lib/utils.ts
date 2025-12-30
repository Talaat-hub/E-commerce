import type { Prisma } from "@/app/generated/prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

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

// Format Errors
export function formatError(error: unknown): string {
  // Zod
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join(". ");
  }

  // Prisma P2002 (duck-typing, NO runtime Prisma import)
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as Prisma.PrismaClientKnownRequestError).code === "P2002"
  ) {
    const err = error as Prisma.PrismaClientKnownRequestError;

    const field = Array.isArray(err.meta?.target)
      ? err.meta.target[0]
      : "Email";

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Fallback
  if (error instanceof Error && typeof error.message === "string") {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value is not a number or string");
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "EUR",
  style: "currency",
  minimumFractionDigits: 2,
});

// Format currency using the formatter above
export function formatCurrency(amount: number | string | null) {
  if (typeof amount === "number") {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === "string") {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return "NaN";
  }
}
