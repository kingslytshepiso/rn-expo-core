import { render } from "@testing-library/react-native";
import React from "react";
import { Platform, Text } from "react-native";
import { MD3LightTheme } from "react-native-paper";
import { darkTheme, lightTheme } from "../themeConfig";
import { ThemeProvider } from "../ThemeProvider";
import { useTheme } from "../useTheme";

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

  afterEach(() => {
    if (typeof document === "undefined") return;
    const styleElement = document.getElementById("rn-expo-core-scrollbar");
    if (styleElement && styleElement.parentElement) {
      styleElement.remove();
    }
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

  it("applies global scrollbar styles on web", () => {
    const originalOS = Platform.OS;
    const originalDocument = globalThis.document;
    const elements = new Map<string, HTMLStyleElement>();
    const mockHead = {
      appendChild: (element: HTMLStyleElement) => {
        if (element.id) {
          elements.set(element.id, element);
        }
      },
    } as unknown as HTMLElement;
    const documentMock = {
      head: mockHead,
      getElementById: (id: string) => elements.get(id) ?? null,
      createElement: () => {
        const element = {
          id: "",
          textContent: "",
          remove() {
            if (this.id) {
              elements.delete(this.id);
            }
          },
        } as HTMLStyleElement;
        Object.defineProperty(element, "parentElement", {
          configurable: true,
          get: () => mockHead,
        });
        return element;
      },
    } as unknown as Document;

    globalThis.document = documentMock;

    Object.defineProperty(Platform, "OS", {
      configurable: true,
      get: () => "web",
    });

    render(
      <ThemeProvider theme="light">
        <Text>Scrollbar Test</Text>
      </ThemeProvider>,
    );

    const styleElement = document.getElementById("rn-expo-core-scrollbar");
    expect(styleElement).not.toBeNull();
    expect(styleElement?.textContent).toContain("::-webkit-scrollbar");
    expect(styleElement?.textContent).toContain(lightTheme.colors.primary);

    Object.defineProperty(Platform, "OS", {
      configurable: true,
      get: () => originalOS,
    });
    globalThis.document = originalDocument;
  });
});
