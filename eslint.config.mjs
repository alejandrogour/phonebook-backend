import { defineFlatConfig } from 'eslint-define-config';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const compat = new FlatCompat();

export default defineFlatConfig([
  { ignores: ['dist/**', 'node_modules/**'] },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  ...fixupConfigRules(compat.extends('airbnb-base')),
  {
    rules: {
      'no-console': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'no-underscore-dangle': 'off',
    },
  },
]);
