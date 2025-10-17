const chalk = require('chalk').default || require('chalk');
const { writeJsonFile, writeFile } = require('../utils/fileOperations');
const { TECH_STACKS, BUILD_TOOLS, UI_LIBRARIES } = require('../constants');

/**
 * Creates TypeScript configuration
 * @param {Object} answers - User answers from prompts
 * @param {string} projectPath - Path to the project directory
 * @returns {Promise<boolean>} - Success status
 */
const createTsConfig = async (answers, projectPath) => {
  try {
    const { techStack } = answers;

    const tsconfig = {
      compilerOptions: {
        target: 'ES2020',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noFallthroughCasesInSwitch: true,
        module: 'esnext',
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: techStack === TECH_STACKS.REACT ? 'react-jsx' : 'preserve',
        incremental: true,
        baseUrl: '.',
        paths: {
          '@/*': ['./src/*'],
        },
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist', 'build'],
    };

    const success = await writeJsonFile(`${projectPath}/tsconfig.json`, tsconfig);
    if (success) {
      console.log(chalk.green('✓ Created tsconfig.json'));
    }
    return success;
  } catch (error) {
    console.error(chalk.red(`Failed to create tsconfig.json: ${error.message}`));
    return false;
  }
};

/**
 * Creates ESLint configuration
 * @param {string} projectPath - Path to the project directory
 * @returns {Promise<boolean>} - Success status
 */
const createEslintConfig = async projectPath => {
  try {
    const eslintrc = {
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['react', 'react-hooks', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
    };

    const success = await writeJsonFile(`${projectPath}/.eslintrc.json`, eslintrc);
    if (success) {
      console.log(chalk.green('✓ Created .eslintrc.json'));
    }
    return success;
  } catch (error) {
    console.error(chalk.red(`Failed to create .eslintrc.json: ${error.message}`));
    return false;
  }
};

/**
 * Creates Prettier configuration
 * @param {string} projectPath - Path to the project directory
 * @returns {Promise<boolean>} - Success status
 */
const createPrettierConfig = async projectPath => {
  try {
    const prettierConfig = `module.exports = {
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf'
};`;

    const success = await writeFile(`${projectPath}/prettier.config.js`, prettierConfig);
    if (success) {
      console.log(chalk.green('✓ Created prettier.config.js'));
    }
    return success;
  } catch (error) {
    console.error(chalk.red(`Failed to create prettier.config.js: ${error.message}`));
    return false;
  }
};

/**
 * Creates Vite configuration
 * @param {Object} answers - User answers from prompts
 * @param {string} projectPath - Path to the project directory
 * @returns {Promise<boolean>} - Success status
 */
const createViteConfig = async (answers, projectPath) => {
  try {
    const { techStack, buildTool, uiLibrary } = answers;

    if (techStack !== TECH_STACKS.REACT || buildTool !== BUILD_TOOLS.VITE) {
      return true; // Skip if not using Vite with React
    }

    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})`;

    const success = await writeFile(`${projectPath}/vite.config.js`, viteConfig);
    if (success) {
      console.log(chalk.green('✓ Created vite.config.js'));
    }
    return success;
  } catch (error) {
    console.error(chalk.red(`Failed to create vite.config.js: ${error.message}`));
    return false;
  }
};

/**
 * Creates PostCSS configuration for Tailwind (without Tailwind config file)
 * @param {Object} answers - User answers from prompts
 * @param {string} projectPath - Path to the project directory
 * @returns {Promise<boolean>} - Success status
 */
const createPostCSSConfig = async (answers, projectPath) => {
  try {
    const { uiLibrary } = answers;

    if (uiLibrary !== UI_LIBRARIES.TAILWIND_SHADCN) {
      return true; // Skip if not using Tailwind
    }

    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    const success = await writeFile(`${projectPath}/postcss.config.js`, postcssConfig);
    if (success) {
      console.log(chalk.green('✓ Created postcss.config.js'));
    }
    return success;
  } catch (error) {
    console.error(chalk.red(`Failed to create postcss.config.js: ${error.message}`));
    return false;
  }
};

/**
 * Creates all configuration files
 * @param {Object} answers - User answers from prompts
 * @param {string} projectPath - Path to the project directory
 * @returns {Promise<boolean>} - Success status
 */
const createConfigFiles = async (answers, projectPath) => {
  try {
    console.log(chalk.blue('Creating configuration files...'));

    const results = await Promise.all([
      createTsConfig(answers, projectPath),
      createEslintConfig(projectPath),
      createPrettierConfig(projectPath),
      createViteConfig(answers, projectPath),
      createPostCSSConfig(answers, projectPath),
    ]);

    const allSuccess = results.every(result => result === true);

    if (allSuccess) {
      console.log(chalk.green('✓ All configuration files created successfully'));
    } else {
      console.log(chalk.yellow('⚠ Some configuration files failed to create'));
    }

    return allSuccess;
  } catch (error) {
    console.error(chalk.red(`Failed to create configuration files: ${error.message}`));
    return false;
  }
};

module.exports = {
  createConfigFiles,
  createTsConfig,
  createEslintConfig,
  createPrettierConfig,
  createViteConfig,
  createPostCSSConfig,
};
