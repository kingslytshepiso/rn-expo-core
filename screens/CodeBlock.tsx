import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, StyleSheet, ViewStyle, View } from "react-native";
import { IconButton } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import { useTheme, useSnackbar } from "../src";

interface CodeBlockProps {
  children: string;
  style?: ViewStyle;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, style }) => {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const [copied, setCopied] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeout.current) {
        clearTimeout(resetTimeout.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(children);
      setCopied(true);
      showSnackbar({
        message: "Code copied to clipboard",
        duration: 2000,
      });
      if (resetTimeout.current) {
        clearTimeout(resetTimeout.current);
      }
      resetTimeout.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn("CodeBlock copy failed", error);
    }
  }, [children, showSnackbar]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surfaceVariant },
        style,
      ]}
    >
      <IconButton
        icon={copied ? "check" : "content-copy"}
        size={18}
        mode="contained-tonal"
        style={styles.copyButton}
        onPress={handleCopy}
        accessibilityLabel="Copy code snippet"
        testID="copy-code-button"
      />
      <Text
        selectable
        style={[
          styles.code,
          {
            color: theme.colors.onSurfaceVariant,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginTop: 16,
    position: "relative",
    paddingTop: 40,
  },
  code: {
    fontFamily: "monospace",
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  copyButton: {
    position: "absolute",
    top: 4,
    right: 4,
  },
});
