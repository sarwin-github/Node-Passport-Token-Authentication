const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require("passport");
const Client = require("../model/client");

// get login form
module.exports.getLogin = (req, res) => {
  res.render('client/login.ejs', { 
    success: true, 
    message:'Successfully fetched form for login.'
  });
}

// login client
module.exports.postLogin = (req, res, next) => {
  passport.authenticate('client-login', {session: false}, (err, client, info) => {
        if (err || !client) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                client   : client
            });
        }

        req.login(client, {session: false}, (err) => {
            if (err) {
              res.send(err);
            }

            const token = jwt.sign(client.toJSON(), process.env.jwt_secret, { expiresIn: '5h' });
            res.cookie('client-jwt', token);
            console.log(token);

            return res.redirect('/client/profile')
        });
    })
    (req, res);
}

// create new client
module.exports.getSignUp = (req, res) => {
  res.render('client/signup.ejs', { 
    success: true, 
    message:'Successfully fetched form for signup.'
  });
}


// create new client
module.exports.signUp = (req, res) => {
  let client = new Client();

  client.email    = req.body.email;
  client.password = client.generateHash(req.body.password);
  client.name     = req.body.name;

  client.save(err => {
    if(err){
      return res.json({err:err, message: 'Something went wrong.'});
    }

    res.json({message:"successfully added new client"});
  })
}


// get client profile
module.exports.getProfile = (req, res) => {
  res.render('client/profile.ejs', { 
    client: req.user, 
    message: 'Successfully fetched client profile.'
  });
}

module.exports.getLogout = (req, res) => {
  req.logout();
  res.clearCookie('client-jwt');
  res.redirect('/client/login')
}