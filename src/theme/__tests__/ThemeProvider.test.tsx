import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../ThemeProvider";
import { useTheme } from "../useTheme";
import { lightTheme, darkTheme } from "../themeConfig";
import { MD3LightTheme } from "react-native-paper";

// Mock useColorScheme - we'll use jest.spyOn after imports
let mockUseColorScheme: jest.SpyInstance;

const TestComponent: React.FC = () => {
  const theme = useTheme();
  return <Text testID="primary-color">{theme.colors.primary}</Text>;
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock useColorScheme using jest.spyOn
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const RN = require("react-native");
    if (!mockUseColorScheme) {
      mockUseColorScheme = jest.spyOn(RN, "useColorScheme");
    }
    mockUseColorScheme.mockReturnValue("light");
  });

  it("should provide light theme when theme='light'", () => {
    const { getByTestId } = render(
      <ThemeProvider theme="light">
        <TestComponent />
      </ThemeProvider>,
    );
    expect(getByTestId("primary-color").props.children).toBe(
      lightTheme.colors.primary,
    );
  });

  it("should provide dark theme when theme='dark'", () => {
    const { getByTestId } = render(
      <ThemeProvider theme="dark">
        <TestComponent />
      </ThemeProvider>,
    );
    expect(getByTestId("primary-color").props.children).toBe(
      darkTheme.colors.primary,
    );
  });

  it("should provide light theme when theme='auto' and system is light", () => {
    mockUseColorScheme.mockReturnValue("light");
    const { getByTestId } = render(
      <ThemeProvider theme="auto">
        <TestComponent />
      </ThemeProvider>,
    );
    expect(getByTestId("primary-color").props.children).toBe(
      lightTheme.colors.primary,
    );
  });

  it("should provide dark theme when theme='auto' and system is dark", () => {
    mockUseColorScheme.mockReturnValue("dark");
    const { getByTestId } = render(
      <ThemeProvider theme="auto">
        <TestComponent />
      </ThemeProvider>,
    );
    expect(getByTestId("primary-color").props.children).toBe(
      darkTheme.colors.primary,
    );
  });

  it("should use custom theme when provided", () => {
    const customTheme = {
      ...MD3LightTheme,
      colors: {
        ...MD3LightTheme.colors,
        primary: "#ff0000",
      },
    };
    const { getByTestId } = render(
      <ThemeProvider theme={customTheme}>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(getByTestId("primary-color").props.children).toBe("#ff0000");
  });

  it("should default to auto theme", () => {
    mockUseColorScheme.mockReturnValue("light");
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(getByTestId("primary-color").props.children).toBe(
      lightTheme.colors.primary,
    );
  });

  it("should match snapshot with light theme", () => {
    const { toJSON } = render(
      <ThemeProvider theme="light">
        <Text>Snapshot Test</Text>
      </ThemeProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should match snapshot with dark theme", () => {
    const { toJSON } = render(
      <ThemeProvider theme="dark">
        <Text>Snapshot Test</Text>
      </ThemeProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should match snapshot with custom theme", () => {
    const customTheme = {
      ...MD3LightTheme,
      colors: {
        ...MD3LightTheme.colors,
        primary: "#ff0000",
      },
    };
    const { toJSON } = render(
      <ThemeProvider theme={customTheme}>
        <Text>Snapshot Test</Text>
      </ThemeProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
