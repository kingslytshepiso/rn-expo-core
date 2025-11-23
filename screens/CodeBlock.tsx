import React from "react";
import { Text, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../src";

interface CodeBlockProps {
  children: string;
  style?: ViewStyle;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        styles.code,
        {
          backgroundColor: theme.colors.surfaceVariant,
          color: theme.colors.onSurfaceVariant,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  code: {
    fontFamily: "monospace",
    fontSize: 14,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});
