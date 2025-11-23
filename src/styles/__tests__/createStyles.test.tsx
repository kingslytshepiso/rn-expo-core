import React from "react";
import { Text, View, Dimensions } from "react-native";
import { render } from "@testing-library/react-native";
import { useResponsiveStyles } from "../createStyles";
import { LayoutTracker } from "../../layout";
import { ThemeProvider } from "../../theme";

// Mock Dimensions using jest.spyOn to avoid breaking react-native
const mockDimensionsGet = jest.spyOn(Dimensions, "get");
const mockDimensionsAddEventListener = jest.spyOn(
  Dimensions,
  "addEventListener",
);

const TestComponent: React.FC = () => {
  const styles = useResponsiveStyles({
    container: {
      padding: 16,
      backgroundColor: "red",
    },
    // Use responsive value at top level, not nested
    text: {
      xs: { fontSize: 12, color: "blue" },
      md: { fontSize: 16, color: "blue" },
      lg: { fontSize: 20, color: "blue" },
    } as any,
  });

  return (
    <View>
      <View testID="container-padding" style={styles.container}>
        <Text>Container</Text>
      </View>
      <Text testID="text-size" style={styles.text}>
        Text
      </Text>
    </View>
  );
};

const TestComponentWithFunction: React.FC = () => {
  const styles = useResponsiveStyles((layout) => ({
    container: {
      padding: layout.isDesktop ? 24 : 16,
      width: layout.width > 1000 ? 1200 : "100%",
    },
  }));

  return (
    <View testID="dynamic-container" style={styles.container}>
      <Text>Dynamic</Text>
    </View>
  );
};

describe("useResponsiveStyles", () => {
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

  it("should return styles object", () => {
    const { getByTestId } = render(<TestComponent />, { wrapper });
    expect(getByTestId("container-padding")).toBeTruthy();
  });

  it("should apply static values", () => {
    const { getByTestId } = render(<TestComponent />, { wrapper });
    const container = getByTestId("container-padding");
    // Check that the component renders (style is applied internally by RN)
    expect(container).toBeTruthy();
    // Verify the style prop exists (React Native processes it internally)
    // The actual style application is tested by rendering, not by inspecting props
    const style = container.props.style;
    expect(style).toBeDefined();
    // If style is an object, verify it has the expected properties
    if (style && typeof style === "object" && !Array.isArray(style)) {
      expect(style).toMatchObject({
        padding: 16,
        backgroundColor: "red",
      });
    } else if (Array.isArray(style)) {
      // If it's an array, flatten and check
      const flattened = style.reduce((acc, s) => {
        if (s && typeof s === "object") return { ...acc, ...s };
        return acc;
      }, {});
      expect(flattened).toMatchObject({
        padding: 16,
        backgroundColor: "red",
      });
    }
  });

  it("should resolve responsive values", () => {
    mockDimensionsGet.mockReturnValue({
      width: 1000,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponent />, { wrapper });
    const text = getByTestId("text-size");
    expect(text).toBeTruthy();
    const style = text.props.style;
    expect(style).toBeDefined();
    // Should resolve to lg value (20) for width 1000
    if (style && typeof style === "object" && !Array.isArray(style)) {
      expect(style).toMatchObject({ fontSize: 20 });
    } else if (Array.isArray(style)) {
      const flattened = style.reduce((acc, s) => {
        if (s && typeof s === "object") return { ...acc, ...s };
        return acc;
      }, {});
      expect(flattened).toMatchObject({ fontSize: 20 });
    }
  });

  it("should work with function that receives layout", () => {
    mockDimensionsGet.mockReturnValue({
      width: 1200,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponentWithFunction />, { wrapper });
    const container = getByTestId("dynamic-container");
    expect(container).toBeTruthy();
    const style = container.props.style;
    expect(style).toBeDefined();
    if (style && typeof style === "object" && !Array.isArray(style)) {
      expect(style).toMatchObject({
        padding: 24,
        width: 1200,
      });
    } else if (Array.isArray(style)) {
      const flattened = style.reduce((acc, s) => {
        if (s && typeof s === "object") return { ...acc, ...s };
        return acc;
      }, {});
      expect(flattened).toMatchObject({
        padding: 24,
        width: 1200,
      });
    }
  });

  it("should handle mobile layout in function", () => {
    mockDimensionsGet.mockReturnValue({
      width: 400,
      height: 800,
    } as any);
    const { getByTestId } = render(<TestComponentWithFunction />, { wrapper });
    const container = getByTestId("dynamic-container");
    expect(container).toBeTruthy();
    const style = container.props.style;
    expect(style).toBeDefined();
    if (style && typeof style === "object" && !Array.isArray(style)) {
      expect(style).toMatchObject({
        padding: 16,
        width: "100%",
      });
    } else if (Array.isArray(style)) {
      const flattened = style.reduce((acc, s) => {
        if (s && typeof s === "object") return { ...acc, ...s };
        return acc;
      }, {});
      expect(flattened).toMatchObject({
        padding: 16,
        width: "100%",
      });
    }
  });
});
