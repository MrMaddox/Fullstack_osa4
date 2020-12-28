module.exports = {
    "env": {
      "commonjs": true, 
      "es6": true,
      "node": true,
      "jest": true,
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
      },
      "rules": {
        "indent": [
          "warn",
          2
        ],
        "linebreak-style": [
          "warn",
          "windows"
        ],
        "quotes": [
          "warn",
          "double"
        ],
        "semi": [
          "warn",
          "never"
        ],
        "no-undef": [
          "off"
        ],
        "no-unused-vars": [
          "off"
        ],
        "no-trailing-spaces": "warn",
        "arrow-spacing": [
          "warn", { "before": true, "after": true }
        ],
        "object-curly-spacing": [
          "warn", "always"
        ],
        "no-console": "off",
      }
  };