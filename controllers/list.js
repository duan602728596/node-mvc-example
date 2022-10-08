import Humans from '../models/Humans.js';

async function listController(ctx, next) {
  const humans = new Humans();

  await ctx.render('list', {
    humansList: humans.list
  });
}

export default listController;