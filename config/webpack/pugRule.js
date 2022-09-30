import { isDevelopment } from '../config.js';

function pugRule() {
  return {
    test: /^.*\.pug$/i,
    use: [
      {
        loader: 'pug-loader',
        options: {
          pretty: isDevelopment,
          name: '[name].html'
        }
      }
    ]
  };
}

export default pugRule;