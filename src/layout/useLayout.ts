import { useMemo } from "react";
import { useLayoutContext } from "./LayoutTracker";
import { Breakpoint, DeviceType, matchesBreakpoint } from "./breakpoints";

export interface UseLayoutReturn {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  deviceType: DeviceType;
  isPortrait: boolean;
  isLandscape: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  matches: (breakpoint: Breakpoint) => boolean;
}

/**
 * Hook to access layout information and responsive utilities
 *
 * @example
 * ```tsx
 * const { isDesktop, width, matches } = useLayout();
 * const maxWidth = isDesktop ? 1200 : undefined;
 * ```
 */
export const useLayout = (): UseLayoutReturn => {
  const layout = useLayoutContext();

  // Memoize computed boolean values to avoid recalculating on every render
  return useMemo(
    () => ({
      ...layout,
      isMobile: layout.deviceType === "mobile",
      isTablet: layout.deviceType === "tablet",
      isDesktop: layout.deviceType === "desktop",
      matches: (breakpoint: Breakpoint) =>
        matchesBreakpoint(layout.width, breakpoint),
    }),
    [layout],
  );
};
