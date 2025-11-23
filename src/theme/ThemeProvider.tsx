import React from "react";
import { useColorScheme } from "react-native";
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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = "auto",
}) => {
  const systemColorScheme = useColorScheme();

  const getTheme = (): MD3Theme => {
    // If theme is a custom MD3Theme object, use it directly
    if (typeof theme === "object") {
      return theme;
    }

    // Otherwise, use built-in themes
    if (theme === "light") return lightTheme;
    if (theme === "dark") return darkTheme;
    return systemColorScheme === "dark" ? darkTheme : lightTheme;
  };

  return <PaperProvider theme={getTheme()}>{children}</PaperProvider>;
};
