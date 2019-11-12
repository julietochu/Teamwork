module.exports = {
  env: {
    jasmine: true
  },
  extends: "airbnb-base",
  rules: {
    'no-console': 'off',
    'pool': 'off', 
  },
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true,
        "modules": true,
        "parser": "babel-eslint"
    }
}
};
