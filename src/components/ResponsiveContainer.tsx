import React from "react";
import { View, ViewProps } from "react-native";
import { useLayout } from "../layout";
import { ResponsiveValue, getResponsiveValue } from "../layout/responsive";

interface ResponsiveContainerProps extends ViewProps {
  children: React.ReactNode;
  maxWidth?: ResponsiveValue<number>;
  padding?: ResponsiveValue<number>;
  gap?: ResponsiveValue<number>;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth,
  padding: paddingValue,
  gap: gapValue,
  style,
  ...props
}) => {
  const layout = useLayout();

  const resolvedMaxWidth = maxWidth
    ? getResponsiveValue(maxWidth, layout.width)
    : undefined;

  const containerStyle = {
    width: "100%" as const,
    maxWidth: resolvedMaxWidth,
    // Center the container when maxWidth is set, but allow parent to stretch
    alignSelf: resolvedMaxWidth ? ("center" as const) : undefined,
    padding: paddingValue
      ? getResponsiveValue(paddingValue, layout.width)
      : undefined,
    gap: gapValue ? getResponsiveValue(gapValue, layout.width) : undefined,
  };

  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
};
