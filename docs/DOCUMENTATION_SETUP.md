# API Documentation Setup

This project uses [TypeDoc](https://typedoc.org/) to automatically generate API documentation from TypeScript source code.

## How It Works

TypeDoc automatically:

- Reads TypeScript source files
- Extracts type information, interfaces, classes, and functions
- Generates HTML documentation from JSDoc comments
- Stays in sync with code changes (no manual updates needed!)

## Local Development

### Generate Documentation Locally

```bash
npm run docs
```

This generates documentation in `docs/api/` directory.

### View Documentation

Open `docs/api/index.html` in your browser to view the generated documentation.

## Automatic Deployment

Documentation is automatically built and deployed to GitHub Pages when:

- Code is pushed to `master` or `develop` branches
- Files in `src/` directory are changed
- `typedoc.json` or `package.json` are updated

The documentation will be available at:
`https://kingslytshepiso.github.io/rn-expo-core/`

## Adding Documentation Comments

To improve the generated documentation, add JSDoc comments to your code:

````typescript
/**
 * Hook to access layout information and responsive utilities
 *
 * @example
 * ```tsx
 * const { isDesktop, width } = useLayout();
 * ```
 */
export const useLayout = (): UseLayoutReturn => {
  // ...
};
````

## Configuration

Documentation settings are configured in `typedoc.json`:

- Entry point: `src/index.ts`
- Output directory: `docs/api`
- Theme: Default TypeDoc theme
- Excludes: Private, protected, and internal members

## Benefits

✅ **Automatic**: Documentation updates when code changes  
✅ **Type-Safe**: Generated from actual TypeScript types  
✅ **Always Current**: No manual documentation maintenance  
✅ **Searchable**: Full-text search in generated docs  
✅ **Versioned**: Documentation matches code versions

## Manual Override

If you need to manually trigger documentation build:

```bash
npm run docs:build
```
