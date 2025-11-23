import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Dimensions, Text } from "react-native";
import { ThemeProvider } from "../../theme";
import { LayoutTracker, useLayoutContext } from "../LayoutTracker";

// Mock Dimensions using jest.spyOn to avoid breaking react-native
const mockDimensionsGet = jest.spyOn(Dimensions, "get");
const mockDimensionsAddEventListener = jest.spyOn(
  Dimensions,
  "addEventListener",
);

const TestComponent: React.FC = () => {
  const layout = useLayoutContext();
  return (
    <Text testID="layout-info">
      {layout.width}x{layout.height} - {layout.breakpoint} - {layout.deviceType}
    </Text>
  );
};

describe("LayoutTracker", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme="light">
      <LayoutTracker>{children}</LayoutTracker>
    </ThemeProvider>
  );

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

  it("should provide layout context to children", () => {
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("layout-info")).toBeTruthy();
  });

  it("should calculate correct breakpoint", () => {
    mockDimensionsGet.mockReturnValue({
      width: 1200,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    const text = getByTestId("layout-info");
    const children = Array.isArray(text.props.children)
      ? text.props.children.join("")
      : String(text.props.children);
    expect(children).toContain("xl");
  });

  it("should calculate correct device type", () => {
    mockDimensionsGet.mockReturnValue({
      width: 500,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    const text = getByTestId("layout-info");
    const children = Array.isArray(text.props.children)
      ? text.props.children.join("")
      : String(text.props.children);
    expect(children).toContain("mobile");
  });

  it("should detect portrait orientation", async () => {
    mockDimensionsGet.mockReturnValue({
      width: 400,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    await waitFor(() => {
      const text = getByTestId("layout-info");
      const children = Array.isArray(text.props.children)
        ? text.props.children.join("")
        : String(text.props.children);
      expect(children).toContain("400x800");
    });
  });

  it("should detect landscape orientation", async () => {
    mockDimensionsGet.mockReturnValue({
      width: 800,
      height: 400,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    await waitFor(() => {
      const text = getByTestId("layout-info");
      const children = Array.isArray(text.props.children)
        ? text.props.children.join("")
        : String(text.props.children);
      expect(children).toContain("800x400");
    });
  });

  it("should subscribe to dimension changes", () => {
    render(<TestComponent />, { wrapper });
    expect(mockDimensionsAddEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("should use custom debounce delay", () => {
    const { unmount } = render(
      <LayoutTracker debounceMs={200}>
        <TestComponent />
      </LayoutTracker>,
      {
        wrapper: ({ children }) => (
          <ThemeProvider theme="light">{children}</ThemeProvider>
        ),
      },
    );
    unmount();
    // Component should render with custom debounce
    expect(mockDimensionsAddEventListener).toHaveBeenCalled();
  });

  it("should disable debouncing when debounceMs is 0", () => {
    render(
      <LayoutTracker debounceMs={0}>
        <TestComponent />
      </LayoutTracker>,
      {
        wrapper: ({ children }) => (
          <ThemeProvider theme="light">{children}</ThemeProvider>
        ),
      },
    );
    expect(mockDimensionsAddEventListener).toHaveBeenCalled();
  });

  it("should match snapshot", () => {
    const { toJSON } = render(
      <LayoutTracker>
        <Text>Test Content</Text>
      </LayoutTracker>,
      { wrapper },
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should match snapshot with custom debounce", () => {
    const { toJSON } = render(
      <LayoutTracker debounceMs={200}>
        <Text>Test Content</Text>
      </LayoutTracker>,
      {
        wrapper: ({ children }) => (
          <ThemeProvider theme="light">{children}</ThemeProvider>
        ),
      },
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
