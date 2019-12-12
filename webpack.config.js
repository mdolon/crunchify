const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const distPath = (subfolder = '') => path.resolve(__dirname, subfolder ? `dist/${subfolder}` : 'dist');
const isProd = false;

const defaultConfigs = {
  mode: isProd ? 'production' : 'development',
  entry: {
    contentscript: ['babel-polyfill', './src/contentscript.js'],
    background: ['babel-polyfill', './src/background.js'],
    options: './src/options.js',
    styles: './src/styles/styles.scss',
  },
  devServer: {
    contentBase: distPath(),
    port: 9000,
  },
  devtool: isProd ? '' : 'source-map',
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      styles: path.resolve(__dirname, 'src/styles'),
    },
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /manifest*/],
        resolve: { extensions: ['.js', '.jsx'] },
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.css',
      chunkFilename: 'styles.css',
    }),
    new CopyWebpackPlugin([
      { from: './options.html' },
    ], { context: './src' }),
    new CopyWebpackPlugin([
      { from: './assets/*.{png,gif,svg}' },
    ], { context: './src' }),
  ],
};
const config = {
  chrome: {
    ...defaultConfigs,
    entry: {
      ...defaultConfigs.entry,
    },
    output: {
      path: distPath('chrome'),
      filename: '[name].bundle.js',
      pathinfo: !isProd,
    },
    plugins: [
      ...defaultConfigs.plugins,
      new CopyWebpackPlugin([
        { from: './manifest.chrome.json', to: `${distPath('chrome')}/manifest.json` },
      ], { context: './src' }),
    ],
  },
  firefox: {
    ...defaultConfigs,
    entry: {
      ...defaultConfigs.entry,
    },
    output: {
      path: distPath('firefox'),
      filename: '[name].bundle.js',
      pathinfo: !isProd,
    },
    plugins: [
      ...defaultConfigs.plugins,
      new CopyWebpackPlugin([
        { from: './manifest.firefox.json', to: `${distPath('firefox')}/manifest.json` },
      ], { context: './src' }),
    ],
  },
};

module.exports = [config.chrome, config.firefox];
