import path from 'node:path';
import { cacheDir } from '../config.js';

function babelLoader() {
  return {
    loader: 'babel-loader',
    options: {
      presets: ['@sweet-milktea/babel-preset-sweet'],
      cacheDirectory: path.join(cacheDir, 'babel'),
      configFile: false,
      babelrc: false
    }
  };
}

function babelRule() {
  return {
    test: /^.*\.(m|c)?jsx?$/i,
    use: [babelLoader()],
    exclude: /node_modules/
  };
}

export default babelRule;