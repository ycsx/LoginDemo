# LoginDemo

##包含vue前端（app）和nodejs后端（server）

###后端应用的数据库为MongoDB

####登入MongoDB，创建Database auth
```
 use auth
```
####创建表`users`和表`session`
#####users用来保存用户信息
#####session用来做验证码判定
```
db.createCollection('session');
db.createCollection('users');
```

####需要自行创建用户数据

###前端启动方法
####进入app目录，输入
```
npm run serve
```
###后端启动方法
####进入server目录，输入
```
npm start
```
####访问localhost:8080


