import sass from 'sass';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { isDevelopment } from '../config.js';

// css-loader的mode
// Callback must return "local", "global", or "pure" values
function cssLoaderModeFunc(resourcePath) {
  if (/(pure\.(css|less|sass|scss|styl(us)?))/i.test(resourcePath)) {
    return 'pure';
  }

  if (/(node_modules|global\.(css|less|sass|scss|styl(us)?))/i.test(resourcePath)) {
    return 'global';
  }

  return 'local';
}

function cssLoader(exportOnlyLocals) {
  return {
    loader: 'css-loader',
    options: {
      modules: {
        mode: cssLoaderModeFunc,
        localIdentName: isDevelopment ? '[path][name]__[local]___[hash:base64:6]' : '_[hash:base64:6]',
        exportOnlyLocals
      },
      esModule: !exportOnlyLocals
    }
  };
}

function sassLoader() {
  return {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        fiber: false
      },
      implementation: sass
    }
  };
}

function sassRule() {
  return {
    test: /^.*\.s(a|c)ss$/i,
    oneOf: [
      {
        resourceQuery: /locals/i,
        use: [
          cssLoader(true),
          sassLoader()
        ]
      },
      {
        use: [
          MiniCSSExtractPlugin.loader,
          cssLoader(),
          sassLoader()
        ]
      }
    ]
  };
}

export default sassRule;