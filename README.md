# rn-expo-core - React Native Expo Component Utility Package

A reusable component utility package for cross-platform React Native Expo projects. This package provides theming, layout styling classes, and real-time layout tracking for different devices with different screen sizes, focusing on mobile and web desktop.

## Features

- 🎨 **Theming System**: Built on top of React Native Paper with light/dark theme support
- 📱 **Responsive Design**: Real-time layout tracking for mobile, tablet, and desktop
- 🎯 **Layout Utilities**: Reusable styling classes and utilities
- 🧩 **Reusable Components**: Pre-built responsive components
- ✅ **Testing**: Unit tests for utilities and components
- 🔍 **Linting**: ESLint configuration using Expo's default rules
- 📝 **Changelog**: Automatic tracking of updates and changes

## Installation

```bash
npm install rn-expo-core
```

### Peer Dependencies

Install required peer dependencies:

```bash
npx expo install react-native-paper react-native-safe-area-context react-native-screens
```

## Documentation

For detailed documentation, see the [docs](./docs/) directory:

- **[Usage Guide](./docs/USAGE_GUIDE.md)** - Complete API documentation
- **[Consumption Example](./docs/CONSUMPTION_EXAMPLE.md)** - Integration guide
- **[Project Structure](./docs/PROJECT_STRUCTURE.md)** - Package organization

See [docs/README.md](./docs/README.md) for the full documentation index.

## Dependencies

- `react-native-paper`: Material Design 3 components and theming
- `react-native-safe-area-context`: Safe area handling
- `react-native-screens`: Native screen management
- `expo`: Expo framework

## Project Structure

```
core/
├── src/
│   ├── components/          # Reusable responsive components
│   ├── layout/              # Layout tracking and responsive utilities
│   ├── styles/              # Styling utilities and classes
│   ├── theme/               # Theming system
│   └── index.ts             # Main entry point
├── screens/                 # Example screens
├── App.tsx                  # Main app component
└── package.json
```

## Usage

### Setup

#### Option 1: Using AppProviders (Recommended)

The easiest way to set up all required providers:

```tsx
import { AppProviders } from "rn-expo-core";

export default function App() {
  return <AppProviders theme="auto">{/* Your app content */}</AppProviders>;
}
```

#### Option 2: Individual Providers

For more control, you can use providers individually:

```tsx
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, LayoutTracker } from "rn-expo-core";

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

### Exported Types

All context types and provider props are exported for TypeScript users:

```tsx
import type {
  LayoutContextValue,
  LayoutTrackerProps,
  ThemeProviderProps,
  AppProvidersProps,
} from "rn-expo-core";
```

### Using the Theme

#### Built-in Themes

```tsx
import { useTheme } from "rn-expo-core";

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ color: theme.colors.onPrimary }}>Hello</Text>
    </View>
  );
}
```

#### Custom Themes

You can pass your own React Native Paper theme:

```tsx
import { AppProviders, MD3Theme } from "rn-expo-core";
import { MD3LightTheme } from "react-native-paper";

const customTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#ff6b6b",
    secondary: "#4ecdc4",
  },
};

export default function App() {
  return (
    <AppProviders theme={customTheme}>
      <YourApp />
    </AppProviders>
  );
}
```

Or use with individual providers:

```tsx
import { ThemeProvider, MD3Theme } from "rn-expo-core";
import { MD3DarkTheme } from "react-native-paper";

const myCustomTheme: MD3Theme = {
  ...MD3DarkTheme,
  // Customize your theme
};

<ThemeProvider theme={myCustomTheme}>
  <App />
</ThemeProvider>;
```

### Using Layout Tracking

```tsx
import { useLayout } from "rn-expo-core";

function MyComponent() {
  const { width, height, deviceType, isMobile, isDesktop } = useLayout();

  return (
    <View style={{ padding: isMobile ? 16 : 24 }}>
      <Text>Device: {deviceType}</Text>
    </View>
  );
}
```

### Using Responsive Components

```tsx
import {
  ResponsiveContainer,
  ResponsiveText,
  ResponsiveCard,
} from "rn-expo-core";

function MyScreen() {
  return (
    <ResponsiveContainer maxWidth={{ md: 768, lg: 1200 }} padding={16}>
      <ResponsiveCard>
        <Card.Content>
          <ResponsiveText variant="headline">Title</ResponsiveText>
          <ResponsiveText variant="body">Content</ResponsiveText>
        </Card.Content>
      </ResponsiveCard>
    </ResponsiveContainer>
  );
}
```

### Using Layout Utilities

```tsx
import { flex, padding, margin, borderRadius } from "rn-expo-core";

function MyComponent() {
  return (
    <View style={[flex.row, flex.spaceBetween, padding.all(4)]}>
      <View style={[padding.all(2), borderRadius.md]}>
        <Text>Item 1</Text>
      </View>
      <View style={[padding.all(2), borderRadius.md]}>
        <Text>Item 2</Text>
      </View>
    </View>
  );
}
```

## Scripts

- `npm start`: Start Expo development server
- `npm run android`: Start on Android
- `npm run ios`: Start on iOS
- `npm run web`: Start on web
- `npm test`: Run tests
- `npm run test:watch`: Run tests in watch mode
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint errors
- `npm run type-check`: Run TypeScript type checking

## Testing

Tests are located alongside their source files in `__tests__` directories. Run tests with:

```bash
npm test
```

## Linting

This project uses Expo's default ESLint configuration. Run linting with:

```bash
npm run lint
```

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- [Setup Instructions](./docs/SETUP.md) - Installation and setup guide
- [Project Structure](./docs/PROJECT_STRUCTURE.md) - Detailed project architecture
- [Usage Examples](./docs/USAGE_EXAMPLES.md) - Practical code examples
- [Jest Setup](./docs/JEST_SETUP.md) - Testing configuration guide
- [Verification Status](./docs/VERIFICATION_STATUS.md) - Current project status

See [docs/README.md](./docs/README.md) for a complete documentation index.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed list of changes.

## License

Private
