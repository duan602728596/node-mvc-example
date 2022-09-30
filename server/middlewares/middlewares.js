import body from 'koa-body';
import compress from 'koa-compress';
import serve from 'koa-static';
import ejsRender from 'koa-ejs';
import { isDevelopment, distDir, viewDir } from '../../config/config.js';

function middlewares(app, router) {
  /* post body */
  app.use(body());

  /* 文件压缩 */
  if (!isDevelopment) {
    app.use(compress());
  }

  /* 静态资源 */
  app.use(serve(distDir, {
    maxage: isDevelopment ? 0 : (60 ** 2) * 24 * 365 * 1_000,
    index: false
  }));

  /* router */
  app.use(router.routes())
    .use(router.allowedMethods());

  /* ejs */
  ejsRender(app, {
    root: viewDir,
    viewExt: 'html',
    cache: !isDevelopment,
    debug: isDevelopment
  });
}

export default middlewares;