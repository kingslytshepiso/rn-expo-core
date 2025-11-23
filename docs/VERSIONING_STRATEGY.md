# Versioning Strategy

This document outlines the versioning and branching strategy for `rn-expo-core`.

## Semantic Versioning

We follow [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (0.x.0): New features (backward compatible)
- **PATCH** (0.0.x): Bug fixes (backward compatible)

## Branch Strategy

### Main Branches

1. **`main`** (or `master`)
   - Production-ready code
   - Always stable and deployable
   - Protected branch (requires PR and approvals)
   - Only merged from `develop` or release branches

2. **`develop`**
   - Integration branch for features
   - Always in a deployable state
   - Merged into `main` for releases

### Supporting Branches

3. **Feature Branches** (`feature/*`)
   - Format: `feature/feature-name`
   - Example: `feature/add-dark-mode-toggle`
   - Created from: `develop`
   - Merged into: `develop`
   - Deleted after merge

4. **Release Branches** (`release/*`)
   - Format: `release/v1.2.0`
   - Example: `release/v1.2.0`
   - Created from: `develop` when ready for release
   - Merged into: `main` and `develop`
   - Used for final testing and bug fixes
   - Tagged with version number

5. **Hotfix Branches** (`hotfix/*`)
   - Format: `hotfix/v1.0.1`
   - Example: `hotfix/v1.0.1`
   - Created from: `main`
   - Merged into: `main` and `develop`
   - For critical production fixes

## Version Workflow

### Creating a New Feature

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/my-new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR to develop
git push origin feature/my-new-feature
```

### Creating a Release

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create release branch
git checkout -b release/v1.2.0

# Update version in package.json
npm version minor  # or patch, major

# Update CHANGELOG.md
# Final testing and bug fixes

# Merge to main
git checkout main
git merge release/v1.2.0
git tag v1.2.0
git push origin main --tags

# Merge back to develop
git checkout develop
git merge release/v1.2.0
git push origin develop

# Delete release branch
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0
```

### Creating a Hotfix

```bash
# Start from main
git checkout main
git pull origin main

# Create hotfix branch
git checkout -b hotfix/v1.0.1

# Fix the issue
git add .
git commit -m "fix: critical bug fix"

# Update version
npm version patch

# Merge to main
git checkout main
git merge hotfix/v1.0.1
git tag v1.0.1
git push origin main --tags

# Merge to develop
git checkout develop
git merge hotfix/v1.0.1
git push origin develop

# Delete hotfix branch
git branch -d hotfix/v1.0.1
git push origin --delete hotfix/v1.0.1
```

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:

```
feat: add responsive text component
fix: correct breakpoint calculation
docs: update usage guide
test: add tests for layout utilities
```

## Version Bumping

Use npm version commands:

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
- Create a git commit
- Create a git tag
- Update `CHANGELOG.md` (if configured)

## CHANGELOG.md

The `CHANGELOG.md` file tracks all version changes:

```markdown
## [1.2.0] - 2024-01-15

### Added

- New responsive card component
- Dark mode support

### Changed

- Updated breakpoint values

### Fixed

- Fixed layout tracking on web

## [1.1.0] - 2024-01-01

...
```

## Publishing

After versioning and tagging:

```bash
# Publish to npm
npm publish --access public

# Or for private scoped package
npm publish --access restricted
```

## Branch Protection Rules

Recommended GitHub/GitLab branch protection:

- **main**: Require PR, require approvals, require status checks (tests, lint)
- **develop**: Require PR, require status checks
- **release/\***: Require PR, require approvals

## Summary

- **Feature development**: `develop` ← `feature/*`
- **Releases**: `main` ← `release/*` ← `develop`
- **Hotfixes**: `main` ← `hotfix/*` → `develop`
- **Versioning**: Use `npm version` commands
- **Commits**: Follow conventional commits format
- **Publishing**: After tagging, publish to npm
