import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LayoutTracker, LayoutTrackerProps } from "./layout";
import { ThemeProvider, ThemeProviderProps } from "./theme";

/**
 * Combined provider props that includes all required providers
 */
export interface AppProvidersProps {
  children: React.ReactNode;
  /**
   * Theme configuration
   * @default "auto"
   */
  theme?: ThemeProviderProps["theme"];
  /**
   * Layout tracker debounce delay in milliseconds
   * @default 100
   */
  layoutDebounceMs?: LayoutTrackerProps["debounceMs"];
}

/**
 * Combined provider component that wraps your app with all required providers.
 *
 * This is a convenience component that includes:
 * - SafeAreaProvider (from react-native-safe-area-context)
 * - ThemeProvider (from rn-expo-core)
 * - LayoutTracker (from rn-expo-core)
 *
 * @example
 * ```tsx
 * import { AppProviders } from 'rn-expo-core';
 *
 * export default function App() {
 *   return (
 *     <AppProviders theme="auto">
 *       <YourApp />
 *     </AppProviders>
 *   );
 * }
 * ```
 */
export const AppProviders: React.FC<AppProvidersProps> = ({
  children,
  theme = "auto",
  layoutDebounceMs = 100,
}) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <LayoutTracker debounceMs={layoutDebounceMs}>{children}</LayoutTracker>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
