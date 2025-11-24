import React, { useEffect, useMemo } from "react";
import { Platform, useColorScheme } from "react-native";
import { MD3Theme, PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./themeConfig";

export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Theme configuration. Can be:
   * - "light" | "dark" | "auto" - Use built-in themes
   * - MD3Theme - Use a custom React Native Paper theme
   */
  theme?: "light" | "dark" | "auto" | MD3Theme;
}

const SCROLLBAR_STYLE_ID = "rn-expo-core-scrollbar";

const createScrollbarStyles = (theme: MD3Theme): string => {
  const trackColor = theme.colors.surfaceVariant ?? "#f0f0f0";
  const thumbColor = theme.colors.primary ?? "#888888";
  const hoverColor = theme.colors.primaryContainer ?? thumbColor;
  return `
    :root {
      --rn-expo-core-scrollbar-track: ${trackColor};
      --rn-expo-core-scrollbar-thumb: ${thumbColor};
      --rn-expo-core-scrollbar-thumb-hover: ${hoverColor};
    }
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
    ::-webkit-scrollbar-track {
      background: var(--rn-expo-core-scrollbar-track);
      border-radius: 999px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--rn-expo-core-scrollbar-thumb);
      border-radius: 999px;
      border: 3px solid transparent;
      background-clip: padding-box;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--rn-expo-core-scrollbar-thumb-hover);
    }
    body {
      scrollbar-width: thin;
      scrollbar-color: var(--rn-expo-core-scrollbar-thumb) var(--rn-expo-core-scrollbar-track);
    }
  `;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = "auto",
}) => {
  const systemColorScheme = useColorScheme();

  const resolvedTheme = useMemo((): MD3Theme => {
    // If theme is a custom MD3Theme object, use it directly
    if (typeof theme === "object") {
      return theme;
    }

    // Otherwise, use built-in themes
    if (theme === "light") return lightTheme;
    if (theme === "dark") return darkTheme;
    return systemColorScheme === "dark" ? darkTheme : lightTheme;
  }, [theme, systemColorScheme]);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    if (typeof document === "undefined") return;

    const styleContent = createScrollbarStyles(resolvedTheme);
    let styleElement = document.getElementById(
      SCROLLBAR_STYLE_ID,
    ) as HTMLStyleElement | null;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = SCROLLBAR_STYLE_ID;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = styleContent;

    return () => {
      // Clear styles only if this provider created them to avoid flicker
      if (styleElement && styleElement.parentElement) {
        styleElement.textContent = "";
      }
    };
  }, [resolvedTheme]);

  return <PaperProvider theme={resolvedTheme}>{children}</PaperProvider>;
};
