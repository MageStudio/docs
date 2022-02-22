module.exports = {
  mode: "development",
  mount: {
    examples: '/',
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    jsxFactory: "createVNode",
    jsxFragment: 'Fragment'
  },
};
