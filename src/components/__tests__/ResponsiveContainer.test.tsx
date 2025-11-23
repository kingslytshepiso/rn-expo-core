import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { LayoutTracker } from "../../layout";
import { ThemeProvider } from "../../theme";
import { ResponsiveContainer } from "../ResponsiveContainer";

// Mock useLayout
jest.mock("../../layout/useLayout", () => ({
  useLayout: jest.fn(() => ({
    width: 800,
    height: 600,
    isDesktop: true,
    isTablet: false,
    isMobile: false,
  })),
}));

describe("ResponsiveContainer", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme="light">
      <LayoutTracker>{children}</LayoutTracker>
    </ThemeProvider>
  );

  it("should render children", () => {
    const { getByText } = render(
      <ResponsiveContainer>
        <Text>Test Content</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("should apply maxWidth when provided", () => {
    const { getByTestId } = render(
      <ResponsiveContainer maxWidth={1200}>
        <Text>Content</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    const container = getByTestId("responsive-container");
    const styles = Array.isArray(container.props.style)
      ? container.props.style
      : container.props.style
        ? [container.props.style]
        : [];
    const flattenedStyle = styles.reduce(
      (acc: Record<string, any>, style: any) => {
        if (style && typeof style === "object") {
          return { ...acc, ...style };
        }
        return acc;
      },
      {} as Record<string, any>,
    );
    expect(flattenedStyle.maxWidth).toBe(1200);
  });

  it("should apply responsive maxWidth", () => {
    const { getByTestId } = render(
      <ResponsiveContainer maxWidth={{ md: 768, lg: 1200 }}>
        <Text>Content</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    const container = getByTestId("responsive-container");
    const styles = Array.isArray(container.props.style)
      ? container.props.style
      : container.props.style
        ? [container.props.style]
        : [];
    const flattenedStyle = styles.reduce(
      (acc: Record<string, any>, style: any) => {
        if (style && typeof style === "object") {
          return { ...acc, ...style };
        }
        return acc;
      },
      {} as Record<string, any>,
    );
    // Width 800 matches md breakpoint (768-991), so should resolve to md value (768)
    expect(flattenedStyle.maxWidth).toBe(768);
  });

  it("should center when maxWidth is set", () => {
    const { getByTestId } = render(
      <ResponsiveContainer maxWidth={1200}>
        <Text>Content</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    const container = getByTestId("responsive-container");
    const styles = Array.isArray(container.props.style)
      ? container.props.style
      : container.props.style
        ? [container.props.style]
        : [];
    const flattenedStyle = styles.reduce(
      (acc: Record<string, any>, style: any) => {
        if (style && typeof style === "object") {
          return { ...acc, ...style };
        }
        return acc;
      },
      {} as Record<string, any>,
    );
    expect(flattenedStyle.alignSelf).toBe("center");
  });

  it("should apply padding", () => {
    const { getByTestId } = render(
      <ResponsiveContainer padding={16}>
        <Text>Content</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    const container = getByTestId("responsive-container");
    const styles = Array.isArray(container.props.style)
      ? container.props.style
      : container.props.style
        ? [container.props.style]
        : [];
    const flattenedStyle = styles.reduce(
      (acc: Record<string, any>, style: any) => {
        if (style && typeof style === "object") {
          return { ...acc, ...style };
        }
        return acc;
      },
      {} as Record<string, any>,
    );
    expect(flattenedStyle.padding).toBe(16);
  });

  it("should apply responsive padding", () => {
    const { getByTestId } = render(
      <ResponsiveContainer padding={{ xs: 8, md: 16, lg: 24 }}>
        <Text>Content</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    const container = getByTestId("responsive-container");
    const styles = Array.isArray(container.props.style)
      ? container.props.style
      : container.props.style
        ? [container.props.style]
        : [];
    const flattenedStyle = styles.reduce(
      (acc: Record<string, any>, style: any) => {
        if (style && typeof style === "object") {
          return { ...acc, ...style };
        }
        return acc;
      },
      {} as Record<string, any>,
    );
    // Width 800 matches md breakpoint (768-991), so should resolve to md value (16)
    expect(flattenedStyle.padding).toBe(16);
  });

  it("should apply gap", () => {
    const { getByTestId } = render(
      <ResponsiveContainer gap={8}>
        <Text>Content</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    const container = getByTestId("responsive-container");
    const styles = Array.isArray(container.props.style)
      ? container.props.style
      : container.props.style
        ? [container.props.style]
        : [];
    const flattenedStyle = styles.reduce(
      (acc: Record<string, any>, style: any) => {
        if (style && typeof style === "object") {
          return { ...acc, ...style };
        }
        return acc;
      },
      {} as Record<string, any>,
    );
    expect(flattenedStyle.gap).toBe(8);
  });

  it("should merge with custom style", () => {
    const { getByTestId } = render(
      <ResponsiveContainer style={{ backgroundColor: "red" }}>
        <Text>Content</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    const container = getByTestId("responsive-container");
    const styles = Array.isArray(container.props.style)
      ? container.props.style
      : container.props.style
        ? [container.props.style]
        : [];
    const flattenedStyle = styles.reduce(
      (acc: Record<string, any>, style: any) => {
        if (style && typeof style === "object") {
          return { ...acc, ...style };
        }
        return acc;
      },
      {} as Record<string, any>,
    );
    expect(flattenedStyle.backgroundColor).toBe("red");
  });

  it("should match snapshot with default props", () => {
    const { toJSON } = render(
      <ResponsiveContainer>
        <Text>Snapshot Test</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should match snapshot with maxWidth", () => {
    const { toJSON } = render(
      <ResponsiveContainer maxWidth={1200}>
        <Text>Snapshot Test</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should match snapshot with padding and gap", () => {
    const { toJSON } = render(
      <ResponsiveContainer padding={16} gap={8}>
        <Text>Snapshot Test</Text>
      </ResponsiveContainer>,
      { wrapper },
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
