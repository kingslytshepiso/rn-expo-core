import { render } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import { LayoutTracker } from "../../layout";
import { ThemeProvider } from "../../theme";
import { ResponsiveCard } from "../ResponsiveCard";

// Mock useLayout
const mockUseLayout = jest.fn();
jest.mock("../../layout/useLayout", () => ({
  useLayout: () => mockUseLayout(),
}));

describe("ResponsiveCard", () => {
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

  it("should render children", () => {
    const { getByText } = render(
      <ResponsiveCard>
        <Text>Card Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    expect(getByText("Card Content")).toBeTruthy();
  });

  it("should apply default padding for desktop", () => {
    mockUseLayout.mockReturnValue({
      width: 1200,
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    });
    const { UNSAFE_getAllByType } = render(
      <ResponsiveCard>
        <Text>Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    const views = UNSAFE_getAllByType(View);
    const contentView = views.find((view) =>
      (Array.isArray(view.props.style)
        ? view.props.style
        : [view.props.style]
      ).some((s: any) => s?.padding === 24),
    );
    expect(contentView).toBeTruthy();
  });

  it("should apply default padding for mobile", () => {
    mockUseLayout.mockReturnValue({
      width: 400,
      isDesktop: false,
      isTablet: false,
      isMobile: true,
    });
    const { UNSAFE_getAllByType } = render(
      <ResponsiveCard>
        <Text>Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    const views = UNSAFE_getAllByType(View);
    const contentView = views.find((view) =>
      (Array.isArray(view.props.style)
        ? view.props.style
        : [view.props.style]
      ).some((s: any) => s?.padding === 16),
    );
    expect(contentView).toBeTruthy();
  });

  it("should apply custom padding", () => {
    const { UNSAFE_getAllByType } = render(
      <ResponsiveCard padding={20}>
        <Text>Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    const views = UNSAFE_getAllByType(View);
    const contentView = views.find((view) =>
      (Array.isArray(view.props.style)
        ? view.props.style
        : [view.props.style]
      ).some((s: any) => s?.padding === 20),
    );
    expect(contentView).toBeTruthy();
  });

  it("should apply responsive padding", () => {
    const { getByTestId } = render(
      <ResponsiveCard padding={{ xs: 8, md: 16, lg: 24 }}>
        <Text>Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    const contentView = getByTestId("responsive-card-content");
    const styles = Array.isArray(contentView.props.style)
      ? contentView.props.style
      : contentView.props.style
        ? [contentView.props.style]
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

  it("should apply default margin for desktop", () => {
    mockUseLayout.mockReturnValue({
      width: 1200,
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    });
    const { getByTestId } = render(
      <ResponsiveCard>
        <Text>Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    const container = getByTestId("responsive-card-container");
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
    expect(flattenedStyle.margin).toBe(16);
  });

  it("should apply custom margin", () => {
    const { getByTestId } = render(
      <ResponsiveCard margin={20}>
        <Text>Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    const container = getByTestId("responsive-card-container");
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
    expect(flattenedStyle.margin).toBe(20);
  });

  it("should apply maxWidth", () => {
    const { getByTestId } = render(
      <ResponsiveCard maxWidth={600}>
        <Text>Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    const container = getByTestId("responsive-card-container");
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
    expect(flattenedStyle.maxWidth).toBe(600);
  });

  it("should handle onPress", () => {
    const onPress = jest.fn();
    const { UNSAFE_getByType } = render(
      <ResponsiveCard onPress={onPress}>
        <Text>Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    const card = UNSAFE_getByType(Card);
    expect(card.props.onPress).toBe(onPress);
  });

  it("should apply card mode", () => {
    const { UNSAFE_getByType } = render(
      <ResponsiveCard mode="outlined">
        <Text>Content</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    const card = UNSAFE_getByType(Card);
    expect(card.props.mode).toBe("outlined");
  });

  it("should match snapshot with default props", () => {
    const { toJSON } = render(
      <ResponsiveCard>
        <Text>Snapshot Test</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should match snapshot with outlined mode", () => {
    const { toJSON } = render(
      <ResponsiveCard mode="outlined">
        <Text>Snapshot Test</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should match snapshot with custom padding and margin", () => {
    const { toJSON } = render(
      <ResponsiveCard padding={20} margin={16}>
        <Text>Snapshot Test</Text>
      </ResponsiveCard>,
      { wrapper },
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
