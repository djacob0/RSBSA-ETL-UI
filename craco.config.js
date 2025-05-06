module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.output.publicPath = './';
        return webpackConfig;
      }
    }
  };