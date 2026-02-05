import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class DbError extends Error {
  // Optional cause is useful for logging / debugging upstream
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = "DbError";
  }
}
