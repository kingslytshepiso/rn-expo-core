import React, { createContext, useContext, useEffect, useState } from "react";
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
}

export const LayoutTracker: React.FC<LayoutTrackerProps> = ({ children }) => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get("window");
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }: { window: ScaledSize }) => {
        setDimensions({ width: window.width, height: window.height });
      },
    );

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;
  const breakpoint = getBreakpoint(width);
  const deviceType = getDeviceType(width);
  const isPortrait = height > width;
  const isLandscape = width > height;

  const value: LayoutContextValue = {
    width,
    height,
    breakpoint,
    deviceType,
    isPortrait,
    isLandscape,
  };

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
