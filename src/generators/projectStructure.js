const chalk = require('chalk').default || require('chalk');
const { runCommand } = require('../utils/commandRunner');
const { createDirectory, writeFile } = require('../utils/fileOperations');
const { TECH_STACKS, BUILD_TOOLS, UI_LIBRARIES } = require('../constants');

/**
 * Creates basic project structure and files
 * @param {Object} answers - User answers from prompts
 * @param {string} projectPath - Path to the project directory
 * @returns {Promise<boolean>} - Success status
 */
const setupProjectStructure = async (answers, projectPath) => {
  try {
    const { techStack, buildTool, uiLibrary, packageManager } = answers;

    console.log(chalk.blue('Setting up project structure...'));

    // Initialize git
    const gitSuccess = await runCommand('git init', projectPath);
    if (gitSuccess) {
      console.log(chalk.green('✓ Initialized git repository'));
    }

    // Setup husky
    const huskySuccess = await runCommand('npx husky init', projectPath);
    if (huskySuccess) {
      // Create pre-commit hook
      const preCommitHook = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx prettier --write .
npx eslint . --ext .js,.jsx,.ts,.tsx --fix`;

      await writeFile(`${projectPath}/.husky/pre-commit`, preCommitHook);
      console.log(chalk.green('✓ Setup husky pre-commit hook'));
    }

    // Setup Shadcn/UI if using Tailwind
    if (uiLibrary === UI_LIBRARIES.TAILWIND_SHADCN) {
      const shadcnSuccess = await runCommand('npx shadcn-ui@latest init -y', projectPath);
      if (shadcnSuccess) {
        console.log(chalk.green('✓ Initialized Shadcn/UI'));
      }
    }

    // Create src directory structure
    const srcPath = `${projectPath}/src`;
    await createDirectory(srcPath);

    // Create components directory
    await createDirectory(`${srcPath}/components`);

    // Create utils directory
    await createDirectory(`${srcPath}/utils`);

    // Create hooks directory
    await createDirectory(`${srcPath}/hooks`);

    // Create index file based on tech stack and build tool
    let indexPath, indexContent;

    if (techStack === TECH_STACKS.NEXTJS) {
      await createDirectory(`${srcPath}/pages`);
      indexPath = `${srcPath}/pages/index.js`;
      indexContent = `export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">
        Welcome to your Next.js app!
      </h1>
      <p className="text-center mt-4 text-gray-600">
        Get started by editing <code>src/pages/index.js</code>
      </p>
    </div>
  );
}`;
    } else if (techStack === TECH_STACKS.REACT) {
      if (buildTool === BUILD_TOOLS.VITE) {
        // For Vite, create main.tsx and App.tsx
        indexPath = `${srcPath}/main.tsx`;
        indexContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

        // Create App.tsx
        const appContent = `import React from 'react'

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">
        Welcome to your React + Vite app!
      </h1>
      <p className="text-center mt-4 text-gray-600">
        Get started by editing <code>src/App.tsx</code>
      </p>
    </div>
  )
}

export default App`;

        await writeFile(`${srcPath}/App.tsx`, appContent);
        console.log(chalk.green('✓ Created App.tsx'));

        // Create index.css for Tailwind
        if (uiLibrary === UI_LIBRARIES.TAILWIND_SHADCN) {
          const indexCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

          await writeFile(`${srcPath}/index.css`, indexCssContent);
          console.log(chalk.green('✓ Created index.css with Tailwind directives'));
        }
      } else {
        // For Webpack (existing behavior)
        indexPath = `${srcPath}/index.js`;
        indexContent = `import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">
        Welcome to your React app!
      </h1>
      <p className="text-center mt-4 text-gray-600">
        Get started by editing <code>src/index.js</code>
      </p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`;
      }
    }

    await writeFile(indexPath, indexContent);
    console.log(chalk.green('✓ Created main application file'));

    // Create index.html for Vite projects
    if (techStack === TECH_STACKS.REACT && buildTool === BUILD_TOOLS.VITE) {
      const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${answers.projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

      await writeFile(`${projectPath}/index.html`, htmlContent);
      console.log(chalk.green('✓ Created index.html'));
    }

    // Create README.md
    const getDevCommand = () => {
      if (techStack === TECH_STACKS.NEXTJS) return 'npm run dev';
      if (techStack === TECH_STACKS.REACT && buildTool === BUILD_TOOLS.VITE) return 'npm run dev';
      return 'npm start';
    };

    const getBuildCommand = () => {
      if (techStack === TECH_STACKS.NEXTJS) return 'npm run build';
      if (techStack === TECH_STACKS.REACT && buildTool === BUILD_TOOLS.VITE) return 'npm run build';
      return 'npm run build';
    };

    const getProjectStructure = () => {
      if (techStack === TECH_STACKS.NEXTJS) {
        return `src/
├── components/     # Reusable components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
└── pages/        # Next.js pages`;
      } else if (techStack === TECH_STACKS.REACT && buildTool === BUILD_TOOLS.VITE) {
        return `src/
├── components/     # Reusable components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── App.tsx        # Main App component
├── main.tsx       # Application entry point
└── index.css      # Global styles`;
      } else {
        return `src/
├── components/     # Reusable components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
└── index.js       # Main application file`;
      }
    };

    const readmeContent = `# ${answers.projectName}

This project was created with create-frontend-app.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- ${packageManager}

### Installation

\`\`\`bash
${packageManager} install
\`\`\`

### Development

\`\`\`bash
${getDevCommand()}
\`\`\`

### Tech Stack
- **Framework**: ${techStack}
${techStack === TECH_STACKS.REACT ? `- **Build Tool**: ${buildTool}` : ''}
- **UI Library**: ${uiLibrary}
- **State Management**: ${answers.stateManagement}
- **Data Fetching**: ${answers.fetchingLibrary}
- **Package Manager**: ${packageManager}

## Available Scripts

- \`${packageManager} run dev\` - Start development server
- \`${packageManager} run build\` - Build for production
- \`${packageManager} run preview\` - Preview production build (Vite only)
- \`${packageManager} test\` - Run tests
- \`${packageManager} lint\` - Run ESLint
- \`${packageManager} format\` - Format code with Prettier

## Project Structure

\`\`\`
${getProjectStructure()}
\`\`\`
`;

    await writeFile(`${projectPath}/README.md`, readmeContent);
    console.log(chalk.green('✓ Created README.md'));

    // Create .gitignore
    const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
/build
/dist
/.next/
/out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
`;

    await writeFile(`${projectPath}/.gitignore`, gitignoreContent);
    console.log(chalk.green('✓ Created .gitignore'));

    console.log(chalk.green('✓ Project structure created successfully'));
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to setup project structure: ${error.message}`));
    return false;
  }
};

module.exports = {
  setupProjectStructure,
};
