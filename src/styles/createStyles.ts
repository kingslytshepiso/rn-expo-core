import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { useLayout } from "../layout";
import { ResponsiveValue, getResponsiveValue } from "../layout/responsive";

type Style = ViewStyle | TextStyle | ImageStyle;
type ResponsiveStyle = ResponsiveValue<Style>;

/**
 * Helper to create responsive styles within a component
 */
export const useResponsiveStyles = <T extends Record<string, ResponsiveStyle>>(
  styles: T | ((layout: ReturnType<typeof useLayout>) => T),
): { [K in keyof T]: Style } => {
  const layout = useLayout();

  const baseStyles = typeof styles === "function" ? styles(layout) : styles;

  const processedStyles = Object.entries(baseStyles).reduce(
    (acc, [key, value]) => {
      acc[key] = getResponsiveValue(
        value as ResponsiveValue<Style>,
        layout.width,
      );
      return acc;
    },
    {} as Record<string, Style>,
  );

  return processedStyles as { [K in keyof T]: Style };
};
