const router = require('koa-router')()
var uuid = require('node-uuid');

const routers = router.get('/', async (ctx) => {
    if(!ctx.request.header.sessionid){
        ctx.body = uuid.v1()
    }else{
        ctx.body = 200
    }
})

module.exports = routers