const path = require('path');
const chalk = require('chalk').default || require('chalk');
const { createDirectory, writeJsonFile } = require('../utils/fileOperations');
const { validateProjectName, sanitizeInput } = require('../validators');
const { TECH_STACKS, BUILD_TOOLS } = require('../constants');

/**
 * Creates package.json content based on user choices
 * @param {Object} answers - User answers from prompts
 * @returns {Object} - Package.json content
 */
const createPackageJson = answers => {
  const { projectName, techStack, buildTool } = answers;

  const basePackageJson = {
    name: projectName.toLowerCase(),
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

  // Add scripts based on tech stack and build tool
  if (techStack === TECH_STACKS.NEXTJS) {
    basePackageJson.scripts = {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    };
  } else if (techStack === TECH_STACKS.REACT) {
    if (buildTool === BUILD_TOOLS.VITE) {
      basePackageJson.scripts = {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
      };
    } else {
      basePackageJson.scripts = {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test',
        eject: 'react-scripts eject',
        lint: 'eslint . --ext .js,.jsx,.ts,.tsx',
      };
    }
  }

  // Add common scripts
  basePackageJson.scripts = {
    ...basePackageJson.scripts,
    format: 'prettier --write .',
    'format:check': 'prettier --check .',
  };

  return basePackageJson;
};

/**
 * Creates a new project directory and initializes it
 * @param {Object} answers - User answers from prompts
 * @returns {Promise<string|null>} - Project path or null if failed
 */
const createProject = async answers => {
  try {
    const { projectName } = answers;

    // Validate project name
    if (!validateProjectName(projectName)) {
      throw new Error('Invalid project name');
    }

    const sanitizedName = sanitizeInput(projectName);
    const projectPath = path.join(process.cwd(), sanitizedName);

    // Check if directory already exists
    const fs = require('fs');
    if (fs.existsSync(projectPath)) {
      throw new Error(`Directory ${sanitizedName} already exists`);
    }

    // Create project directory
    const success = await createDirectory(projectPath);
    if (!success) {
      throw new Error('Failed to create project directory');
    }

    // Create package.json with appropriate scripts
    const packageJson = createPackageJson(answers);
    const packageJsonSuccess = await writeJsonFile(`${projectPath}/package.json`, packageJson);
    if (!packageJsonSuccess) {
      throw new Error('Failed to create package.json');
    }

    console.log(chalk.green(`✓ Created project directory: ${sanitizedName}`));
    return projectPath;
  } catch (error) {
    console.error(chalk.red(`Failed to create project: ${error.message}`));
    return null;
  }
};

module.exports = {
  createProject,
  createPackageJson,
};
