module.exports = {
  '*.{js,ts}': [
    'eslint --fix',
    'jest --bail --coverage=false --passWithNoTests',
  ],
  // Or simply remove the Jest command if it's not critical for pre-commit:
  // "*.{js,ts}": ["eslint --fix"]
};
