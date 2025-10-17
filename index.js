#!/usr/bin/env node

const { createPromptModule } = require('inquirer');
const chalk = require('chalk').default || require('chalk');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Import our modular components
const { questions } = require('./src/prompts/questions');
const { createProject } = require('./src/generators/projectGenerator');
const { installDependencies } = require('./src/generators/dependencyInstaller');
const { createConfigFiles } = require('./src/generators/configGenerator');
const { setupProjectStructure } = require('./src/generators/projectStructure');
const { cleanupFailedProject } = require('./src/cleanup');
const { TECH_STACKS, UI_LIBRARIES, PACKAGE_MANAGERS } = require('./src/constants');

/**
 * Parse command line arguments
 */
const parseArgs = () => {
  return yargs(hideBin(process.argv))
    .option('next-mantine', {
      type: 'boolean',
      description: 'Create a Next.js project with Mantine UI library',
      default: false,
    })
    .option('name', {
      type: 'string',
      description: 'Project name (required when using --next-mantine)',
      default: '',
    })
    .option('package-manager', {
      type: 'string',
      description: 'Package manager to use (npm, yarn, pnpm)',
      choices: ['npm', 'yarn', 'pnpm'],
      default: 'npm',
    })
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v').argv;
};

/**
 * Create preset configuration for Next.js with Mantine
 */
const createNextMantinePreset = (projectName, packageManager) => {
  return {
    projectName,
    techStack: TECH_STACKS.NEXTJS,
    buildTool: null, // Next.js has its own build system
    uiLibrary: UI_LIBRARIES.MANTINE,
    stateManagement: 'None',
    fetchingLibrary: 'None',
    packageManager: packageManager || PACKAGE_MANAGERS.NPM,
  };
};

/**
 * Main function that orchestrates the project creation process
 */
const main = async () => {
  let projectPath = null;

  try {
    // Parse command line arguments
    const argv = parseArgs();

    // Display simple welcome message
    console.log(
      chalk.blue.bold('╔══════════════════════════════════════════════════════════════╗')
    );
    console.log(chalk.blue.bold('║                    CREATE FRONTEND APP                      ║'));
    console.log(
      chalk.blue.bold('╚══════════════════════════════════════════════════════════════╝')
    );
    console.log('');
    console.log(chalk.cyan('A modern CLI tool for creating frontend projects with best practices'));
    console.log(chalk.gray('Version 1.0.2 • Built with Node.js and modern tooling'));
    console.log('');
    console.log(chalk.blue("Let's create your frontend project!\n"));

    let answers;

    // Check if --next-mantine flag is provided
    if (argv['next-mantine']) {
      if (!argv.name) {
        console.error(chalk.red('Error: Project name is required when using --next-mantine flag'));
        console.log(chalk.yellow('Usage: create-frontend-app --next-mantine --name my-project'));
        process.exit(1);
      }

      // Use preset configuration for Next.js with Mantine
      answers = createNextMantinePreset(argv.name, argv['package-manager']);
      console.log(chalk.green('Using preset configuration for Next.js with Mantine'));
      console.log(chalk.green('Project configuration:'), answers);
    } else {
      // Use interactive prompts
      const prompt = createPromptModule();
      answers = await prompt(questions);
      console.log(chalk.green('\nProject configuration:'), answers);
    }

    console.log(chalk.blue('\nStarting project creation...\n'));

    // Step 1: Create project directory and initialize
    projectPath = await createProject(answers);
    if (!projectPath) {
      throw new Error('Failed to create project directory');
    }

    // Step 2: Install dependencies
    const depsSuccess = await installDependencies(answers, projectPath);
    if (!depsSuccess) {
      throw new Error('Failed to install dependencies');
    }

    // Step 3: Create configuration files
    const configSuccess = await createConfigFiles(answers, projectPath);
    if (!configSuccess) {
      throw new Error('Failed to create configuration files');
    }

    // Step 4: Setup project structure
    const structureSuccess = await setupProjectStructure(answers, projectPath);
    if (!structureSuccess) {
      throw new Error('Failed to setup project structure');
    }

    // Success!
    console.log(chalk.green.bold('\n🎉 Project created successfully!'));
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.white(`  cd ${answers.projectName}`));
    console.log(chalk.white(`  ${answers.packageManager} start`));
    console.log(chalk.gray('\nHappy coding! 🚀'));
  } catch (error) {
    console.error(chalk.red.bold('\n❌ Project creation failed:'));
    console.error(chalk.red(error.message));

    // Cleanup on failure
    if (projectPath) {
      console.log(chalk.yellow('\nCleaning up...'));
      await cleanupFailedProject(projectPath);
    }

    process.exit(1);
  }
};

// Run the main function
main().catch(error => {
  console.error(chalk.red.bold('Unexpected error:'), error);
  process.exit(1);
});
