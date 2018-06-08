var TokenStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var UserDb = require('../db/mongo/index').User
var tokenConfig = require('./token.config')
var passport = require('passport')

passport.use(new TokenStrategy(
  function (token, done) {
      jwt.verify(token, tokenConfig.secret, function (err, decode) {
          if (err) {
              if (err.name == 'TokenExpiredError') {
                  return done(null, false)
              }
              return done(err);
          } else {
              UserDb.findOne({token: token}, function (err, user) {
                  if (err) {
                      return done(err);
                  }
                  if (user == null) {
                      return done(null, false);
                  }
                  return done(null, user);
              })
          }
      })
  }
));


passport.serializeUser(function (user, done) {//保存user对象
    console.log('serializeUser')
    console.log(user)
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    console.log('deserializeUser')
    console.log(user)
    done(null, user);//可以通过数据库方式操作
});

module.exports = passport