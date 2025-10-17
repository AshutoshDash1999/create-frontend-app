const { validateProjectName, sanitizeInput, validatePath } = require('../src/validators');
const { TECH_STACKS, UI_LIBRARIES } = require('../src/constants');

describe('Validators', () => {
  describe('validateProjectName', () => {
    test('should accept valid project names', () => {
      expect(validateProjectName('my-app')).toBe(true);
      expect(validateProjectName('my_app')).toBe(true);
      expect(validateProjectName('myapp123')).toBe(true);
    });

    test('should reject invalid project names', () => {
      expect(validateProjectName('')).toBe(false);
      expect(validateProjectName('my app')).toBe(false);
      expect(validateProjectName('my@app')).toBe(false);
      expect(validateProjectName('my.app')).toBe(false);
      expect(validateProjectName(null)).toBe(false);
      expect(validateProjectName(undefined)).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    test('should sanitize dangerous characters', () => {
      expect(sanitizeInput('test; rm -rf /')).toBe('test rm -rf /');
      expect(sanitizeInput('test && echo "hack"')).toBe('test  echo "hack"');
      expect(sanitizeInput('normal-input')).toBe('normal-input');
    });

    test('should handle non-string inputs', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(123)).toBe('');
    });
  });

  describe('validatePath', () => {
    test('should accept valid paths', () => {
      expect(validatePath('my-project')).toBe(true);
      expect(validatePath('my/project')).toBe(true);
      expect(validatePath('my-project-123')).toBe(true);
    });

    test('should reject dangerous paths', () => {
      expect(validatePath('../hack')).toBe(false);
      expect(validatePath('../../../etc/passwd')).toBe(false);
      expect(validatePath('con')).toBe(false);
      expect(validatePath('prn')).toBe(false);
      expect(validatePath('')).toBe(false);
      expect(validatePath(null)).toBe(false);
    });
  });
});

describe('Constants', () => {
  test('should have valid tech stack constants', () => {
    expect(TECH_STACKS.REACT).toBe('React');
    expect(TECH_STACKS.NEXTJS).toBe('Next.js');
  });

  test('should have valid UI library constants', () => {
    expect(UI_LIBRARIES.MANTINE).toBe('Mantine');
    expect(UI_LIBRARIES.TAILWIND_SHADCN).toBe('Tailwind and Shadcn');
  });
});
