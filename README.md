# Create Frontend App

A powerful, secure, and modular CLI tool that generates modern frontend projects with industry best practices. Skip the tedious setup and focus on building your application from day one.

## ✨ Features

- 🔒 **Security First**: Comprehensive input sanitization and command injection prevention
- 🏗️ **Modular Architecture**: Clean, maintainable code structure with separation of concerns
- ⚡ **Modern Tech Stack**: Full support for React, Next.js, TypeScript, and cutting-edge tools
- 🎨 **UI Libraries**: Choose between Mantine or Tailwind CSS with Shadcn/UI components
- 📦 **Package Managers**: Flexible support for npm, yarn, and pnpm
- 🔧 **Development Tools**: Pre-configured ESLint, Prettier, and Husky pre-commit hooks
- 🧪 **Testing Ready**: Built-in testing infrastructure with Jest
- 🚀 **Production Ready**: Optimized builds and deployment configurations

## 🚀 Quick Start

### Installation

**Global Installation (Recommended)**

```bash
npm install -g create-frontend-app
```

**One-time Usage**

```bash
npx create-frontend-app my-awesome-app
```

### Basic Usage

```bash
# Create a new project
create-frontend-app my-project

# Or specify a directory
create-frontend-app ./my-new-app

# Get help
create-frontend-app --help
```

## 📋 Interactive Setup

When you run the tool, you'll be guided through a series of prompts to configure your project:

### 1. **Project Name**

- Enter a valid project name (letters, numbers, hyphens, underscores only)
- The tool will create a directory with this name

### 2. **Tech Stack Selection**

- **React**: Traditional SPA with Create React App setup
- **Next.js**: Full-stack React framework with SSR/SSG capabilities

### 3. **UI Library Choice**

- **Mantine**: Feature-rich React components library with built-in theming
- **Tailwind CSS + Shadcn/UI**: Utility-first CSS with beautiful pre-built components

### 4. **State Management** (Optional)

- **Zustand**: Lightweight, modern state management
- **None**: Use React's built-in state management

### 5. **Package Manager**

- **npm**: Default Node.js package manager
- **yarn**: Fast, reliable, and secure package manager
- **pnpm**: Efficient, disk space saving package manager

### 6. **Data Fetching** (Optional)

- **React Query**: Powerful data synchronization for React
- **Apollo Client**: Comprehensive GraphQL client
- **None**: Use native fetch or other libraries

## 💡 Usage Examples

### Example 1: React + Tailwind + TypeScript

```bash
create-frontend-app my-react-app
# Choose: React → Tailwind CSS → None → npm → None
```

### Example 2: Next.js + Mantine + Full Stack

```bash
create-frontend-app my-nextjs-app
# Choose: Next.js → Mantine → Zustand → yarn → React Query
```

### Example 3: Minimal Setup

```bash
create-frontend-app simple-app
# Choose: React → Tailwind CSS → None → npm → None
```

## 📁 Generated Project Structure

The tool creates a well-organized project structure tailored to your choices:

### React Project Structure

```
my-project/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI components
│   │   └── layout/         # Layout components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── styles/             # Global styles and themes
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Application entry point
│   └── setupTests.ts       # Test configuration
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── tailwind.config.js      # (if using Tailwind)
├── package.json
└── README.md
```

### Next.js Project Structure

```
my-project/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/         # Reusable components
│   ├── pages/             # Next.js pages (App Router)
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript definitions
│   ├── styles/            # Global styles
│   └── lib/               # Library configurations
├── .next/                 # Next.js build output
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tsconfig.json
├── tailwind.config.js     # (if using Tailwind)
├── package.json
└── README.md
```

## 📦 Included Dependencies

### Core Dependencies

- **TypeScript**: Type-safe JavaScript development
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality gates
- **Zod**: Runtime type validation

### Framework Dependencies

- **React**: UI library
- **React DOM**: DOM rendering
- **Next.js**: (if selected) Full-stack React framework

### UI Dependencies

- **Mantine**: (if selected) Complete React components library
- **Tailwind CSS**: (if selected) Utility-first CSS framework
- **PostCSS**: (if using Tailwind) CSS processing

### Optional Dependencies

- **Zustand**: (if selected) State management
- **React Query**: (if selected) Data fetching and caching
- **Apollo Client**: (if selected) GraphQL client

## 🔒 Security Features

- ✅ **Input Validation**: Comprehensive sanitization of all user inputs
- ✅ **Command Injection Prevention**: Safe execution of system commands
- ✅ **Path Traversal Protection**: Secure file system operations
- ✅ **Safe File Operations**: Atomic file writes with rollback capability
- ✅ **Error Handling**: Graceful error recovery and cleanup
- ✅ **Dependency Security**: Regular security audits of dependencies

## 🛠️ Development

### Prerequisites

- **Node.js**: Version 14.0.0 or higher
- **Package Manager**: npm, yarn, or pnpm
- **Git**: For version control (recommended)

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/create-frontend-app.git
cd create-frontend-app

# Install dependencies
npm install

# Run the tool locally
npm start

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

### Available Scripts

| Script                 | Description                     |
| ---------------------- | ------------------------------- |
| `npm start`            | Run the CLI tool interactively  |
| `npm test`             | Run the test suite              |
| `npm run test:watch`   | Run tests in watch mode         |
| `npm run lint`         | Check code with ESLint          |
| `npm run lint:fix`     | Fix ESLint issues automatically |
| `npm run format`       | Format code with Prettier       |
| `npm run format:check` | Check code formatting           |

## 🏗️ Architecture

The tool follows a clean, modular architecture:

```
src/
├── constants.js           # Configuration constants and templates
├── validators.js          # Input validation and sanitization
├── cleanup.js            # Cleanup utilities and error recovery
├── generators/            # Project generation modules
│   ├── configGenerator.js    # Configuration file generation
│   ├── dependencyInstaller.js # Package installation
│   ├── projectGenerator.js   # Main project structure creation
│   └── projectStructure.js   # File and directory templates
├── prompts/              # Interactive CLI questions
│   └── questions.js          # Question definitions and validation
└── utils/                # Utility functions
    ├── commandRunner.js      # Safe command execution
    └── fileOperations.js     # File system operations
```

## 🚀 Getting Started After Generation

Once your project is created, here's how to get started:

```bash
# Navigate to your new project
cd my-awesome-project

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository** and clone it locally
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests for new functionality
4. **Run the test suite**: `npm test`
5. **Ensure code quality**: `npm run lint && npm run format`
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to your branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and patterns
- Add tests for new features and bug fixes
- Update documentation for any API changes
- Ensure all tests pass before submitting PRs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📝 Changelog

### v1.0.0 (Current)

- 🎉 **Initial Release**: First stable version of create-frontend-app
- 🔒 **Security First**: Comprehensive input validation and sanitization
- 🏗️ **Modular Architecture**: Clean, maintainable code structure
- ⚡ **Modern Tech Stack**: Full support for React, Next.js, TypeScript
- 🎨 **UI Libraries**: Mantine and Tailwind CSS with Shadcn/UI
- 📦 **Package Managers**: npm, yarn, and pnpm support
- 🔧 **Development Tools**: ESLint, Prettier, Husky pre-commit hooks
- 🧪 **Testing Ready**: Built-in testing infrastructure with Jest
- 🚀 **Production Ready**: Optimized builds and deployment configurations

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/create-frontend-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/create-frontend-app/discussions)
- **Documentation**: [Full Documentation](https://github.com/your-username/create-frontend-app#readme)

## 🙏 Acknowledgments

- Built with ❤️ for the developer community
- Inspired by modern frontend development best practices
- Thanks to all contributors and users for feedback and suggestions
