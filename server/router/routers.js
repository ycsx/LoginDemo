const router = require('koa-router')();
const captcha = require('./captcha');
const login = require('./login')
const session = require('./session')

router.use('/getCaptcha', captcha.routes(), captcha.allowedMethods(['get']))
router.use('/session', session.routes(), session.allowedMethods(['options','get']))
router.use('/login', login.routes(), login.allowedMethods(['options','post']))
module.exports = router