module.exports = {
  extends: ["plugin:react/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    rules: {},
    settings: {
      react: {
        version: "detect",
      },
    },
  },
};
