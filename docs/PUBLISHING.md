# Publishing Guide

This guide explains how to publish `rn-expo-core` to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup)
2. **Login**: Authenticate with npm
3. **Repository**: (Optional) Set up a Git repository URL

## Pre-Publishing Checklist

- ✅ Package name: `rn-expo-core`
- ✅ Version: `1.0.0`
- ✅ Main entry: `src/index.ts`
- ✅ All tests passing
- ✅ Type checking passing
- ✅ Linting passing
- ✅ Files array configured (only publishes `src/`, `README.md`, `CHANGELOG.md`)

## Publishing Steps

### 1. Update Repository URL (Optional)

If you have a Git repository, update the repository URL in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/rn-expo-core.git"
  }
}
```

### 2. Login to npm

```bash
npm login
```

Enter your npm username, password, and email when prompted.

### 3. Verify Package Name Availability

Check if the package name is available:

```bash
npm view rn-expo-core
```

If it returns a 404, the name is available. If it returns package info, the name is taken.

### 4. Build Check (Optional)

Since this is a TypeScript package, you may want to verify the structure:

```bash
npm pack --dry-run
```

This shows what files would be included in the package.

### 5. Publish to npm

**For first-time publishing:**

```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages or to explicitly make it public.

**For subsequent versions:**

1. Update version in `package.json` (or use `npm version patch/minor/major`)
2. Update `CHANGELOG.md`
3. Commit changes
4. Run `npm publish`

### 6. Verify Publication

After publishing, verify the package is available:

```bash
npm view rn-expo-core
```

## Version Management

Use npm's version commands to bump versions:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

These commands will:
- Update `package.json` version
- Create a git tag
- Commit the changes

Then publish with: `npm publish`

## Package Contents

The `files` field in `package.json` ensures only these are published:
- `src/` - All source code
- `README.md` - Documentation
- `CHANGELOG.md` - Version history

This excludes:
- Test files
- Documentation files in `docs/`
- Example screens
- Configuration files
- Development dependencies

## Installation

After publishing, users can install the package:

```bash
npm install rn-expo-core
```

## Important Notes

- **Private packages**: If you want to keep it private, use `npm publish --access restricted` (requires npm paid plan)
- **Unpublishing**: You can unpublish within 72 hours, but be careful as this affects users
- **Version tags**: npm automatically creates tags for versions
- **README**: The README.md will appear on the npm package page

## Troubleshooting

### "Package name already exists"
- Choose a different name
- Or use a scoped package: `@yourusername/rn-expo-core`

### "You do not have permission"
- Make sure you're logged in: `npm whoami`
- Check if the package name is available
- For scoped packages, ensure you have the right permissions

### "Invalid package name"
- Package names must be lowercase
- Can contain hyphens and underscores
- Cannot start with a dot or underscore

