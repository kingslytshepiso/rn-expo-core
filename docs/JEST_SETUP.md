# Jest Testing Setup for Expo

This document outlines the Jest testing configuration for Expo projects based on the latest official documentation.

## Official Expo Documentation

According to the [Expo Unit Testing Documentation](https://docs.expo.dev/develop/unit-testing/), here's the recommended setup:

## Installation

Install Jest and related packages using Expo's install command (this ensures compatible versions):

```bash
npx expo install jest-expo jest @types/jest --dev
```

**Note**: If your project doesn't use TypeScript, you can omit `@types/jest`.

**Important**: Always use `npx expo install` for Expo packages to ensure version compatibility.

## Configuration

### Option 1: Configuration in `package.json` (Recommended by Expo)

Add the Jest configuration directly to your `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ]
  }
}
```

### Option 2: Separate `jest.config.js` File

Alternatively, you can use a separate `jest.config.js` file (current approach):

```javascript
module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  setupFilesAfterEnv: ["@testing-library/react-native/jest-preset"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
    "!src/**/__mocks__/**",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
```

## Current Project Status

✅ **All tests passing!**

The project uses Expo's recommended minimal configuration:
- `preset: "jest-expo"` in `package.json`
- No custom Jest config files needed
- Expo handles all setup automatically

## Testing with React Native Testing Library

### Installation

```bash
npm install --save-dev @testing-library/react-native
```

### Usage Example

```typescript
import { render, screen } from "@testing-library/react-native";
import { MyComponent } from "./MyComponent";

test("renders correctly", () => {
  render(<MyComponent />);
  expect(screen.getByText("Hello")).toBeTruthy();
});
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Best Practices

1. **Test Location**: Place test files in `__tests__` directories alongside source files or use `.test.ts`/`.test.tsx` suffix.

2. **Test Structure**: Follow the Arrange-Act-Assert pattern:

```typescript
describe("Feature", () => {
  it("should do something", () => {
    // Arrange
    const input = "test";
    
    // Act
    const result = functionToTest(input);
    
    // Assert
    expect(result).toBe("expected");
  });
});
```

3. **Mocking**: Use Jest's mocking capabilities for external dependencies:

```typescript
jest.mock("react-native-paper", () => ({
  useTheme: () => ({ colors: { primary: "#6200ee" } }),
}));
```

## Best Practices

1. **Use `npx expo install`** for all Expo-related packages
2. **Keep configuration minimal** - let Expo handle it
3. **Don't override Expo's defaults** unless you have a specific need
4. **Test files** should be in `__tests__` directories or use `.test.ts`/`.test.tsx` suffix

## References

- [Expo Unit Testing Documentation](https://docs.expo.dev/develop/unit-testing/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

