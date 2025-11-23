# CI/CD Strategy

This document outlines our continuous integration and continuous deployment strategy.

## Testing and Linting Strategy

### Best Practice: Layered Approach

We use a **layered approach** to balance speed and thoroughness:

1. **Pre-commit (Husky)**: Fast, local feedback
   - Runs `lint-staged` (only on staged files)
   - Quick type checking
   - **Does NOT run full test suite** (too slow for commits)
   - Purpose: Catch obvious issues before commit

2. **Pre-merge (Husky)**: Comprehensive local checks
   - Full linting
   - Full type checking
   - Full test suite
   - Purpose: Ensure code quality before merging branches

3. **CI (GitHub Actions)**: Comprehensive remote validation
   - Full linting
   - Full type checking
   - Full test suite
   - Format checking
   - Purpose: Validate PRs and ensure main branches stay healthy

### Why Both Pre-commit and CI?

**Yes, it's standard practice** to run checks at multiple stages:

- **Pre-commit hooks**: Fast feedback loop for developers
  - Catches issues immediately
  - Prevents committing broken code
  - Only checks what you changed (via lint-staged)

- **CI/CD**: Comprehensive validation
  - Validates entire codebase state
  - Required for PR merges
  - Ensures consistency across team
  - Runs in clean environment

### Current Setup

```
┌─────────────────┐
│  Pre-commit     │  → lint-staged, type-check (fast)
└─────────────────┘
         ↓
┌─────────────────┐
│  Pre-merge       │  → full lint, type-check, tests
└─────────────────┘
         ↓
┌─────────────────┐
│  CI (GitHub)     │  → full lint, type-check, tests, format
└─────────────────┘
```

## Automatic Versioning

### Overview

We use `standard-version` for automatic version management based on [Conventional Commits](https://www.conventionalcommits.org/).

### How It Works

1. **Commit Messages Determine Version**:
   - `feat:` → Minor version bump (1.0.0 → 1.1.0)
   - `fix:` → Patch version bump (1.0.0 → 1.0.1)
   - `feat!:` or `BREAKING CHANGE:` → Major version bump (1.0.0 → 2.0.0)

2. **Automatic CHANGELOG**: Updates `CHANGELOG.md` with categorized changes

3. **Git Tags**: Creates version tags automatically

### Release Strategies

#### Feature Release (Minor)

```bash
# On release branch
git checkout -b release/v1.2.0
# Make final changes, then:
npm run release:minor
# Or let CI handle it automatically
```

#### Hotfix Release (Patch)

```bash
# On hotfix branch
git checkout -b hotfix/v1.0.1
# Fix the issue, then:
npm run release:patch
# Or let CI handle it automatically
```

#### Major Release

```bash
# On release branch
git checkout -b release/v2.0.0
npm run release:major
```

### Manual Versioning

If you need to manually control version:

```bash
# Patch (1.0.0 → 1.0.1)
npm run release:patch

# Minor (1.0.0 → 1.1.0)
npm run release:minor

# Major (1.0.0 → 2.0.0)
npm run release:major

# Auto-detect from commits
npm run release
```

### GitHub Actions Release Workflow

The `.github/workflows/release.yml` workflow automatically:

1. Detects release/hotfix branches
2. Determines version type:
   - `release/*` → Minor version
   - `hotfix/*` → Patch version
3. Runs tests
4. Creates release (updates version, CHANGELOG, tags)
5. Pushes changes and tags

### Workflow

```
┌─────────────────────┐
│  Create release/*   │
│  or hotfix/* branch │
└─────────────────────┘
         ↓
┌─────────────────────┐
│  Push to GitHub     │
└─────────────────────┘
         ↓
┌─────────────────────┐
│  GitHub Actions     │
│  - Runs tests       │
│  - Bumps version    │
│  - Updates CHANGELOG│
│  - Creates tag      │
└─────────────────────┘
         ↓
┌─────────────────────┐
│  Merge to main      │
└─────────────────────┘
```

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature (minor version)
- `fix`: Bug fix (patch version)
- `perf`: Performance improvement
- `refactor`: Code refactoring
- `docs`: Documentation
- `test`: Tests
- `chore`: Maintenance (no version bump)
- `style`: Formatting (no version bump)

### Breaking Changes

Use `!` after type or `BREAKING CHANGE:` in footer:

```
feat!: remove deprecated API
# or
feat: add new API

BREAKING CHANGE: removed old API
```

## Branch Protection

Recommended GitHub branch protection:

- **master**: Require PR, require approvals, require CI checks
- **develop**: Require PR, require CI checks
- **release/\***: Require CI checks

## Summary

- **Pre-commit**: Fast local checks (lint-staged, type-check)
- **Pre-merge**: Full local validation (lint, type-check, tests)
- **CI**: Comprehensive remote validation (lint, type-check, tests, format)
- **Release**: Automatic versioning based on commit messages
- **Versioning**: Semantic versioning with automatic CHANGELOG
