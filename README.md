# Create Frontend App

A secure and modular CLI tool to create frontend projects with modern best practices.

## Features

- 🔒 **Security First**: Input sanitization and command injection prevention
- 🏗️ **Modular Architecture**: Clean, maintainable code structure
- ⚡ **Modern Tech Stack**: Support for React, Next.js, TypeScript, and more
- 🎨 **UI Libraries**: Mantine and Tailwind CSS with Shadcn/UI
- 📦 **Package Managers**: npm, yarn, and pnpm support
- 🔧 **Development Tools**: ESLint, Prettier, Husky pre-commit hooks
- 🧪 **Testing Ready**: Basic testing infrastructure included

## Installation

### Global Installation

```bash
npm install -g create-frontend-app
```

### Local Usage

```bash
npx create-frontend-app
```

## Usage

```bash
create-frontend-app
```

The CLI will prompt you for:

1. **Project Name** - Must contain only letters, numbers, hyphens, and underscores
2. **Tech Stack** - Choose between React or Next.js
3. **UI Library** - Mantine or Tailwind CSS with Shadcn/UI
4. **State Management** - Zustand or None
5. **Package Manager** - npm, yarn, or pnpm
6. **Data Fetching** - React Query, Apollo Client, or None

## What Gets Created

### Project Structure

```
your-project/
├── src/
│   ├── components/     # Reusable components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── pages/         # Next.js pages (if using Next.js)
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── tailwind.config.js (if using Tailwind)
├── package.json
└── README.md
```

### Dependencies Included

- **Core**: TypeScript, ESLint, Prettier, Husky, Zod
- **Framework**: React, React DOM (or Next.js)
- **UI**: Mantine or Tailwind CSS + PostCSS
- **State**: Zustand (optional)
- **Data Fetching**: React Query or Apollo Client (optional)

## Security Features

- ✅ Input validation and sanitization
- ✅ Command injection prevention
- ✅ Path traversal protection
- ✅ Safe file operations
- ✅ Error handling and cleanup

## Development

### Prerequisites

- Node.js 14 or higher
- npm, yarn, or pnpm

### Setup

```bash
git clone <repository-url>
cd create-frontend-app
npm install
```

### Scripts

```bash
npm start          # Run the CLI tool
npm test           # Run tests
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Architecture

The tool is built with a modular architecture:

- `src/constants.js` - Configuration constants
- `src/validators.js` - Input validation and sanitization
- `src/utils/` - Utility functions for commands and file operations
- `src/generators/` - Project generation modules
- `src/prompts/` - CLI question definitions
- `src/cleanup.js` - Cleanup utilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details

## Changelog

### v2.0.0

- 🔒 Added comprehensive security measures
- 🏗️ Refactored into modular architecture
- ⚡ Improved error handling and cleanup
- 📦 Updated dependencies to latest versions
- 🧪 Added basic testing infrastructure
- 📝 Enhanced documentation and README
