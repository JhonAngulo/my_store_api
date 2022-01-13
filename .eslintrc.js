const Rules = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error'
}

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': Rules.WARN,
    camelcase: Rules.OFF
    // camelcase: [Rules.OFF, { properties: 'never', ignoreDestructuring: true, ignoreGlobals: true, ignoreImports: true }]
  }
}
