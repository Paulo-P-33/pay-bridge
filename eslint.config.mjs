import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import davi from '@dgvalerio/eslint-config/nest.json' assert {type: 'json'};

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
    ignores: ['./*.config.js', '!**/eslint.config.js'],
    rules: {
      ...davi.rules['padding-line-between-statements'],
      camelcase: 'error',
      quotes: ['warn', 'single'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'comma-dangle': ['error', 'always-multiline'],
      'max-len': ['error', { code: 120 }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/quotes': [
        'error',
        'single',
        { allowTemplateLiterals: true },
      ],
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      // 'padding-line-between-statements': [
      //   'error',
      //   {
      //     'blankLine': 'always',
      //     'prev': '*',
      //     'next': 'return',
      //   },
      //   {
      //     'blankLine': 'always',
      //     'prev': '*',
      //     'next': 'throw',
      //   },
      //   {
      //     'blankLine': 'always',
      //     'prev': [
      //       'const',
      //       'let',
      //       'var',
      //     ],
      //     'next': '*',
      //   },
      //   {
      //     'blankLine': 'always',
      //     'prev': '*',
      //     'next': [
      //       'const',
      //       'let',
      //       'var',
      //     ],
      //   },
      //   {
      //     'blankLine': 'any',
      //     'prev': [
      //       'const',
      //       'let',
      //       'var',
      //     ],
      //     'next': [
      //       'const',
      //       'let',
      //       'var',
      //     ],
      //   },
      // ],
    },
  },
];