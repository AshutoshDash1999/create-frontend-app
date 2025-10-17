const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk').default || require('chalk');
const { validatePath } = require('../validators');

/**
 * Safely creates a directory
 * @param {string} dirPath - Directory path to create
 * @returns {Promise<boolean>} - Success status
 */
const createDirectory = async dirPath => {
  try {
    if (!validatePath(dirPath)) {
      throw new Error('Invalid directory path');
    }

    await fs.mkdir(dirPath, { recursive: true });
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to create directory: ${dirPath}`));
    console.error(chalk.red(`Error: ${error.message}`));
    return false;
  }
};

/**
 * Safely writes a file
 * @param {string} filePath - File path to write
 * @param {string} content - Content to write
 * @returns {Promise<boolean>} - Success status
 */
const writeFile = async (filePath, content) => {
  try {
    if (!validatePath(filePath)) {
      throw new Error('Invalid file path');
    }

    const dir = path.dirname(filePath);
    await createDirectory(dir);
    await fs.writeFile(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to write file: ${filePath}`));
    console.error(chalk.red(`Error: ${error.message}`));
    return false;
  }
};

/**
 * Safely writes a JSON file
 * @param {string} filePath - File path to write
 * @param {Object} data - Data to write as JSON
 * @returns {Promise<boolean>} - Success status
 */
const writeJsonFile = async (filePath, data) => {
  try {
    const content = JSON.stringify(data, null, 2);
    return await writeFile(filePath, content);
  } catch (error) {
    console.error(chalk.red(`Failed to write JSON file: ${filePath}`));
    console.error(chalk.red(`Error: ${error.message}`));
    return false;
  }
};

/**
 * Checks if a directory exists
 * @param {string} dirPath - Directory path to check
 * @returns {Promise<boolean>} - Exists status
 */
const directoryExists = async dirPath => {
  try {
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
};

/**
 * Safely removes a directory and its contents
 * @param {string} dirPath - Directory path to remove
 * @returns {Promise<boolean>} - Success status
 */
const removeDirectory = async dirPath => {
  try {
    if (!validatePath(dirPath)) {
      throw new Error('Invalid directory path');
    }

    await fs.rm(dirPath, { recursive: true, force: true });
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to remove directory: ${dirPath}`));
    console.error(chalk.red(`Error: ${error.message}`));
    return false;
  }
};

/**
 * Creates multiple directories in sequence
 * @param {Array} dirPaths - Array of directory paths
 * @returns {Promise<boolean>} - Success status
 */
const createDirectories = async dirPaths => {
  for (const dirPath of dirPaths) {
    const success = await createDirectory(dirPath);
    if (!success) {
      return false;
    }
  }
  return true;
};

module.exports = {
  createDirectory,
  writeFile,
  writeJsonFile,
  directoryExists,
  removeDirectory,
  createDirectories,
};
