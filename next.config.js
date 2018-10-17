const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: (config, {buildId, dev, isServer, defaultLoaders}) => {
    // add webworkers as entry points
    const originalEntry = config.entry;
    config.entry = () =>
      originalEntry().then(entries => ({
        ...entries,
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
        'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
        'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
        'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
      }));

    // add monaco plugin
    config.plugins.push(new MonacoWebpackPlugin());
    return config;
  },
});
