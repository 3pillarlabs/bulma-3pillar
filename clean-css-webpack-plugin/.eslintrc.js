module.exports = {
  extends: [ "eslint:recommended", "google" ],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "max-len": [ "error", { code: 120 } ],
    "linebreak-style": ["error", "unix"]
  },
  parserOptions: {
    ecmaVersion: 2018
  },
};
