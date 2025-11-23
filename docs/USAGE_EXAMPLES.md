# Usage Examples

This document provides practical examples of using the Core React Native Expo Component Utility Package.

## Basic Setup

```tsx
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/theme";
import { LayoutTracker } from "./src/layout";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme="auto">
        <LayoutTracker>{/* Your app content */}</LayoutTracker>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

## Theming Examples

### Using Theme Colors

```tsx
import { useTheme } from "./src/theme";
import { View, Text } from "react-native";

function ThemedComponent() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ color: theme.colors.onPrimary }}>Themed Text</Text>
    </View>
  );
}
```

### Custom Theme Provider

```tsx
import { ThemeProvider } from "./src/theme";

// Force light theme
<ThemeProvider theme="light">
  {/* Content */}
</ThemeProvider>

// Force dark theme
<ThemeProvider theme="dark">
  {/* Content */}
</ThemeProvider>

// Auto (follows system)
<ThemeProvider theme="auto">
  {/* Content */}
</ThemeProvider>
```

## Layout Tracking Examples

### Basic Layout Information

```tsx
import { useLayout } from "./src/layout";

function ResponsiveComponent() {
  const { width, height, deviceType, breakpoint } = useLayout();

  return (
    <View>
      <Text>Width: {width}px</Text>
      <Text>Height: {height}px</Text>
      <Text>Device: {deviceType}</Text>
      <Text>Breakpoint: {breakpoint}</Text>
    </View>
  );
}
```

### Conditional Rendering Based on Device

```tsx
import { useLayout } from "./src/layout";

function AdaptiveComponent() {
  const { isMobile, isTablet, isDesktop } = useLayout();

  if (isMobile) {
    return <MobileLayout />;
  }

  if (isTablet) {
    return <TabletLayout />;
  }

  return <DesktopLayout />;
}
```

### Responsive Values

```tsx
import { useLayout } from "./src/layout";
import { getResponsiveValue } from "./src/layout/responsive";

function ResponsivePadding() {
  const layout = useLayout();

  const padding = getResponsiveValue(
    {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32,
    },
    layout.width,
  );

  return <View style={{ padding }}>Content</View>;
}
```

## Styling Utilities Examples

### Using Spacing

```tsx
import { padding, margin, spacing } from "./src/styles";

// Using spacing scale
<View style={padding.all(4)}> {/* 16px padding */}
<View style={margin.horizontal(2)}> {/* 8px horizontal margin */}
<View style={padding.vertical(6)}> {/* 24px vertical padding */}

// Direct spacing values
<View style={padding.all(spacing[8])}> {/* 32px padding */}
```

### Flexbox Layouts

```tsx
import { flex, padding } from "./src/styles";

// Row layout
<View style={[flex.row, flex.spaceBetween, padding.all(4)]}>
  <Text>Left</Text>
  <Text>Right</Text>
</View>

// Column layout
<View style={[flex.column, flex.center, padding.all(4)]}>
  <Text>Centered</Text>
</View>
```

### Combining Utilities

```tsx
import { flex, padding, margin, borderRadius, width } from "./src/styles";

<View
  style={[
    flex.row,
    flex.center,
    padding.all(4),
    margin.bottom(2),
    borderRadius.md,
    width.full,
  ]}
>
  <Text>Styled Container</Text>
</View>;
```

## Component Examples

### ResponsiveContainer

```tsx
import { ResponsiveContainer } from "./src/components";

function MyScreen() {
  return (
    <ResponsiveContainer
      maxWidth={{ md: 768, lg: 1200 }}
      padding={{ xs: 16, md: 24, lg: 32 }}
    >
      <Text>Content adapts to screen size</Text>
    </ResponsiveContainer>
  );
}
```

### ResponsiveText

```tsx
import { ResponsiveText } from "./src/components";

function TextExample() {
  return (
    <>
      <ResponsiveText variant="headline">Headline</ResponsiveText>
      <ResponsiveText variant="title">Title</ResponsiveText>
      <ResponsiveText variant="body">Body text</ResponsiveText>
      <ResponsiveText variant="label">Label</ResponsiveText>

      {/* Custom size */}
      <ResponsiveText size={{ xs: 12, md: 16, lg: 20 }} color="#6200ee">
        Custom Text
      </ResponsiveText>
    </>
  );
}
```

### ResponsiveCard

```tsx
import { ResponsiveCard } from "./src/components";
import { Card } from "react-native-paper";

function CardExample() {
  return (
    <ResponsiveCard
      padding={{ xs: 16, md: 20, lg: 24 }}
      margin={{ xs: 8, md: 12, lg: 16 }}
      maxWidth={{ lg: 800 }}
    >
      <Card.Content>
        <Text>Card content</Text>
      </Card.Content>
    </ResponsiveCard>
  );
}
```

## Advanced Examples

### Custom Responsive Styles

```tsx
import { useResponsiveStyles } from "./src/styles/createStyles";
import { useLayout } from "./src/layout";

function CustomComponent() {
  const layout = useLayout();

  const styles = useResponsiveStyles({
    container: {
      padding: layout.isDesktop ? 24 : layout.isTablet ? 20 : 16,
      flexDirection: layout.isDesktop ? "row" : "column",
    },
    text: {
      fontSize: layout.isDesktop ? 18 : 14,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Responsive Content</Text>
    </View>
  );
}
```

### Breakpoint Matching

```tsx
import { useLayout } from "./src/layout";

function BreakpointExample() {
  const { matches, breakpoint } = useLayout();

  return (
    <View>
      {matches("lg") && <Text>Large screen content</Text>}
      {matches("md") && <Text>Medium screen content</Text>}
      {breakpoint === "xl" && <Text>Extra large screen</Text>}
    </View>
  );
}
```

### Complete Example: Responsive Dashboard

```tsx
import React from "react";
import { ScrollView, View } from "react-native";
import {
  ResponsiveContainer,
  ResponsiveText,
  ResponsiveCard,
} from "./src/components";
import { useLayout } from "./src/layout";
import { useTheme } from "./src/theme";
import { flex, padding, margin } from "./src/styles";

function Dashboard() {
  const layout = useLayout();
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={padding.all(4)}
    >
      <ResponsiveContainer
        maxWidth={layout.isDesktop ? 1200 : undefined}
        padding={layout.isDesktop ? 24 : 16}
      >
        <ResponsiveText variant="headline" style={margin.bottom(4)}>
          Dashboard
        </ResponsiveText>

        <View
          style={[flex.row, flex.wrap, { gap: layout.isDesktop ? 16 : 12 }]}
        >
          <ResponsiveCard
            style={[{ flex: layout.isDesktop ? 0.48 : 1 }, margin.bottom(2)]}
          >
            <Card.Content>
              <ResponsiveText variant="title">Card 1</ResponsiveText>
            </Card.Content>
          </ResponsiveCard>

          <ResponsiveCard
            style={[{ flex: layout.isDesktop ? 0.48 : 1 }, margin.bottom(2)]}
          >
            <Card.Content>
              <ResponsiveText variant="title">Card 2</ResponsiveText>
            </Card.Content>
          </ResponsiveCard>
        </View>
      </ResponsiveContainer>
    </ScrollView>
  );
}
```

## Best Practices

1. **Always wrap your app** with `ThemeProvider` and `LayoutTracker`
2. **Use responsive values** for spacing, sizing, and layout
3. **Leverage breakpoints** for conditional rendering
4. **Combine utilities** for complex layouts
5. **Test on multiple devices** to verify responsive behavior
6. **Use TypeScript** for type safety with responsive values
