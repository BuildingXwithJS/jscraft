const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: (config, {buildId, dev, isServer, defaultLoaders}) => {
    // Perform customizations to webpack config
    // Important: return the modified config
    config.plugins.push(new MonacoWebpackPlugin());
    return config;
  },
});
