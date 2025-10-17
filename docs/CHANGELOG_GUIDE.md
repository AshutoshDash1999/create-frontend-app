# Changelog Management Guide

This guide explains how to manage changelogs for different versions of your project.

## Available Changelog Methods

### 1. Manual README Changelog (Current)

- Located in `README.md` under the "📝 Changelog" section
- Simple format with emojis and bullet points
- Good for small projects or when you want everything in one place

### 2. Dedicated CHANGELOG.md File

- Located at `CHANGELOG.md`
- Follows [Keep a Changelog](https://keepachangelog.com/) format
- More structured and professional
- Better for larger projects

### 3. Automated Changelog Management

- Use the provided script: `scripts/changelog.js`
- Automatically manages version entries
- Integrates with npm version commands

## How to Use Each Method

### Method 1: Manual README Updates

When you release a new version:

1. Update the version in `package.json`
2. Add a new section in README.md under "📝 Changelog"
3. Move the previous "Current" version to a regular version
4. Add your new changes with appropriate emojis

Example:

```markdown
### v1.0.2 (Current)

- 🐛 **Bug Fixes**: Fixed issue with project generation
- ✨ **New Features**: Added new UI library option

### v1.0.1

- Previous changes...
```

### Method 2: CHANGELOG.md Management

1. Update the version in `package.json`
2. Add a new version section in `CHANGELOG.md`
3. Move items from `[Unreleased]` to the new version
4. Update the comparison links at the bottom

Example:

```markdown
## [1.0.2] - 2024-01-20

### Fixed

- Fixed issue with project generation

### Added

- New UI library option
```

### Method 3: Automated Script Usage

#### Add a new changelog entry:

```bash
# Add a bug fix
npm run changelog:add fixed "Fixed project generation issue"

# Add a new feature
npm run changelog:add added "Added new UI library option"

# Add a breaking change
npm run changelog:add changed "Updated API interface (breaking change)"
```

#### View the changelog:

```bash
npm run changelog:show
```

#### Create a new version:

```bash
# Patch version (1.0.1 -> 1.0.2)
npm run version:patch

# Minor version (1.0.1 -> 1.1.0)
npm run version:minor

# Major version (1.0.1 -> 2.0.0)
npm run version:major
```

## Changelog Entry Types

- **added**: New features
- **changed**: Changes in existing functionality
- **deprecated**: Soon-to-be removed features
- **removed**: Removed features
- **fixed**: Bug fixes
- **security**: Security improvements

## Best Practices

1. **Keep it simple**: Write clear, concise descriptions
2. **Use present tense**: "Add feature" not "Added feature"
3. **Group related changes**: Keep similar changes together
4. **Include breaking changes**: Clearly mark breaking changes
5. **Update regularly**: Don't let changelog get outdated
6. **Be consistent**: Use the same format throughout

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 -> 2.0.0): Breaking changes
- **MINOR** (1.0.0 -> 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 -> 1.0.1): Bug fixes (backward compatible)

## Integration with Git

Consider adding these to your workflow:

```bash
# Before releasing
git add CHANGELOG.md package.json
git commit -m "chore: update changelog for v1.0.2"
git tag v1.0.2
git push origin main --tags
```

## Tools and Automation

For more advanced changelog management, consider:

- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
- [standard-version](https://github.com/conventional-changelog/standard-version)
- [release-it](https://github.com/release-it/release-it)

These tools can automatically generate changelogs from commit messages.
