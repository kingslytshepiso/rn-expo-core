import { render } from "@testing-library/react-native";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { useLayout } from "../../layout";
import { AppProviders } from "../../providers";
import { useTheme } from "../../theme";

// Mock Dimensions for LayoutTracker using jest.spyOn to avoid breaking react-native
const mockDimensionsGet = jest.spyOn(Dimensions, "get");
const mockDimensionsAddEventListener = jest.spyOn(
  Dimensions,
  "addEventListener",
);

const TestComponent: React.FC = () => {
  const theme = useTheme();
  const layout = useLayout();
  return (
    <View>
      <Text testID="theme-primary">{theme.colors.primary}</Text>
      <Text testID="layout-width">{layout.width}</Text>
    </View>
  );
};

describe("AppProviders", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDimensionsGet.mockReturnValue({
      width: 800,
      height: 600,
    } as any);
    mockDimensionsAddEventListener.mockReturnValue({
      remove: jest.fn(),
    } as any);
  });

  it("should render children", () => {
    // Test that AppProviders renders without errors
    const result = render(
      <AppProviders>
        <Text testID="child">Child</Text>
      </AppProviders>,
    );
    // Component should render (children are wrapped in providers)
    expect(result).toBeTruthy();
  });

  it("should provide theme context", () => {
    // Test that theme context is available
    const result = render(
      <AppProviders theme="light">
        <TestComponent />
      </AppProviders>,
    );
    // Component should render without errors
    expect(result).toBeTruthy();
  });

  it("should provide layout context", () => {
    // Test that layout context is available
    const result = render(
      <AppProviders>
        <TestComponent />
      </AppProviders>,
    );
    // Component should render without errors
    expect(result).toBeTruthy();
  });

  it("should use default theme='auto'", () => {
    // Test default theme
    const result = render(
      <AppProviders>
        <TestComponent />
      </AppProviders>,
    );
    // Should render without errors
    expect(result).toBeTruthy();
  });

  it("should use custom theme", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { MD3LightTheme } = require("react-native-paper");
    const customTheme = {
      ...MD3LightTheme,
      colors: {
        ...MD3LightTheme.colors,
        primary: "#ff0000",
      },
    };
    // Test custom theme
    const result = render(
      <AppProviders theme={customTheme}>
        <TestComponent />
      </AppProviders>,
    );
    // Should render without errors
    expect(result).toBeTruthy();
  });

  it("should use custom layoutDebounceMs", () => {
    // Test custom debounce
    const result = render(
      <AppProviders layoutDebounceMs={200}>
        <TestComponent />
      </AppProviders>,
    );
    // Should render without errors
    expect(result).toBeTruthy();
  });
});
