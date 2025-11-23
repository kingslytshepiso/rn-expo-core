# Project Structure

This project is organized to serve two purposes:

1. **Publishable Package**: The `src/` directory contains the reusable package code
2. **Demo/Test App**: The root-level files (`App.tsx`, `screens/`) provide a demo app to test components

## Package Structure (`src/`)

The `src/` directory contains the publishable package:

```
src/
├── components/     # Reusable responsive components
├── layout/         # Layout tracking and responsive utilities
├── styles/         # Styling utilities and classes
└── theme/          # Theming system based on react-native-paper
```

**Entry Point**: `src/index.ts` exports all public APIs

## Demo App Structure

The demo app is located at the project root:

```
.
├── App.tsx              # Main app component (demo app entry)
├── screens/              # Demo screens showing package usage
│   └── ExamplesScreen.tsx
├── index.ts              # Expo entry point
└── assets/               # Demo app assets
```

## Entry Points

### App Entry Point (for running the demo)

- **File**: `index.ts` at root
- **Purpose**: Registers the App component with Expo
- **Used by**: Expo when running `npm start`

### Package Entry Point (for publishing)

- **File**: `src/index.ts`
- **Purpose**: Exports all public APIs of the package
- **Used by**: npm when users install the package

## Import Patterns

### In the Demo App

The demo app imports from the package using relative paths:

```typescript
// In App.tsx or screens/ExamplesScreen.tsx
import { ThemeProvider, LayoutTracker } from "./src";
import { ResponsiveCard, useLayout } from "../src";
```

### After Publishing

When the package is published, users will import like this:

```typescript
import {
  ThemeProvider,
  LayoutTracker,
  ResponsiveCard,
  useLayout,
} from "rn-expo-core";
```

## Package Publishing

The `package.json` `files` field ensures only the package code is published:

```json
{
  "files": [
    "src", // Package source code
    "README.md", // Documentation
    "CHANGELOG.md" // Version history
  ]
}
```

**Excluded from package**:

- Demo app files (`App.tsx`, `screens/`, `index.ts`)
- Configuration files (`babel.config.js`, `tsconfig.json`, etc.)
- Test files (though they're in `src/`, they won't be imported by users)
- Documentation in `docs/` folder

## Development Workflow

1. **Develop Package**: Edit files in `src/` directory
2. **Test Components**: Use the demo app (`App.tsx`, `screens/ExamplesScreen.tsx`) to test components
3. **Run Tests**: `npm test` runs unit tests in `src/**/__tests__/`
4. **Publish**: Only `src/` and documentation files are published

## Running the Demo App

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

## Testing the Package

```bash
npm test           # Run all tests
npm run test:watch # Watch mode
```

## Key Points

- ✅ Package code is isolated in `src/`
- ✅ Demo app can test components without affecting package structure
- ✅ Publishing only includes package code, not demo app
- ✅ Clear separation between package and demo app
- ✅ Same import pattern works in both contexts (relative paths in demo, package name when published)
