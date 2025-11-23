# Setting Up Remote Repository

To push your changes to a remote repository:

## 1. Create a Remote Repository

Create a new repository on GitHub, GitLab, or your preferred Git hosting service.

## 2. Add Remote

```bash
# Replace with your repository URL
git remote add origin https://github.com/yourusername/rn-expo-core.git

# Or for SSH
git remote add origin git@github.com:yourusername/rn-expo-core.git
```

## 3. Push to Remote

```bash
# Push master branch
git push -u origin master

# Or if using main branch
git push -u origin main
```

## 4. Verify Remote

```bash
git remote -v
```

## 5. Update package.json Repository URL

Update the repository URL in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/rn-expo-core.git"
  }
}
```

## Branch Protection

After pushing, set up branch protection rules:

1. Go to repository settings
2. Navigate to "Branches"
3. Add rule for `master`/`main`:
   - Require pull request reviews
   - Require status checks to pass (tests, lint)
   - Require branches to be up to date

## Create Develop Branch

```bash
# Create and push develop branch
git checkout -b develop
git push -u origin develop
```
