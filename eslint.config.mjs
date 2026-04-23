import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'perfectionist/sort-imports': ['error', {
      type: 'alphabetical',
      order: 'asc',
      groups: [
        'type',
        ['builtin', 'external'],
        'internal',
        ['parent', 'sibling', 'index'],
      ],
    }],
    'perfectionist/sort-vue-attributes': 'error',
    'perfectionist/sort-interfaces': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-undef': 'error'
  }
})