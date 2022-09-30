function routes(router) {
  router.get('/', (ctx) => {
    ctx.body = 'Hello World';
  });
}

export default routes;