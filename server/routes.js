import indexController from '../controllers/index.js';
import listController from '../controllers/list.js';

function routes(router) {
  router.get('/', indexController);
  router.get('/index', indexController);
  router.get('/list', listController);
}

export default routes;