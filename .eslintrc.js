module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "warn",
    quotes: ["error", "double"],
    semi: ["warn", "always"],
    "space-before-function-paren": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
