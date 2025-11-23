# Publishing Instructions for rn-expo-core

## ✅ Pre-Publishing Checklist

- ✅ Package name updated to `rn-expo-core`
- ✅ Version set to `1.0.0`
- ✅ All tests passing (20/20)
- ✅ Type checking passing
- ✅ Linting passing
- ✅ Files array configured
- ✅ Git commit completed

## 📦 Publishing Steps

### 1. Login to npm

```bash
npm login
```

Enter your npm credentials when prompted.

### 2. Verify Package Name

The package name `rn-expo-core` should be available. Verify with:

```bash
npm view rn-expo-core
```

If it returns 404, the name is available. If it shows package info, you'll need to choose a different name.

### 3. Update Repository URL (Optional)

If you have a Git repository, update the `repository.url` in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/rn-expo-core.git"
  }
}
```

### 4. Publish to npm

```bash
npm publish --access public
```

The `--access public` flag makes the package publicly available on npm.

### 5. Verify Publication

After publishing, verify the package is available:

```bash
npm view rn-expo-core
```

## 📝 What Gets Published

Based on the `files` field in `package.json`, only these will be published:
- `src/` directory (all source code including tests)
- `README.md`
- `CHANGELOG.md`

## 🔄 Future Updates

For future versions:

1. Update version: `npm version patch|minor|major`
2. Update `CHANGELOG.md`
3. Commit: `git commit -am "Bump version to X.X.X"`
4. Publish: `npm publish`

## 📚 Installation

After publishing, users can install with:

```bash
npm install rn-expo-core
```

## ⚠️ Important Notes

- Make sure you're logged into npm: `npm whoami`
- The package will be publicly available on npmjs.com
- You can unpublish within 72 hours if needed
- Consider adding author information in `package.json` before publishing

