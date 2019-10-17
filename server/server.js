const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const routers = require('./router/routers.js')
const cors = require('koa2-cors');

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080'; //这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept','sessionId'],
}))

app.use(bodyParser())
    .use(routers.routes())
    .use(routers.allowedMethods())

    
app.listen(3006);