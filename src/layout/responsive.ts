import { Breakpoint, BREAKPOINTS } from "./breakpoints";

/**
 * Responsive value type - can be a single value or an object with breakpoint keys
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Get responsive value based on current width
 */
export const getResponsiveValue = <T>(
  value: ResponsiveValue<T>,
  width: number
): T => {
  if (typeof value !== "object" || value === null) {
    return value as T;
  }

  // Type guard to check if it's a responsive object
  const responsiveObj = value as Partial<Record<Breakpoint, T>>;

  // Check breakpoints from largest to smallest
  const breakpoints: Breakpoint[] = ["xxl", "xl", "lg", "md", "sm", "xs"];

  for (const bp of breakpoints) {
    if (width >= BREAKPOINTS[bp] && responsiveObj[bp] !== undefined) {
      return responsiveObj[bp] as T;
    }
  }

  // Fallback to first available value or throw
  const values = Object.values(responsiveObj);
  if (values.length > 0) {
    return values[0] as T;
  }

  throw new Error("No responsive value found");
};

/**
 * Create responsive style helper
 */
export const responsive = <T>(value: ResponsiveValue<T>) => value;
