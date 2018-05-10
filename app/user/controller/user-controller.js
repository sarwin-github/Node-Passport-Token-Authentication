const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require("passport");

module.exports.getLogin = (req, res) => {
  res.render('user/login.ejs', { 
    success: true, 
    message:'Successfully fetched form for login.'
  });
}

module.exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {      
      if (err || !user) {
          return res.status(400).json({
              message: info ? info.message : 'Login failed',
              user   : user
          });
      }

      req.login(user, {session: false}, (err) => {
         if (err) {
             res.json(err);
         }
         // generate a signed son web token with the contents of user object and return it in the response
         const token = jwt.sign(user, 'jwt_secret_token');

         return res.json({user, token});
      });
  })(req, res);
}

module.exports.getProfile = (req, res) => {
  res.json({user: req.user});
}