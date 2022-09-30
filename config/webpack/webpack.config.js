import path from 'node:path';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import WebpackBar from 'webpackbar';
import { isDevelopment, distDir, cacheDir } from '../config.js';
import babelRule from './babelRule.js';
import sassRule from './sassRule.js';
import pugRule from './pugRule.js';
import optimization from './optimization.js';
import { createHtmlWebpackPlugin, createEntry } from './function.js';
import { entry, html } from '../webpack.js';

export default {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  target: ['web', 'es2020'],
  performance: { hints: false },
  infrastructureLogging: { level: 'warn' },
  stats: {
    colors: true,
    assets: false,
    entrypoints: false,
    builtAt: false,
    hash: false,
    modules: false,
    version: false,
    timings: false
  },
  cache: isDevelopment ? {
    type: 'filesystem',
    cacheDirectory: path.join(cacheDir, 'webpack')
  } : false,
  entry: createEntry(entry),
  output: {
    publicPath: '',
    path: distDir,
    filename: isDevelopment ? '[name].js' : '[name]_[chunkhash:15].js',
    assetModuleFilename: isDevelopment ? '[name]_[hash:5][ext]' : '[name]_[hash:15][ext]',
    globalObject: 'globalThis'
  },
  module: {
    rules: [
      babelRule(),
      sassRule(),
      pugRule()
    ]
  },
  plugins: [
    new WebpackBar(),
    new MiniCSSExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name]_[chunkhash:15].css',
      chunkFilename: isDevelopment ? '[name].css' : '[name]_[chunkhash:15].css',
      ignoreOrder: true
    })
  ].concat(createHtmlWebpackPlugin(html)),
  optimization: optimization(),
  experiments: {
    topLevelAwait: true
  }
};