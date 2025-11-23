# Branching Guide

Quick reference for working with branches in this project.

## Branch Types

### Main Branches

- **`main`** - Production code, always stable
- **`develop`** - Development integration branch

### Feature Branches

```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/feature-name

# Work on feature, commit changes
git add .
git commit -m "feat: add new feature"

# Push and create PR to develop
git push origin feature/feature-name
```

### Release Branches

```bash
# Create release branch
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# Update version
npm version minor  # or patch, major

# Final testing, update CHANGELOG.md
# Then merge to main
git checkout main
git merge release/v1.2.0
git tag v1.2.0
git push origin main --tags

# Merge back to develop
git checkout develop
git merge release/v1.2.0
git push origin develop
```

### Hotfix Branches

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/v1.0.1

# Fix the issue
git add .
git commit -m "fix: critical bug"

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
```

## Git Hooks

Husky will automatically run:

- **pre-commit**: Lint-staged, type-check, tests on staged files
- **pre-merge-commit**: Full lint, type-check, all tests
- **pre-push**: Full lint, type-check, all tests

## Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

## See Also

- [Versioning Strategy](./VERSIONING_STRATEGY.md) - Detailed versioning guide
