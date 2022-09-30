import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { isDevelopment, srcDir, viewDir } from '../config.js';

const htmlWebpackPluginMinifyOptions = {
  collapseWhitespace: true,
  keepClosingSlash: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: {
    ecma: 2020,
    safari10: true
  }
};

/**
 * 创建Html-webpack-plugin插件
 * @param { Array<string | [string, object | undefined]> } htmlArr: html文件的地址
 */
export function createHtmlWebpackPlugin(htmlArr = []) {
  const plugins = [];

  for (const item of htmlArr) {
    let htmlFile, htmlOptions;

    if (Array.isArray(item)) {
      [htmlFile, htmlOptions] = item;
    } else {
      htmlFile = item;
    }

    const template = path.join(srcDir, item);
    const info = path.parse(template);
    const htmlWebpackPluginOptions = {
      inject: true,
      scriptLoading: 'blocking',
      hash: !isDevelopment,
      filename: path.join(viewDir, `${ info.name }.ejs`),
      chunks: [info.name],
      minify: isDevelopment ? false : htmlWebpackPluginMinifyOptions
    };

    if (htmlOptions) {
      Object.assign(htmlWebpackPluginOptions, htmlOptions);
    }

    plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));
  }

  return plugins;
}

/**
 * 创建entry
 */
export function createEntry(entryArr = []) {
  const entry = {};

  for (const item of entryArr) {
    const file = path.join(srcDir, item);
    const info = path.parse(file);

    entry[info.name] = [file];
  }

  return entry;
}