const { PROJECT_NAME_REGEX } = require('./constants');

/**
 * Validates project name format
 * @param {string} name - Project name to validate
 * @returns {boolean} - True if valid
 */
const validateProjectName = name => {
  if (!name || typeof name !== 'string') {
    return false;
  }
  return PROJECT_NAME_REGEX.test(name) && name.length > 0 && name.length <= 50;
};

/**
 * Sanitizes input to prevent command injection
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
const sanitizeInput = input => {
  if (typeof input !== 'string') {
    return '';
  }
  // Remove potentially dangerous characters
  return input.replace(/[;&|`$(){}[\]\\]/g, '');
};

/**
 * Validates that a path is safe to use
 * @param {string} path - Path to validate
 * @returns {boolean} - True if safe
 */
const validatePath = path => {
  if (!path || typeof path !== 'string') {
    return false;
  }

  // Basic validation - just check for obvious dangerous patterns
  const dangerousPatterns = [
    /\.\./, // Directory traversal
    /[<>"|?*]/, // Invalid filename characters (removed : for Windows drive letters)
    /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i, // Windows reserved names
  ];

  // Extract just the filename for reserved name check
  const pathParts = path.split(/[\\/]/);
  const filename = pathParts[pathParts.length - 1];

  // Check for dangerous patterns in the full path
  const hasDangerousPattern = dangerousPatterns.some(pattern => pattern.test(path));

  // Check for reserved names in the filename
  const hasReservedName = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(filename);

  return !hasDangerousPattern && !hasReservedName;
};

module.exports = {
  validateProjectName,
  sanitizeInput,
  validatePath,
};
