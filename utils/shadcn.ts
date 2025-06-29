import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomColor() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}
