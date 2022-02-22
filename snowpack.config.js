module.exports = {
  mode: "development",
  mount: {
    examples: '/',
  },
  plugins: [
    ['@snowpack/plugin-babel']
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    // jsxFactory: "createVNode",
    // jsxFragment: 'Fragment'
  },
};
