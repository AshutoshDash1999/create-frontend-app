const chalk = require('chalk').default || require('chalk');
const { runCommand } = require('../utils/commandRunner');
const {
  DEPENDENCIES,
  DEV_DEPENDENCIES,
  TECH_STACKS,
  BUILD_TOOLS,
  UI_LIBRARIES,
  STATE_MANAGEMENT,
  FETCHING_LIBRARIES,
  PACKAGE_MANAGERS,
} = require('../constants');

/**
 * Determines which dependencies to install based on user choices
 * @param {Object} answers - User answers from prompts
 * @returns {Object} - Dependencies and devDependencies arrays
 */
const getDependencies = answers => {
  const { techStack, buildTool, uiLibrary, stateManagement, fetchingLibrary } = answers;
  const dependencies = [...DEPENDENCIES.CORE];
  const devDependencies = [...DEV_DEPENDENCIES];

  // Add tech stack dependencies
  if (techStack === TECH_STACKS.REACT) {
    dependencies.push(...DEPENDENCIES.REACT);
    // Add build tool dependencies for React
    if (buildTool === BUILD_TOOLS.VITE) {
      devDependencies.push(...DEPENDENCIES.VITE);
    }
  } else if (techStack === TECH_STACKS.NEXTJS) {
    dependencies.push(...DEPENDENCIES.NEXTJS);
  }

  // Add UI library dependencies
  if (uiLibrary === UI_LIBRARIES.MANTINE) {
    dependencies.push(...DEPENDENCIES.MANTINE);
  } else if (uiLibrary === UI_LIBRARIES.TAILWIND_SHADCN) {
    dependencies.push(...DEPENDENCIES.TAILWIND);
  }

  // Add state management dependencies
  if (stateManagement === STATE_MANAGEMENT.ZUSTAND) {
    dependencies.push(...DEPENDENCIES.ZUSTAND);
  }

  // Add data fetching dependencies
  if (fetchingLibrary === FETCHING_LIBRARIES.REACT_QUERY) {
    dependencies.push(...DEPENDENCIES.REACT_QUERY);
  } else if (fetchingLibrary === FETCHING_LIBRARIES.APOLLO) {
    dependencies.push(...DEPENDENCIES.APOLLO);
  }

  return { dependencies, devDependencies };
};

/**
 * Installs project dependencies
 * @param {Object} answers - User answers from prompts
 * @param {string} projectPath - Path to the project directory
 * @returns {Promise<boolean>} - Success status
 */
const installDependencies = async (answers, projectPath) => {
  try {
    const { packageManager } = answers;
    const { dependencies, devDependencies } = getDependencies(answers);

    console.log(chalk.blue('Installing dependencies...'));
    console.log(chalk.gray('This may take a few minutes depending on your internet connection...'));

    // Determine install commands based on package manager
    let installCommand, devInstallCommand;

    switch (packageManager) {
      case PACKAGE_MANAGERS.NPM:
        installCommand = `npm install ${dependencies.join(' ')}`;
        devInstallCommand = `npm install -D ${devDependencies.join(' ')}`;
        break;
      case PACKAGE_MANAGERS.YARN:
        installCommand = `yarn add ${dependencies.join(' ')}`;
        devInstallCommand = `yarn add -D ${devDependencies.join(' ')}`;
        break;
      case PACKAGE_MANAGERS.PNPM:
        installCommand = `pnpm add ${dependencies.join(' ')}`;
        devInstallCommand = `pnpm add -D ${devDependencies.join(' ')}`;
        break;
      default:
        throw new Error(`Unsupported package manager: ${packageManager}`);
    }

    // Install main dependencies with extended timeout
    console.log(chalk.blue('Installing main dependencies...'));
    const mainDepsSuccess = await runCommand(installCommand, projectPath, { timeout: 300000 }); // 5 minutes
    if (!mainDepsSuccess) {
      console.log(
        chalk.yellow('⚠ Main dependencies installation failed, trying alternative approach...')
      );

      // Try installing without specific packages
      const fallbackCommand =
        packageManager === PACKAGE_MANAGERS.NPM ? 'npm install' : `${packageManager} install`;

      const fallbackSuccess = await runCommand(fallbackCommand, projectPath, { timeout: 300000 });
      if (!fallbackSuccess) {
        throw new Error(
          'Failed to install dependencies. Please run npm install manually in the project directory.'
        );
      }
    }

    // Install dev dependencies with extended timeout
    console.log(chalk.blue('Installing dev dependencies...'));
    const devDepsSuccess = await runCommand(devInstallCommand, projectPath, { timeout: 300000 }); // 5 minutes
    if (!devDepsSuccess) {
      console.log(chalk.yellow('⚠ Dev dependencies installation failed, but continuing...'));
      console.log(
        chalk.gray('You can install them manually later with: npm install -D <packages>')
      );
    }

    console.log(chalk.green('✓ Dependencies installed successfully'));
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to install dependencies: ${error.message}`));
    return false;
  }
};

module.exports = {
  installDependencies,
  getDependencies,
};
