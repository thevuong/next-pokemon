import { config } from '@codefast/eslint-config/next';

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 * @type {import('eslint').Linter.Config[]}
 */
const nextConfig = [
  ...config,
  {
    rules: {
      'no-console': 'off',
    },
  },
];

export default nextConfig;
