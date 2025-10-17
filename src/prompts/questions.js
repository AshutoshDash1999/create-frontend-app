const chalk = require('chalk').default || require('chalk');
const {
  TECH_STACKS,
  BUILD_TOOLS,
  UI_LIBRARIES,
  STATE_MANAGEMENT,
  PACKAGE_MANAGERS,
  FETCHING_LIBRARIES,
} = require('../constants');

/**
 * CLI questions for project configuration
 */
const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: chalk.blue("What's the project name?"),
    validate: function (input) {
      if (!input || input.trim().length === 0) {
        return 'Project name is required.';
      }
      if (input.length > 50) {
        return 'Project name must be 50 characters or less.';
      }
      if (!/^[A-Za-z0-9\-_]+$/.test(input)) {
        return 'Project name may only include letters, numbers, hyphens, and underscores.';
      }
      return true;
    },
    filter: input => input.trim(),
  },
  {
    type: 'list',
    name: 'techStack',
    message: chalk.blue('What tech stack to use?'),
    choices: [
      { name: chalk.yellow('React'), value: TECH_STACKS.REACT },
      { name: chalk.green('Next.js'), value: TECH_STACKS.NEXTJS },
    ],
    default: TECH_STACKS.REACT,
  },
  {
    type: 'list',
    name: 'buildTool',
    message: chalk.blue('What build tool to use?'),
    choices: [
      { name: chalk.cyan('Vite'), value: BUILD_TOOLS.VITE },
      { name: chalk.blue('Webpack'), value: BUILD_TOOLS.WEBPACK },
    ],
    default: BUILD_TOOLS.VITE,
    when: answers => answers.techStack === TECH_STACKS.REACT,
  },
  {
    type: 'list',
    name: 'uiLibrary',
    message: chalk.blue('What UI library to use?'),
    choices: [
      { name: chalk.cyan('Mantine'), value: UI_LIBRARIES.MANTINE },
      { name: chalk.magenta('Tailwind and Shadcn'), value: UI_LIBRARIES.TAILWIND_SHADCN },
    ],
    default: UI_LIBRARIES.TAILWIND_SHADCN,
  },
  {
    type: 'list',
    name: 'stateManagement',
    message: chalk.blue('State management?'),
    choices: [
      { name: chalk.red('Zustand'), value: STATE_MANAGEMENT.ZUSTAND },
      { name: 'None', value: STATE_MANAGEMENT.NONE },
    ],
    default: STATE_MANAGEMENT.NONE,
  },
  {
    type: 'list',
    name: 'packageManager',
    message: chalk.blue('Package management?'),
    choices: [
      { name: chalk.red('npm'), value: PACKAGE_MANAGERS.NPM },
      { name: chalk.yellow('yarn'), value: PACKAGE_MANAGERS.YARN },
      { name: chalk.cyan('pnpm'), value: PACKAGE_MANAGERS.PNPM },
    ],
    default: PACKAGE_MANAGERS.NPM,
  },
  {
    type: 'list',
    name: 'fetchingLibrary',
    message: chalk.blue('Data fetching library?'),
    choices: [
      { name: chalk.green('React Query'), value: FETCHING_LIBRARIES.REACT_QUERY },
      { name: chalk.magenta('Apollo Client'), value: FETCHING_LIBRARIES.APOLLO },
      { name: 'None', value: FETCHING_LIBRARIES.NONE },
    ],
    default: FETCHING_LIBRARIES.NONE,
  },
];

module.exports = {
  questions,
};
