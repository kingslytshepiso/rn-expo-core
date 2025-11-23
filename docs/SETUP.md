# Setup Instructions

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

## Installation Steps

1. **Install Dependencies**

   Since the initial npm install may have network issues, try:
   
   ```bash
   npm install
   ```
   
   If you encounter network errors, you can try:
   - Using a different network
   - Clearing npm cache: `npm cache clean --force`
   - Using yarn instead: `yarn install`

2. **Required Dependencies**

   The following packages need to be installed:
   - `react-native-paper` - Material Design components and theming
   - `react-native-safe-area-context` - Safe area handling
   - `react-native-screens` - Native screen management
   - `@expo/eslint-config` - ESLint configuration
   - `@testing-library/react-native` - Testing utilities
   - `@testing-library/jest-native` - Jest matchers
   - `jest` and `jest-expo` - Testing framework
   - `@types/jest` - TypeScript types for Jest

3. **Verify Installation**

   Check that all dependencies are installed:
   ```bash
   npm list --depth=0
   ```

## Running the Project

1. **Start the Development Server**

   ```bash
   npm start
   ```

2. **Run on Specific Platform**

   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

## Development Commands

- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run type-check` - Check TypeScript types

## Project Structure

```
core/
├── src/                    # Utility package source code
│   ├── components/         # Reusable components
│   ├── layout/             # Layout tracking utilities
│   ├── styles/             # Styling utilities
│   └── theme/              # Theming system
├── screens/                # Example screens
├── App.tsx                 # Main app entry point
└── package.json            # Dependencies and scripts
```

## Troubleshooting

### Network Issues During Installation

If you encounter network errors:
1. Check your internet connection
2. Try using a VPN if behind a corporate firewall
3. Clear npm cache: `npm cache clean --force`
4. Delete `node_modules` and `package-lock.json`, then reinstall

### TypeScript Errors

If you see TypeScript errors about missing types:
1. Ensure `@types/jest` is installed
2. Run `npm run type-check` to see all type errors
3. Make sure `tsconfig.json` includes the test types

### Module Not Found Errors

If you see "Cannot find module" errors:
1. Ensure all dependencies are installed: `npm install`
2. Clear Metro bundler cache: `npm start -- --reset-cache`
3. Delete `node_modules` and reinstall

## Next Steps

After installation:
1. Review the `README.md` for usage examples
2. Check `CHANGELOG.md` for recent updates
3. Explore the example screen at `screens/ExamplesScreen.tsx`
4. Run the app to see the component examples


