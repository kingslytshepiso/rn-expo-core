# Usage Guide - rn-expo-core

This guide explains how to install, set up, and use `rn-expo-core` in your React Native Expo projects.

## Installation

### Public Package

```bash
npm install rn-expo-core
```

### Private Package (Scoped)

If published as a private scoped package:

```bash
npm install @kingsly_mokgwathi/rn-expo-core
```

## Quick Start

### 1. Install Dependencies

The package requires these peer dependencies. Install them if not already present:

```bash
npx expo install react-native-paper react-native-safe-area-context react-native-screens
```

### 2. Setup Providers

Wrap your app with the required providers:

```tsx
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, LayoutTracker } from "rn-expo-core";
import App from "./App";

export default function Root() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme="auto">
        <LayoutTracker>
          <App />
        </LayoutTracker>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

## Core Features

### 1. Theming System

#### ThemeProvider

Provides theme context to your app:

```tsx
import { ThemeProvider } from "rn-expo-core";

// Light theme
<ThemeProvider theme="light">
  <App />
</ThemeProvider>

// Dark theme
<ThemeProvider theme="dark">
  <App />
</ThemeProvider>

// Auto (follows system)
<ThemeProvider theme="auto">
  <App />
</ThemeProvider>
```

#### useTheme Hook

Access theme colors and properties:

```tsx
import { useTheme } from "rn-expo-core";

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello World</Text>
    </View>
  );
}
```

### 2. Layout Tracking

#### LayoutTracker

Tracks screen dimensions and device type in real-time:

```tsx
import { LayoutTracker } from "rn-expo-core";

<LayoutTracker>
  <App />
</LayoutTracker>;
```

#### useLayout Hook

Access layout information:

```tsx
import { useLayout } from "rn-expo-core";

function MyComponent() {
  const layout = useLayout();

  return (
    <View>
      <Text>Width: {layout.width}</Text>
      <Text>Height: {layout.height}</Text>
      <Text>Breakpoint: {layout.breakpoint}</Text>
      <Text>Device: {layout.deviceType}</Text>
      <Text>Is Mobile: {layout.isMobile ? "Yes" : "No"}</Text>
      <Text>Is Tablet: {layout.isTablet ? "Yes" : "No"}</Text>
      <Text>Is Desktop: {layout.isDesktop ? "Yes" : "No"}</Text>
    </View>
  );
}
```

#### Breakpoint Matching

```tsx
const layout = useLayout();

// Check if current width matches a breakpoint
if (layout.matches("md")) {
  // Medium breakpoint or larger
}

// Check multiple breakpoints
if (layout.matches("sm", "md")) {
  // Small or medium breakpoint
}
```

### 3. Responsive Utilities

#### Responsive Values

Use responsive values that adapt to screen size:

```tsx
import { getResponsiveValue, responsive } from "rn-expo-core";
import { useLayout } from "rn-expo-core";

function MyComponent() {
  const layout = useLayout();

  // Single value
  const padding = getResponsiveValue(16, layout.width);

  // Responsive object
  const margin = getResponsiveValue(
    responsive({
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32,
    }),
    layout.width,
  );

  return (
    <View style={{ padding, margin }}>
      <Text>Responsive padding and margin</Text>
    </View>
  );
}
```

### 4. Styling Utilities

#### Spacing

Use the 8px grid spacing system:

```tsx
import { getSpacing, spacing } from "rn-expo-core";

// Using spacing keys
const padding = getSpacing(4); // Returns 16 (4 * 4px)

// Direct values
const margin = getSpacing(20); // Returns 20 (not a spacing key)

// Access spacing object
const largeSpacing = spacing[8]; // Returns 32
```

#### Layout Styles

Pre-built utility classes:

```tsx
import {
  flex,
  flexRow,
  flexColumn,
  alignItemsCenter,
  justifyContentCenter,
  padding,
  margin,
  borderRadius,
} from "rn-expo-core";

<View
  style={[
    flex,
    flexRow,
    alignItemsCenter,
    justifyContentCenter,
    padding(16),
    margin(8),
    borderRadius(8),
  ]}
>
  <Text>Styled with utilities</Text>
</View>;
```

### 5. Responsive Components

#### ResponsiveContainer

Container that adapts max-width and padding:

```tsx
import { ResponsiveContainer } from "rn-expo-core";
import { useLayout } from "rn-expo-core";

function MyScreen() {
  const layout = useLayout();

  return (
    <ResponsiveContainer
      maxWidth={layout.isDesktop ? 1200 : undefined}
      padding={responsive({
        xs: 16,
        md: 24,
        lg: 32,
      })}
    >
      <Text>Content</Text>
    </ResponsiveContainer>
  );
}
```

#### ResponsiveText

Text component with responsive font sizes:

```tsx
import { ResponsiveText } from "rn-expo-core";

<ResponsiveText
  variant="headlineMedium"
  style={{ fontSize: responsive({ xs: 16, md: 20, lg: 24 }) }}
>
  Responsive Text
</ResponsiveText>;
```

#### ResponsiveCard

Card component with responsive padding and margin:

```tsx
import { ResponsiveCard } from "rn-expo-core";

<ResponsiveCard
  mode="elevated"
  elevation={2}
  padding={responsive({ xs: 16, md: 24 })}
  margin={responsive({ xs: 8, md: 16 })}
>
  <Text>Card Content</Text>
</ResponsiveCard>;
```

## Complete Example

```tsx
import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ThemeProvider,
  LayoutTracker,
  ResponsiveContainer,
  ResponsiveCard,
  ResponsiveText,
  useLayout,
  useTheme,
  getSpacing,
  flex,
  padding,
} from "rn-expo-core";

function HomeScreen() {
  const theme = useTheme();
  const layout = useLayout();

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={[flex, padding(getSpacing(4))]}
    >
      <ResponsiveContainer maxWidth={layout.isDesktop ? 1200 : undefined}>
        <ResponsiveCard
          padding={layout.isDesktop ? 24 : 16}
          margin={layout.isDesktop ? 16 : 8}
        >
          <ResponsiveText
            variant="headlineMedium"
            style={{
              fontSize: layout.isDesktop ? 24 : 20,
              color: theme.colors.text,
            }}
          >
            Welcome to rn-expo-core
          </ResponsiveText>

          <ResponsiveText
            variant="bodyMedium"
            style={{ color: theme.colors.text, marginTop: getSpacing(2) }}
          >
            Current breakpoint: {layout.breakpoint}
          </ResponsiveText>

          <ResponsiveText
            variant="bodyMedium"
            style={{ color: theme.colors.text }}
          >
            Device type: {layout.deviceType}
          </ResponsiveText>
        </ResponsiveCard>
      </ResponsiveContainer>
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme="auto">
        <LayoutTracker>
          <HomeScreen />
        </LayoutTracker>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

## TypeScript Support

The package is written in TypeScript and includes type definitions:

```tsx
import type {
  Breakpoint,
  DeviceType,
  ResponsiveValue,
  SpacingKey,
} from "rn-expo-core";

const breakpoint: Breakpoint = "md";
const device: DeviceType = "tablet";
const spacing: SpacingKey = 4;
```

## Best Practices

1. **Always wrap with providers**: Use `ThemeProvider` and `LayoutTracker` at the root
2. **Use responsive values**: Leverage `getResponsiveValue` for adaptive layouts
3. **Follow spacing scale**: Use `getSpacing` with spacing keys for consistency
4. **Check device type**: Use `useLayout` to conditionally render or style
5. **Theme-aware colors**: Always use `theme.colors` instead of hardcoded colors

## Troubleshooting

### Theme not working

Make sure `ThemeProvider` wraps your app and `react-native-paper` is installed.

### Layout tracking not working

Ensure `LayoutTracker` is present and `react-native-safe-area-context` is installed.

### Type errors

Make sure TypeScript is configured and `@types/react` and `@types/react-native` are installed.

## API Reference

See the main [README.md](../README.md) for complete API documentation.
