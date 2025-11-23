import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { useTheme } from "../theme";
import { useLayout } from "../layout";
import { ResponsiveValue, getResponsiveValue } from "../layout/responsive";

interface ResponsiveTextProps extends TextProps {
  children: React.ReactNode;
  variant?: "headline" | "title" | "body" | "label";
  size?: ResponsiveValue<number>;
  color?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = "body",
  size,
  color,
  style,
  ...props
}) => {
  const theme = useTheme();
  const layout = useLayout();

  const getVariantSize = (): number => {
    if (size) {
      return getResponsiveValue(size, layout.width);
    }

    switch (variant) {
      case "headline":
        return layout.isDesktop ? 32 : layout.isTablet ? 28 : 24;
      case "title":
        return layout.isDesktop ? 22 : layout.isTablet ? 18 : 16;
      case "body":
        return layout.isDesktop ? 16 : 14;
      case "label":
        return layout.isDesktop ? 14 : 12;
      default:
        return 14;
    }
  };

  const getVariantColor = (): string => {
    if (color) return color;
    return theme.colors.onSurface;
  };

  const styles = StyleSheet.create({
    text: {
      fontSize: getVariantSize(),
      color: getVariantColor(),
    },
  });

  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};
