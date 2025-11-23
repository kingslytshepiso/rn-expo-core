import React from "react";
import { Text, View, Dimensions } from "react-native";
import { render } from "@testing-library/react-native";
import { useLayout } from "../useLayout";
import { LayoutTracker } from "../LayoutTracker";
import { ThemeProvider } from "../../theme";

// Mock Dimensions using jest.spyOn to avoid breaking react-native
const mockDimensionsGet = jest.spyOn(Dimensions, "get");
const mockDimensionsAddEventListener = jest.spyOn(
  Dimensions,
  "addEventListener",
);

const TestComponent: React.FC = () => {
  const layout = useLayout();
  return (
    <View>
      <Text testID="width">{layout.width}</Text>
      <Text testID="height">{layout.height}</Text>
      <Text testID="breakpoint">{layout.breakpoint}</Text>
      <Text testID="device-type">{layout.deviceType}</Text>
      <Text testID="is-mobile">{layout.isMobile ? "yes" : "no"}</Text>
      <Text testID="is-tablet">{layout.isTablet ? "yes" : "no"}</Text>
      <Text testID="is-desktop">{layout.isDesktop ? "yes" : "no"}</Text>
      <Text testID="is-portrait">{layout.isPortrait ? "yes" : "no"}</Text>
      <Text testID="is-landscape">{layout.isLandscape ? "yes" : "no"}</Text>
      <Text testID="matches-md">{layout.matches("md") ? "yes" : "no"}</Text>
      <Text testID="matches-lg">{layout.matches("lg") ? "yes" : "no"}</Text>
    </View>
  );
};

describe("useLayout", () => {
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

  it("should return layout information", () => {
    mockDimensionsGet.mockReturnValue({
      width: 800,
      height: 600,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("width").props.children).toBe(800);
    expect(getByTestId("height").props.children).toBe(600);
  });

  it("should return correct breakpoint", () => {
    mockDimensionsGet.mockReturnValue({
      width: 1000,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("breakpoint").props.children).toBe("lg");
  });

  it("should return correct device type", () => {
    mockDimensionsGet.mockReturnValue({
      width: 500,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("device-type").props.children).toBe("mobile");
  });

  it("should return isMobile correctly", () => {
    mockDimensionsGet.mockReturnValue({
      width: 500,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("is-mobile").props.children).toBe("yes");
    expect(getByTestId("is-desktop").props.children).toBe("no");
  });

  it("should return isTablet correctly", () => {
    mockDimensionsGet.mockReturnValue({
      width: 800,
      height: 1000,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("is-tablet").props.children).toBe("yes");
  });

  it("should return isDesktop correctly", () => {
    mockDimensionsGet.mockReturnValue({
      width: 1200,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("is-desktop").props.children).toBe("yes");
    expect(getByTestId("is-mobile").props.children).toBe("no");
  });

  it("should detect portrait orientation", () => {
    mockDimensionsGet.mockReturnValue({
      width: 400,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("is-portrait").props.children).toBe("yes");
    expect(getByTestId("is-landscape").props.children).toBe("no");
  });

  it("should detect landscape orientation", () => {
    mockDimensionsGet.mockReturnValue({
      width: 800,
      height: 400,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("is-landscape").props.children).toBe("yes");
    expect(getByTestId("is-portrait").props.children).toBe("no");
  });

  it("should match breakpoints correctly", () => {
    mockDimensionsGet.mockReturnValue({
      width: 1000,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("matches-md").props.children).toBe("yes");
    expect(getByTestId("matches-lg").props.children).toBe("yes");
  });

  it("should not match smaller breakpoints", () => {
    mockDimensionsGet.mockReturnValue({
      width: 500,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("matches-md").props.children).toBe("no");
    expect(getByTestId("matches-lg").props.children).toBe("no");
  });
});
