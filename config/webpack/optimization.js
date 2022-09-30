import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { isDevelopment } from '../config.js';

function optimization() {
  const optimizationConfig = {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      minChunks: 2
    }
  };

  if (!isDevelopment) {
    optimizationConfig.minimizer = [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          ecma: 2020,
          safari10: true
        }
      }),
      new CssMinimizerPlugin()
    ];
  }

  return optimizationConfig;
}

export default optimization;