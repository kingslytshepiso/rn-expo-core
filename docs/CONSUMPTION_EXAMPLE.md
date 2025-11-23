# How to Consume rn-expo-core in Your Projects

This guide shows you how to use `rn-expo-core` in a new or existing React Native Expo project.

## Step 1: Install the Package

```bash
npm install rn-expo-core
```

## Step 2: Install Peer Dependencies

```bash
npx expo install react-native-paper react-native-safe-area-context react-native-screens
```

## Step 3: Setup Your App

### Basic Setup

Create or update your root component:

```tsx
// App.tsx or Root.tsx
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, LayoutTracker } from "rn-expo-core";
import YourApp from "./YourApp";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme="auto">
        <LayoutTracker>
          <YourApp />
        </LayoutTracker>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

## Step 4: Use the Utilities

### Example: Responsive Screen

```tsx
// screens/HomeScreen.tsx
import React from "react";
import { View, ScrollView } from "react-native";
import {
  ResponsiveContainer,
  ResponsiveCard,
  ResponsiveText,
  useLayout,
  useTheme,
  getSpacing,
  flex,
  padding,
} from "rn-expo-core";

export default function HomeScreen() {
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
            Welcome
          </ResponsiveText>

          <ResponsiveText
            variant="bodyMedium"
            style={{
              color: theme.colors.text,
              marginTop: getSpacing(2),
            }}
          >
            Breakpoint: {layout.breakpoint}
          </ResponsiveText>

          <ResponsiveText
            variant="bodyMedium"
            style={{ color: theme.colors.text }}
          >
            Device: {layout.deviceType}
          </ResponsiveText>
        </ResponsiveCard>
      </ResponsiveContainer>
    </ScrollView>
  );
}
```

### Example: Conditional Rendering

```tsx
import { useLayout } from "rn-expo-core";

function MyComponent() {
  const layout = useLayout();

  if (layout.isMobile) {
    return <MobileView />;
  }

  if (layout.isTablet) {
    return <TabletView />;
  }

  return <DesktopView />;
}
```

### Example: Responsive Styling

```tsx
import { useLayout, getResponsiveValue, responsive } from "rn-expo-core";

function MyComponent() {
  const layout = useLayout();

  const containerStyle = {
    padding: getResponsiveValue(
      responsive({
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
      }),
      layout.width,
    ),
    maxWidth: layout.isDesktop ? 1200 : "100%",
  };

  return <View style={containerStyle}>Content</View>;
}
```

## Step 5: TypeScript Support

The package includes full TypeScript support. Import types as needed:

```tsx
import type {
  Breakpoint,
  DeviceType,
  ResponsiveValue,
  SpacingKey,
} from "rn-expo-core";

function MyComponent() {
  const breakpoint: Breakpoint = "md";
  const device: DeviceType = "tablet";
  const spacing: SpacingKey = 4;
}
```

## Complete Project Structure

```
your-project/
├── App.tsx              # Root with providers
├── screens/
│   └── HomeScreen.tsx   # Uses rn-expo-core
├── components/
│   └── MyComponent.tsx  # Uses rn-expo-core
└── package.json         # Includes rn-expo-core
```

## Common Patterns

### Pattern 1: Theme-Aware Components

```tsx
import { useTheme } from "rn-expo-core";

function ThemedButton() {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.primary,
        padding: 16,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: theme.colors.onPrimary }}>Button</Text>
    </TouchableOpacity>
  );
}
```

### Pattern 2: Responsive Grid

```tsx
import { useLayout, getSpacing } from "rn-expo-core";

function Grid() {
  const layout = useLayout();
  const columns = layout.isDesktop ? 3 : layout.isTablet ? 2 : 1;
  const gap = getSpacing(2);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap,
      }}
    >
      {items.map((item) => (
        <View
          key={item.id}
          style={{
            width: `${100 / columns}%`,
            padding: gap / 2,
          }}
        >
          {item.content}
        </View>
      ))}
    </View>
  );
}
```

### Pattern 3: Breakpoint-Based Styles

```tsx
import { useLayout, getResponsiveValue, responsive } from "rn-expo-core";

function AdaptiveComponent() {
  const layout = useLayout();

  const fontSize = getResponsiveValue(
    responsive({
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
    }),
    layout.width,
  );

  return <Text style={{ fontSize }}>Adaptive Text</Text>;
}
```

## Troubleshooting

### Import Errors

Make sure you're importing from the package:

```tsx
// ✅ Correct
import { ThemeProvider } from "rn-expo-core";

// ❌ Wrong
import { ThemeProvider } from "./rn-expo-core";
```

### Provider Errors

Ensure all providers are set up:

```tsx
// ✅ Correct order
<SafeAreaProvider>
  <ThemeProvider>
    <LayoutTracker>
      <App />
    </LayoutTracker>
  </ThemeProvider>
</SafeAreaProvider>
```

### Type Errors

Install TypeScript types:

```bash
npm install --save-dev @types/react @types/react-native typescript
```

## Next Steps

- Read the [Usage Guide](./docs/USAGE_GUIDE.md) for detailed API documentation
- Check the [Project Structure](./PROJECT_STRUCTURE.md) to understand the package organization
- See the demo app in this repository for more examples
