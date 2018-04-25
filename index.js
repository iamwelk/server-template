const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();
const staticPath = './static';

app.use(static(path.join(__dirname, staticPath)));

app.on('error', (err, ctx) => {
  log.error('server error', err);
});

app.listen(3000); // 只是 http.createServer(app.callback()).listen(3000) 的语法糖
console.log('程序已启动，正在监听 http://localhost:3000, 请打开浏览器查看');
