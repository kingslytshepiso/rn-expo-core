import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Dimensions, ScaledSize } from "react-native";
import {
  Breakpoint,
  DeviceType,
  getBreakpoint,
  getDeviceType,
} from "./breakpoints";

interface LayoutContextValue {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  deviceType: DeviceType;
  isPortrait: boolean;
  isLandscape: boolean;
}

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

interface LayoutTrackerProps {
  children: React.ReactNode;
  /**
   * Debounce delay in milliseconds for dimension changes.
   * Default: 100ms. Set to 0 to disable debouncing.
   */
  debounceMs?: number;
}

export const LayoutTracker: React.FC<LayoutTrackerProps> = ({
  children,
  debounceMs = 100,
}) => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get("window");
    return { width, height };
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }: { window: ScaledSize }) => {
        // Debounce rapid dimension changes to improve performance
        if (debounceMs > 0) {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            setDimensions({ width: window.width, height: window.height });
          }, debounceMs);
        } else {
          // No debouncing - update immediately
          setDimensions({ width: window.width, height: window.height });
        }
      },
    );

    return () => {
      subscription?.remove();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [debounceMs]);

  const { width, height } = dimensions;

  // Memoize computed values to avoid recalculating on every render
  const value: LayoutContextValue = useMemo(
    () => ({
      width,
      height,
      breakpoint: getBreakpoint(width),
      deviceType: getDeviceType(width),
      isPortrait: height > width,
      isLandscape: width > height,
    }),
    [width, height],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutContext = (): LayoutContextValue => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within LayoutTracker");
  }
  return context;
};
