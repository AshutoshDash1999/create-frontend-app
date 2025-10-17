// Constants for the CLI tool
const TECH_STACKS = {
  REACT: 'React',
  NEXTJS: 'Next.js',
};

const BUILD_TOOLS = {
  VITE: 'Vite',
  WEBPACK: 'Webpack',
};

const UI_LIBRARIES = {
  MANTINE: 'Mantine',
  TAILWIND_SHADCN: 'Tailwind and Shadcn',
};

const STATE_MANAGEMENT = {
  ZUSTAND: 'Zustand',
  NONE: 'None',
};

const PACKAGE_MANAGERS = {
  NPM: 'npm',
  YARN: 'yarn',
  PNPM: 'pnpm',
};

const FETCHING_LIBRARIES = {
  REACT_QUERY: 'React Query',
  APOLLO: 'Apollo Client',
  NONE: 'None',
};

const DEPENDENCIES = {
  CORE: ['eslint', 'prettier', 'husky', 'typescript', 'lighthouse', 'dayjs', 'zod'],
  REACT: ['react', 'react-dom'],
  NEXTJS: ['next', 'react', 'react-dom'],
  VITE: ['vite', '@vitejs/plugin-react'],
  MANTINE: ['@mantine/core', '@mantine/hooks', '@mantine/notifications'],
  TAILWIND: ['tailwindcss', 'postcss', 'autoprefixer'],
  ZUSTAND: ['zustand'],
  REACT_QUERY: ['@tanstack/react-query'],
  APOLLO: ['@apollo/client', 'graphql'],
};

const DEV_DEPENDENCIES = [
  '@types/node',
  '@types/react',
  '@types/react-dom',
  'eslint-plugin-prettier',
  'eslint-config-prettier',
];

const PROJECT_NAME_REGEX = /^[A-Za-z0-9\-_]+$/;

module.exports = {
  TECH_STACKS,
  BUILD_TOOLS,
  UI_LIBRARIES,
  STATE_MANAGEMENT,
  PACKAGE_MANAGERS,
  FETCHING_LIBRARIES,
  DEPENDENCIES,
  DEV_DEPENDENCIES,
  PROJECT_NAME_REGEX,
};
