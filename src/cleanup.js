const chalk = require('chalk').default || require('chalk');
const { removeDirectory } = require('./utils/fileOperations');

/**
 * Cleans up a failed project creation with retry mechanism
 * @param {string} projectPath - Path to the project directory to clean up
 * @returns {Promise<boolean>} - Success status
 */
const cleanupFailedProject = async projectPath => {
  try {
    if (!projectPath) {
      return true;
    }

    console.log(chalk.yellow('Cleaning up failed project creation...'));

    // Retry cleanup up to 3 times with delays
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const success = await removeDirectory(projectPath);
        if (success) {
          console.log(chalk.green('✓ Cleanup completed'));
          return true;
        }
      } catch (error) {
        console.log(chalk.yellow(`Cleanup attempt ${attempt} failed: ${error.message}`));

        if (attempt < 3) {
          // Wait before retrying (exponential backoff)
          const delay = attempt * 1000; // 1s, 2s, 3s
          console.log(chalk.yellow(`Retrying in ${delay}ms...`));
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    console.log(chalk.red('⚠ Failed to clean up project directory after 3 attempts'));
    console.log(chalk.yellow('You may need to manually delete the directory:'), projectPath);
    return false;
  } catch (error) {
    console.error(chalk.red(`Cleanup failed: ${error.message}`));
    return false;
  }
};

module.exports = {
  cleanupFailedProject,
};
