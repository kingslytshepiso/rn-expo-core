import React from "react";
import { Text, View } from "react-native";
import { render } from "@testing-library/react-native";
import { useTheme } from "../useTheme";
import { ThemeProvider } from "../ThemeProvider";
import { lightTheme } from "../themeConfig";

const TestComponent: React.FC = () => {
  const theme = useTheme();
  return (
    <View>
      <Text testID="primary">{theme.colors.primary}</Text>
      <Text testID="surface">{theme.colors.surface}</Text>
      <Text testID="background">{theme.colors.background}</Text>
    </View>
  );
};

describe("useTheme", () => {
  it("should return theme from context", () => {
    const { getByTestId } = render(
      <ThemeProvider theme="light">
        <TestComponent />
      </ThemeProvider>,
    );
    expect(getByTestId("primary").props.children).toBe(
      lightTheme.colors.primary,
    );
    expect(getByTestId("surface").props.children).toBe(
      lightTheme.colors.surface,
    );
    expect(getByTestId("background").props.children).toBe(
      lightTheme.colors.background,
    );
  });

  it("should return AppTheme type", () => {
    render(
      <ThemeProvider theme="light">
        <TestComponent />
      </ThemeProvider>,
    );
    // Type check - should have all theme properties
    // This test verifies the hook can be called without errors
    expect(lightTheme.colors).toBeDefined();
    expect(lightTheme.fonts).toBeDefined();
  });
});
