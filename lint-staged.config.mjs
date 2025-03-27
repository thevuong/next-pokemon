import { relative } from 'node:path';

/**
 * Builds an ESLint command with the given filenames.
 *
 * @param {string[]} filenames - An array of filenames to be passed to the
 *   ESLint command.
 * @returns {string} - The generated ESLint command.
 */
function buildEslintCommand(filenames) {
  return `next lint --fix --max-warnings 0 --file ${filenames
    .map((file) => relative(import.meta.dirname, file))
    .join(' --file ')}`;
}

/**
 * @see https://www.npmjs.com/package/lint-staged
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*.{json,css,scss,md}': ['prettier --list-different --write'],
  '*.{js,mjs,jsx,ts,tsx}': [buildEslintCommand, 'prettier --list-different --write'],
};

export default config;
