module.exports = {
  // other webpack configuration options...

  resolve: {
    fallback: {
      assert: require.resolve("assert/"),
    },
  },
};
