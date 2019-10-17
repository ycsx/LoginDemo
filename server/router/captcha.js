const router = require('koa-router')()
const svgCaptcha = require('svg-captcha');
const MongoClient = require('mongodb').MongoClient
const mongoUrl = "mongodb://localhost:27017"

const sessionMatch = function(data){
  MongoClient.connect(mongoUrl,function(err,db){
    const database = db.db('auth')
    const collection = database.collection('session')
    collection.update({sessionid:data.sessionid},data,function(err,result){
      if(err){
        console.log(err);
        return
      }
      db.close()
    })
  })
}
const getCaptcha = function(ctx){
  var captcha = svgCaptcha.create({  
    // 翻转颜色  
    inverse: false,  
    // 字体大小  
    fontSize: 36,  
    // 噪声线条数  
    noise: 2,  
    // 宽度  
    width: 80,  
    // 高度  
    height: 30,  
  });  
  ctx.response.type = "image/svg+xml";
  ctx.body = captcha.data;
  sessionMatch({sessionid:ctx.request.header.sessionid,captcha:captcha.text})
}
const routers = router.get('/', async (ctx) => {
  return await getCaptcha(ctx);
})

module.exports = routers