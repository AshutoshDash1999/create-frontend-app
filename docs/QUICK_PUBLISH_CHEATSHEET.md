# Quick Publish Cheatsheet

## 🚀 One-Line Publishing

```bash
# Complete publish workflow
npm run lint && npm run format && npm test && npm version patch && npm publish
```

## 📋 Essential Commands

### Authentication

```bash
npm login                    # Login to npm
npm whoami                   # Check login status
npm logout                   # Logout from npm
```

### Version Management

```bash
npm version patch           # 1.0.0 → 1.0.1 (bug fixes)
npm version minor           # 1.0.0 → 1.1.0 (new features)
npm version major           # 1.0.0 → 2.0.0 (breaking changes)
```

### Quality Checks

```bash
npm run lint                # Check code quality
npm run lint:fix            # Fix linting issues
npm run format              # Format code
npm run format:check        # Check formatting
npm test                    # Run tests
```

### Publishing

```bash
npm publish                 # Publish to npm
npm publish --dry-run       # Preview without publishing
npm pack                    # Create tarball locally
```

### Verification

```bash
npm view @ashutoshdash/create-frontend-app    # View package info
npm info @ashutoshdash/create-frontend-app    # Detailed package info
npm view @ashutoshdash/create-frontend-app versions  # Version history
```

## 🔄 Complete Workflow

```bash
# 1. Login (if not already)
npm login

# 2. Update version
npm version patch

# 3. Run checks
npm run lint && npm run format && npm test

# 4. Publish
npm publish

# 5. Verify
npm view @ashutoshdash/create-frontend-app
```

## 🛠️ Troubleshooting

```bash
# Clear cache
npm cache clean --force

# Check registry
npm config get registry

# View config
npm config list

# Check package contents
npm pack --dry-run
```

## 📦 Package Management

```bash
# Install globally for testing
npm install -g @ashutoshdash/create-frontend-app

# Test CLI
create-frontend-app --version

# Uninstall
npm uninstall -g @ashutoshdash/create-frontend-app
```

## 🎯 Pre-Publish Checklist

- [ ] `npm login` - Logged in to npm
- [ ] `npm whoami` - Verify authentication
- [ ] `npm version patch/minor/major` - Version updated
- [ ] `npm run lint` - Code quality check
- [ ] `npm run format` - Code formatting
- [ ] `npm test` - Tests passing
- [ ] `npm pack --dry-run` - Verify package contents
- [ ] `npm publish` - Publish to npm
- [ ] `npm view @ashutoshdash/create-frontend-app` - Verify publication

## 🚨 Emergency Commands

```bash
# Unpublish (within 24 hours)
npm unpublish @ashutoshdash/create-frontend-app@1.0.2

# Deprecate version
npm deprecate @ashutoshdash/create-frontend-app@1.0.1 "Use v1.0.2 instead"

# Check package health
npm audit @ashutoshdash/create-frontend-app
```

---

**Quick Tip**: Bookmark this cheatsheet for easy reference! 📌
