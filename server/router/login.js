const router = require('koa-router')()
const MongoClient = require('mongodb').MongoClient
const mongoUrl = "mongodb://localhost:27017"

const matchCaptcha = function(ctx,data){
  return new Promise(function (resolve,reject) {
    MongoClient.connect(mongoUrl,function(err,db){
      const database = db.db('auth')
      const collection = database.collection('session')
      collection.find({sessionid:data.sessionid},{projection: { _id: 0, sessionid: 1, captcha: 1 }}).toArray(function(err,result){
        db.close()
        resolve(result);
      })
    })
  })
}

const matchUser = function(data){
  return new Promise(function (resolve,reject) {
    MongoClient.connect(mongoUrl,function(err,db){
      const database = db.db('auth')
      const collection = database.collection('users')
      collection.find({username:data.username},{projection: { _id: 0, username: 1, password: 1 }}).toArray(function(err,result){
        db.close()
        resolve(result);
      })
    })
  })
}

const routers = router.post('/', async (ctx) => {
    result = await matchCaptcha(ctx,{sessionid:ctx.request.header.sessionid,captcha:ctx.request.body.code})
    if(result[0].captcha.toLowerCase() === ctx.request.body.code.toLowerCase()){
      login = await matchUser({username:ctx.request.body.userName,password:ctx.request.body.password})
      if(login.length === 0 || login[0].password !== ctx.request.body.password){
        ctx.body = {
          code:401,
          text:"用户名或密码错误"
        }
      }else{
        ctx.body = {
          code:200,
          text:"登录成功"
        }
      }
    }else{
      ctx.body = {
        code:401,
        text:"验证码错误"
      }
    }    
})
module.exports = routers