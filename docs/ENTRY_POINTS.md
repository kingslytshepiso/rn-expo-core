# Entry Points Configuration

This project uses a dual entry point setup to support both:

1. **Running the demo app** (for development and testing)
2. **Publishing the package** (for distribution)

## Entry Point Configuration

### For Running the App (Expo)

The `main` field in `package.json` points to the app entry:

```json
{
  "main": "index.ts"
}
```

This is used by Expo when running `npm start` or `expo start`. The `index.ts` file at the root registers the `App` component.

### For Publishing the Package

The `exports` field in `package.json` defines the package entry point:

```json
{
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts",
      "require": "./src/index.ts"
    }
  }
}
```

When users install the package via npm, they import from `src/index.ts`:

```typescript
import { ThemeProvider, LayoutTracker } from "rn-expo-core";
```

## How It Works

- **During Development**: Expo uses `main: "index.ts"` to run the demo app
- **When Published**: npm uses `exports["."]` to resolve package imports
- **Package Structure**: Only `src/` directory is published (via `files` field)

## File Structure

```
.
├── index.ts          # App entry point (for Expo)
├── App.tsx           # Demo app component
├── src/
│   └── index.ts      # Package entry point (for publishing)
└── package.json      # Contains both entry point configurations
```

## Important Notes

- The `main` field is for Expo/React Native to run the app
- The `exports` field is for npm package resolution
- Both can coexist without conflict
- When publishing, only `src/` is included (not `index.ts` or `App.tsx`)
