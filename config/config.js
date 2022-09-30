import path from 'node:path';
import process from 'node:process';
import { metaHelper } from '@sweet-milktea/util-tools';

const { __dirname } = metaHelper(import.meta.url);

// 开发环境
export const isDevelopment = process.env.NODE_ENV === 'development';

// 根目录
export const root = path.join(__dirname, '..');

// 源代码
export const srcDir = path.join(root, 'src');

// 资源文件夹
export const distDir = path.join(root, 'dist');

// view文件夹
export const viewDir = path.join(root, 'views');

// 缓存文件夹
export const cacheDir = path.join(root, '.cache');