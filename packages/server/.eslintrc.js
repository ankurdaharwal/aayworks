module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/type-annotation-spacing": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "arrow-parens": ["off", "as-needed"],
    "eol-last": "off",
    "linebreak-style": "off",
    "new-parens": "off",
    "newline-per-chained-call": "off",
    "no-extra-semi": "off",
    "no-irregular-whitespace": "off",
    "no-multiple-empty-lines": "off",
    "quote-props": "off",
    "space-before-function-paren": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "."],
      },
    },
  },
};
