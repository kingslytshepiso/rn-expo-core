import React from "react";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, AppTheme } from "./themeConfig";

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | 'auto';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = "auto",
}) => {
  const systemColorScheme = useColorScheme();

  const getTheme = (): AppTheme => {
    if (theme === "light") return lightTheme;
    if (theme === "dark") return darkTheme;
    return systemColorScheme === "dark" ? darkTheme : lightTheme;
  };

  return (
    <PaperProvider theme={getTheme()}>
      {children}
    </PaperProvider>
  );
};

