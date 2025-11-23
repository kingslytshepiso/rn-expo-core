# Project Structure

This document outlines the structure of the Core React Native Expo Component Utility Package.

## Directory Structure

```
core/
├── src/                          # Main utility package source
│   ├── components/               # Reusable responsive components
│   │   ├── ResponsiveContainer.tsx
│   │   ├── ResponsiveText.tsx
│   │   ├── ResponsiveCard.tsx
│   │   └── index.ts
│   ├── layout/                   # Layout tracking and responsive utilities
│   │   ├── LayoutTracker.tsx    # Context provider for layout tracking
│   │   ├── useLayout.ts         # Hook for accessing layout info
│   │   ├── breakpoints.ts       # Breakpoint definitions
│   │   ├── responsive.ts        # Responsive value utilities
│   │   ├── __tests__/           # Unit tests
│   │   └── index.ts
│   ├── styles/                   # Styling utilities
│   │   ├── createStyles.ts      # Responsive style helpers
│   │   ├── spacing.ts           # Spacing scale utilities
│   │   ├── layoutStyles.ts      # Layout utility classes
│   │   ├── __tests__/           # Unit tests
│   │   └── index.ts
│   ├── theme/                    # Theming system
│   │   ├── ThemeProvider.tsx    # Theme provider component
│   │   ├── themeConfig.ts       # Light/dark theme configurations
│   │   ├── useTheme.ts          # Hook for accessing theme
│   │   ├── __tests__/           # Unit tests
│   │   └── index.ts
│   └── index.ts                  # Main package entry point
├── screens/                      # Example screens
│   └── ExamplesScreen.tsx       # Demo screen showcasing components
├── App.tsx                       # Main app entry point
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── jest.config.js                # Jest testing configuration
├── .eslintrc.js                  # ESLint configuration (Expo default)
├── CHANGELOG.md                  # Changelog tracking
├── README.md                     # Project documentation
├── SETUP.md                      # Setup instructions
└── PROJECT_STRUCTURE.md          # This file
```

## Key Features

### 1. Theming System (`src/theme/`)
- Built on React Native Paper
- Light and dark theme support
- Automatic theme switching based on system preferences
- Customizable color palette and typography

### 2. Layout Tracking (`src/layout/`)
- Real-time screen dimension tracking
- Breakpoint system (xs, sm, md, lg, xl, xxl)
- Device type detection (mobile, tablet, desktop)
- Orientation tracking (portrait/landscape)
- Responsive value utilities

### 3. Styling Utilities (`src/styles/`)
- Spacing scale based on 8px grid
- Flexbox layout utilities
- Padding and margin helpers
- Border radius utilities
- Responsive style creation helpers

### 4. Reusable Components (`src/components/`)
- `ResponsiveContainer`: Container with responsive max-width and padding
- `ResponsiveText`: Text component with responsive font sizes
- `ResponsiveCard`: Card component with responsive padding and margins

## Testing

Unit tests are located in `__tests__` directories alongside their source files:
- `src/theme/__tests__/` - Theme configuration tests
- `src/layout/__tests__/` - Breakpoint and responsive utility tests
- `src/styles/__tests__/` - Spacing utility tests

## Usage Flow

1. **App Setup**: Wrap app with `ThemeProvider` and `LayoutTracker`
2. **Component Development**: Use hooks (`useTheme`, `useLayout`) and utilities
3. **Styling**: Apply responsive styles using utilities and helper functions
4. **Testing**: Run tests to ensure functionality
5. **Linting**: Use ESLint to maintain code quality

## Entry Points

- **Package Entry**: `src/index.ts` - Exports all public APIs
- **App Entry**: `App.tsx` - Main application component
- **Examples**: `screens/ExamplesScreen.tsx` - Demo screen

## Configuration Files

- `package.json` - Dependencies and npm scripts
- `tsconfig.json` - TypeScript compiler options
- `jest.config.js` - Jest test configuration
- `.eslintrc.js` - ESLint rules (using Expo defaults)
- `CHANGELOG.md` - Version history and changes


