import React from "react";
import { View, ViewStyle } from "react-native";
import { Card } from "react-native-paper";
import { useLayout } from "../layout";
import { ResponsiveValue, getResponsiveValue } from "../layout/responsive";

interface ResponsiveCardProps {
  children: React.ReactNode;
  padding?: ResponsiveValue<number>;
  margin?: ResponsiveValue<number>;
  maxWidth?: ResponsiveValue<number>;
  style?: ViewStyle;
  mode?: "elevated" | "outlined" | "contained";
  onPress?: () => void;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  padding: paddingValue,
  margin: marginValue,
  maxWidth: maxWidthValue,
  style,
  mode = "elevated",
  onPress,
}) => {
  const layout = useLayout();

  const defaultPadding = layout.isDesktop ? 24 : layout.isTablet ? 20 : 16;
  const defaultMargin = layout.isDesktop ? 16 : 12;

  const containerStyle: ViewStyle = {
    margin: marginValue
      ? getResponsiveValue(marginValue, layout.width)
      : defaultMargin,
    maxWidth: maxWidthValue
      ? getResponsiveValue(maxWidthValue, layout.width)
      : undefined,
  };

  const cardPadding = paddingValue
    ? getResponsiveValue(paddingValue, layout.width)
    : defaultPadding;

  return (
    <View style={containerStyle} testID="responsive-card-container">
      {onPress ? (
        <Card mode={mode} style={style} onPress={onPress}>
          <View
            style={{ padding: cardPadding }}
            testID="responsive-card-content"
          >
            {children}
          </View>
        </Card>
      ) : (
        <Card mode={mode} style={style}>
          <View
            style={{ padding: cardPadding }}
            testID="responsive-card-content"
          >
            {children}
          </View>
        </Card>
      )}
    </View>
  );
};
