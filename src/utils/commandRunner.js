const { execSync } = require('child_process');
const chalk = require('chalk').default || require('chalk');
const { sanitizeInput } = require('../validators');

/**
 * Safely executes shell commands with proper error handling
 * @param {string} command - Command to execute
 * @param {string} cwd - Working directory
 * @param {Object} options - Additional options
 * @returns {Promise<boolean>} - Success status
 */
const runCommand = async (command, cwd = process.cwd(), options = {}) => {
  try {
    // Sanitize the command to prevent injection
    const sanitizedCommand = sanitizeInput(command);
    if (sanitizedCommand !== command) {
      throw new Error('Command contains potentially dangerous characters');
    }

    const execOptions = {
      cwd,
      stdio: options.silent ? 'pipe' : 'inherit',
      timeout: options.timeout || 120000, // 2 minute timeout for npm installs
      ...options,
    };

    execSync(sanitizedCommand, execOptions);
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to execute command: ${command}`));
    console.error(chalk.red(`Error: ${error.message}`));
    return false;
  }
};

/**
 * Executes multiple commands in sequence
 * @param {Array} commands - Array of command objects
 * @param {string} cwd - Working directory
 * @returns {Promise<boolean>} - Success status
 */
const runCommands = async (commands, cwd = process.cwd()) => {
  for (const command of commands) {
    const success = await runCommand(command.cmd, cwd, command.options || {});
    if (!success && !command.optional) {
      return false;
    }
  }
  return true;
};

module.exports = {
  runCommand,
  runCommands,
};
