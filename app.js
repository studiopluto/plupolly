const Koa = require('koa');
const app = new Koa();

// 1. x-response-time
app.use(async (ctx, next) => {

  const start = Date.now();
  await next();

  console.log(1);

  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// 2. logger
app.use(async (ctx, next) => {

  const start = Date.now();
  await next();

  console.log(2);

  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// 3. response
app.use(async ctx => {
  
  //ctx.throw(401, 'access_denied');
  //ctx.assert(ctx.state.user, 401, 'User not found. Please login!');

  console.log('여기가 들어올까요?');
  ctx.body = 'Hello World';
});

app.on('error', err => {
  console.error('server error', err.message)
});

app.listen(3000);