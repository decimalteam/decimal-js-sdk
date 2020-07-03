module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    "es6": true,
    "browser": true
  },
  extends: 'airbnb-base',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 0,
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
  },
};
