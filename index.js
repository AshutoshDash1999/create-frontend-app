#!/usr/bin/env node

const { createPromptModule } = require('inquirer');
const chalk = require('chalk').default || require('chalk');
const figlet = require('figlet');

// Import our modular components
const { questions } = require('./src/prompts/questions');
const { createProject } = require('./src/generators/projectGenerator');
const { installDependencies } = require('./src/generators/dependencyInstaller');
const { createConfigFiles } = require('./src/generators/configGenerator');
const { setupProjectStructure } = require('./src/generators/projectStructure');
const { cleanupFailedProject } = require('./src/cleanup');

/**
 * Main function that orchestrates the project creation process
 */
const main = async () => {
  let projectPath = null;

  try {
    // Display welcome message
    console.log(chalk.yellow(figlet.textSync('Create Frontend App', { horizontalLayout: 'full' })));
    console.log(chalk.blue("Welcome! Let's create your frontend project.\n"));

    // Get user configuration
    const prompt = createPromptModule();
    const answers = await prompt(questions);
    console.log(chalk.green('\nProject configuration:'), answers);
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
