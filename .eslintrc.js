module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': 'off',
    'standard/no-callback-literal': [
      2,
      [
        'cb',
        'callback'
      ]
    ],
    'no-extend-native': 0,
    'vue/html-indent': 2,
    'vue/html-closing-bracket-spacing': 2,
    'vue/no-multi-spaces': 2,
    'vue/multiline-html-element-content-newline': 2,
    'vue/mustache-interpolation-spacing': 2,
    'vue/no-spaces-around-equal-signs-in-attribute': 2,
    'vue/no-template-shadow': 2,
    'vue/name-property-casing': 2,
    'vue/attributes-order': 1,
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}