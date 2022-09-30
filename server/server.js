import http from 'node:http';
import Koa from 'koa';
import Router from '@koa/router';
import middlewares from './middlewares/middlewares.js';
import routes from './routes.js';

const app = new Koa();
const router = new Router();

middlewares(app, router);
routes(router);

http.createServer(app.callback()).listen(5050);