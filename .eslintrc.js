module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  "ignorePatterns": [
    ".eslintrc.js",
    "example/dist/**",
    "webpack.config.js"
  ],
  'extends': [
    'eslint:recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  rules: {
    "camelcase": 1,
    "@typescript-eslint/naming-convention": 1
  }
};
