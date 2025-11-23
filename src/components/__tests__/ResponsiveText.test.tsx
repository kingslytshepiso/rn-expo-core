import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { ResponsiveText } from "../ResponsiveText";
import { LayoutTracker } from "../../layout";
import { ThemeProvider } from "../../theme";

// Mock useLayout
const mockUseLayout = jest.fn();
jest.mock("../../layout/useLayout", () => ({
  useLayout: () => mockUseLayout(),
}));

// Mock useTheme
jest.mock("../../theme/useTheme", () => ({
  useTheme: jest.fn(() => ({
    colors: {
      onSurface: "#000000",
    },
  })),
}));

describe("ResponsiveText", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme="light">
      <LayoutTracker>{children}</LayoutTracker>
    </ThemeProvider>
  );

  beforeEach(() => {
    mockUseLayout.mockReturnValue({
      width: 800,
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    });
  });

  it("should render children text", () => {
    const { getByText } = render(<ResponsiveText>Test Text</ResponsiveText>, {
      wrapper,
    });
    expect(getByText("Test Text")).toBeTruthy();
  });

  it("should apply headline variant size for desktop", () => {
    mockUseLayout.mockReturnValue({
      width: 1200,
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    });
    const { UNSAFE_getByType } = render(
      <ResponsiveText variant="headline">Headline</ResponsiveText>,
      { wrapper },
    );
    const text = UNSAFE_getByType(Text);
    const styles = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];
    expect(styles).toContainEqual(expect.objectContaining({ fontSize: 32 }));
  });

  it("should apply headline variant size for mobile", () => {
    mockUseLayout.mockReturnValue({
      width: 400,
      isDesktop: false,
      isTablet: false,
      isMobile: true,
    });
    const { UNSAFE_getByType } = render(
      <ResponsiveText variant="headline">Headline</ResponsiveText>,
      { wrapper },
    );
    const text = UNSAFE_getByType(Text);
    const styles = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];
    expect(styles).toContainEqual(expect.objectContaining({ fontSize: 24 }));
  });

  it("should apply custom size", () => {
    const { UNSAFE_getByType } = render(
      <ResponsiveText size={20}>Custom Size</ResponsiveText>,
      { wrapper },
    );
    const text = UNSAFE_getByType(Text);
    const styles = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];
    expect(styles).toContainEqual(expect.objectContaining({ fontSize: 20 }));
  });

  it("should apply responsive size", () => {
    mockUseLayout.mockReturnValue({
      width: 1000,
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    });
    const { UNSAFE_getByType } = render(
      <ResponsiveText size={{ xs: 12, md: 16, lg: 20 }}>
        Responsive Size
      </ResponsiveText>,
      { wrapper },
    );
    const text = UNSAFE_getByType(Text);
    const styles = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];
    // Should resolve to lg value (20) for width 1000
    expect(styles).toContainEqual(expect.objectContaining({ fontSize: 20 }));
  });

  it("should apply custom color", () => {
    const { UNSAFE_getByType } = render(
      <ResponsiveText color="#ff0000">Colored Text</ResponsiveText>,
      { wrapper },
    );
    const text = UNSAFE_getByType(Text);
    const styles = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];
    expect(styles).toContainEqual(
      expect.objectContaining({ color: "#ff0000" }),
    );
  });

  it("should use theme color when color not provided", () => {
    const { UNSAFE_getByType } = render(
      <ResponsiveText>Themed Text</ResponsiveText>,
      { wrapper },
    );
    const text = UNSAFE_getByType(Text);
    const styles = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];
    expect(styles).toContainEqual(
      expect.objectContaining({ color: "#000000" }),
    );
  });

  it("should merge with custom style", () => {
    const { UNSAFE_getByType } = render(
      <ResponsiveText style={{ fontWeight: "bold" }}>
        Styled Text
      </ResponsiveText>,
      { wrapper },
    );
    const text = UNSAFE_getByType(Text);
    const styles = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];
    expect(styles).toContainEqual(
      expect.objectContaining({ fontWeight: "bold" }),
    );
  });

  it("should match snapshot with default props", () => {
    const { toJSON } = render(<ResponsiveText>Snapshot Test</ResponsiveText>, {
      wrapper,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should match snapshot with headline variant", () => {
    const { toJSON } = render(
      <ResponsiveText variant="headline">Headline Text</ResponsiveText>,
      { wrapper },
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should match snapshot with custom size and color", () => {
    const { toJSON } = render(
      <ResponsiveText size={20} color="#ff0000">
        Custom Text
      </ResponsiveText>,
      { wrapper },
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
