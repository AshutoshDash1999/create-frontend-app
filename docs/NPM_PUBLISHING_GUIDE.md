# NPM Publishing Guide

A comprehensive step-by-step guide for publishing your package to npm registry.

## 📋 Prerequisites

Before publishing, ensure you have:

- ✅ **Node.js** (version 14.0.0 or higher)
- ✅ **npm account** (create at [npmjs.com](https://www.npmjs.com))
- ✅ **Package ready** (code, tests, documentation)
- ✅ **Git repository** (optional but recommended)

## 🔐 Authentication Setup

### 1. Create npm Account
```bash
# Visit https://www.npmjs.com and create an account
# Or use the command line
npm adduser
```

### 2. Login to npm
```bash
# Login to npm registry
npm login

# Verify you're logged in
npm whoami
```

### 3. Check Authentication
```bash
# View your npm profile
npm profile get

# Check if you can access the package
npm access list packages @ashutoshdash
```

## 📦 Package Preparation

### 1. Verify Package Configuration

Check your `package.json` has all required fields:

```json
{
  "name": "@ashutoshdash/create-frontend-app",
  "version": "1.0.2",
  "description": "A secure and modular CLI tool to create frontend projects",
  "main": "index.js",
  "bin": {
    "create-frontend-app": "index.js"
  },
  "files": [
    "index.js",
    "src/",
    "README.md"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ashutoshdash1999/create-frontend-app.git"
  },
  "keywords": ["cli", "frontend", "react", "nextjs"],
  "author": "ashutoshdash",
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  }
}
```

### 2. Update Version Number

Choose the appropriate version bump:

```bash
# Patch version (1.0.0 -> 1.0.1) - Bug fixes
npm version patch

# Minor version (1.0.0 -> 1.1.0) - New features
npm version minor

# Major version (1.0.0 -> 2.0.0) - Breaking changes
npm version major

# Or manually edit package.json
# "version": "1.0.2"
```

### 3. Update Changelog

Document your changes:

```bash
# View current changelog
npm run changelog:show

# Add new changelog entry
npm run changelog:add fixed "Fixed project generation bug"
npm run changelog:add added "New React 18 support"
```

## 🧪 Pre-Publish Testing

### 1. Run Quality Checks

```bash
# Lint your code
npm run lint

# Fix linting issues
npm run lint:fix

# Check code formatting
npm run format:check

# Fix formatting issues
npm run format

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### 2. Verify Package Contents

```bash
# Check what files will be published
npm pack --dry-run

# Preview the tarball contents
npm pack
tar -tzf ashutoshdash-create-frontend-app-*.tgz
```

### 3. Test Package Locally

```bash
# Install your package globally for testing
npm install -g ./ashutoshdash-create-frontend-app-*.tgz

# Test the CLI
create-frontend-app --version
create-frontend-app --help

# Uninstall test version
npm uninstall -g @ashutoshdash/create-frontend-app
```

## 🚀 Publishing Process

### 1. Final Pre-Publish Checks

```bash
# Ensure all checks pass
npm run lint && npm run format && npm test

# Verify git status (optional)
git status
git add .
git commit -m "chore: prepare for v1.0.2 release"
git tag v1.0.2
git push origin main --tags
```

### 2. Publish to npm

```bash
# Publish the package
npm publish

# For scoped packages (if not already configured)
npm publish --access public
```

### 3. Verify Publication

```bash
# Check package on npm
npm view @ashutoshdash/create-frontend-app

# View package info
npm info @ashutoshdash/create-frontend-app

# Check version history
npm view @ashutoshdash/create-frontend-app versions --json
```

## 🔄 Complete Publishing Workflow

Here's the complete step-by-step workflow:

```bash
# 1. Authentication
npm login
npm whoami

# 2. Update version
npm version patch  # or minor/major

# 3. Update changelog
npm run changelog:add fixed "Fixed important bug"
npm run changelog:add added "New feature"

# 4. Quality checks
npm run lint
npm run format
npm test

# 5. Commit changes
git add .
git commit -m "chore: release v1.0.3"
git tag v1.0.3
git push origin main --tags

# 6. Publish
npm publish

# 7. Verify
npm view @ashutoshdash/create-frontend-app
```

## 📝 Automated Publishing Script

Create a `scripts/publish.js` for automated publishing:

```javascript
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error running: ${command}`);
    process.exit(1);
  }
}

function publish() {
  console.log('🚀 Starting automated publish process...\n');
  
  // 1. Check if logged in
  try {
    execSync('npm whoami', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ Not logged in to npm. Run: npm login');
    process.exit(1);
  }
  
  // 2. Run quality checks
  console.log('🔍 Running quality checks...');
  runCommand('npm run lint');
  runCommand('npm run format');
  runCommand('npm test');
  
  // 3. Get current version
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const currentVersion = packageJson.version;
  
  console.log(`📦 Publishing version ${currentVersion}...`);
  
  // 4. Publish
  runCommand('npm publish');
  
  console.log('✅ Successfully published to npm!');
  console.log(`🌐 View at: https://www.npmjs.com/package/@ashutoshdash/create-frontend-app`);
}

publish();
```

Add to `package.json`:

```json
{
  "scripts": {
    "publish:auto": "node scripts/publish.js"
  }
}
```

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### 1. Authentication Errors
```bash
# Clear npm cache
npm cache clean --force

# Re-login
npm logout
npm login
```

#### 2. Version Already Exists
```bash
# Check current version
npm view @ashutoshdash/create-frontend-app version

# Update version
npm version patch
```

#### 3. Permission Denied
```bash
# Check package ownership
npm owner ls @ashutoshdash/create-frontend-app

# Add yourself as owner
npm owner add ashutoshdash @ashutoshdash/create-frontend-app
```

#### 4. Package Name Conflicts
```bash
# Check if name is available
npm view your-package-name

# Use scoped package name
# @your-username/package-name
```

#### 5. Files Not Included
```bash
# Check .npmignore file
cat .npmignore

# Or verify files array in package.json
npm pack --dry-run
```

### Debug Commands

```bash
# Verbose npm output
npm publish --verbose

# Check registry configuration
npm config get registry

# View npm configuration
npm config list

# Check package contents
npm pack
tar -tzf *.tgz
```

## 📊 Post-Publish Verification

### 1. Test Installation

```bash
# Test global installation
npm install -g @ashutoshdash/create-frontend-app@latest
create-frontend-app --version

# Test npx usage
npx @ashutoshdash/create-frontend-app test-project

# Clean up
npm uninstall -g @ashutoshdash/create-frontend-app
```

### 2. Monitor Package

```bash
# View download stats
npm view @ashutoshdash/create-frontend-app downloads

# Check package health
npm audit @ashutoshdash/create-frontend-app
```

## 🔄 Updating Published Package

### 1. Patch Update (Bug Fix)
```bash
npm version patch
npm publish
```

### 2. Minor Update (New Feature)
```bash
npm version minor
npm publish
```

### 3. Major Update (Breaking Change)
```bash
npm version major
npm publish
```

### 4. Deprecate Old Versions
```bash
# Deprecate specific version
npm deprecate @ashutoshdash/create-frontend-app@1.0.0 "Use v1.0.1 instead"

# Deprecate range
npm deprecate @ashutoshdash/create-frontend-app@"<1.0.0" "Use v1.0.0 or higher"
```

## 📚 Best Practices

### 1. Version Management
- Use [Semantic Versioning](https://semver.org/)
- Always update changelog before publishing
- Tag releases in git

### 2. Quality Assurance
- Run tests before every publish
- Use pre-publish hooks
- Maintain good test coverage

### 3. Documentation
- Keep README.md updated
- Document breaking changes
- Provide migration guides

### 4. Security
- Regular dependency updates
- Security audits
- Use `npm audit` regularly

### 5. Monitoring
- Monitor download statistics
- Track issues and feedback
- Regular maintenance updates

## 🎯 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm login` | Login to npm |
| `npm whoami` | Check login status |
| `npm version patch` | Bump patch version |
| `npm version minor` | Bump minor version |
| `npm version major` | Bump major version |
| `npm pack --dry-run` | Preview package contents |
| `npm publish` | Publish to npm |
| `npm view <package>` | View package info |
| `npm unpublish <package>@<version>` | Unpublish version |

## 🆘 Getting Help

- **npm Documentation**: https://docs.npmjs.com/
- **npm CLI Reference**: https://docs.npmjs.com/cli/v8/commands
- **Package Publishing**: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- **Semantic Versioning**: https://semver.org/
- **Keep a Changelog**: https://keepachangelog.com/

---

**Happy Publishing! 🚀**
