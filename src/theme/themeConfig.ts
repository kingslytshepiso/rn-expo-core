import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from "react-native-paper";

// Custom font configuration
const fontConfig = {
  displayLarge: {
    fontFamily: "System",
    fontSize: 57,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: "System",
    fontSize: 45,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: "System",
    fontSize: 36,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: "System",
    fontSize: 32,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: "System",
    fontSize: 28,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: "System",
    fontSize: 24,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: "System",
    fontSize: 22,
    fontWeight: "500" as const,
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "500" as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "500" as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "500" as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "500" as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: "System",
    fontSize: 11,
    fontWeight: "500" as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "400" as const,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "400" as const,
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "400" as const,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
};

// Light theme configuration
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6200ee",
    primaryContainer: "#eaddff",
    secondary: "#03dac6",
    secondaryContainer: "#cef8f5",
    tertiary: "#018786",
    tertiaryContainer: "#a6f5f3",
    error: "#b00020",
    errorContainer: "#fcd8df",
    surface: "#ffffff",
    surfaceVariant: "#f3f3f3",
    background: "#ffffff",
    outline: "#79747e",
    outlineVariant: "#cac4d0",
  },
  fonts: configureFonts({ config: fontConfig }),
};

// Dark theme configuration
export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#bb86fc",
    primaryContainer: "#6200ee",
    secondary: "#03dac6",
    secondaryContainer: "#018786",
    tertiary: "#03dac6",
    tertiaryContainer: "#018786",
    error: "#cf6679",
    errorContainer: "#b00020",
    surface: "#121212",
    surfaceVariant: "#1e1e1e",
    background: "#121212",
    outline: "#938f99",
    outlineVariant: "#49454f",
  },
  fonts: configureFonts({ config: fontConfig }),
};

// Theme type export
export type AppTheme = typeof lightTheme;
