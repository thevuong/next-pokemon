/**
 * @see https://commitlint.js.org/reference/configuration.html
 * @type {import('@commitlint/types').UserConfig}
 */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 350],
  },
};

export default config;