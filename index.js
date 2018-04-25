const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const Router = require('koa-router');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const staticPath = './static';

let router = new Router();
router.get('/test', async ctx => {
  ctx.body = {
    message: 'test'
  }
});
router.post('/testPost', async ctx => {
  ctx.body = {
    success: true
  }
});

app
  .use(static(path.join(__dirname, staticPath)))
  .use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', (err, ctx) => {
  log.error('server error', err);
});

app.listen(3000); // 只是 http.createServer(app.callback()).listen(3000) 的语法糖
console.log('程序已启动，正在监听 http://localhost:3000, 请打开浏览器查看');
