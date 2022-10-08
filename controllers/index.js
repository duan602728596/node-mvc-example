import Home from '../models/Home.js';

async function indexController(ctx, next) {
  const home = new Home();

  await ctx.render('index', {
    title: home.title,
    text: home.text
  });
}

export default indexController;