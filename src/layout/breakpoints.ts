/**
 * Breakpoint definitions for responsive design
 * These values are used to determine device categories
 */
export const BREAKPOINTS = {
  xs: 0, // Extra small devices (phones)
  sm: 576, // Small devices (phones in landscape)
  md: 768, // Medium devices (tablets)
  lg: 992, // Large devices (desktops)
  xl: 1200, // Extra large devices (large desktops)
  xxl: 1400, // Extra extra large devices
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Device type categories
 */
export type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * Get the current breakpoint based on width
 */
export const getBreakpoint = (width: number): Breakpoint => {
  if (width >= BREAKPOINTS.xxl) return "xxl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
};

/**
 * Get device type based on width
 */
export const getDeviceType = (width: number): DeviceType => {
  if (width >= BREAKPOINTS.lg) return "desktop";
  if (width >= BREAKPOINTS.md) return "tablet";
  return "mobile";
};

/**
 * Check if width matches a breakpoint
 */
export const matchesBreakpoint = (
  width: number,
  breakpoint: Breakpoint,
): boolean => {
  return width >= BREAKPOINTS[breakpoint];
};
