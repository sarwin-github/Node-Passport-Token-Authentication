const Client        = require('../model/client');
const passport      = require('passport');
const passportJWT   = require("passport-jwt");

//jwt authentication
const ExtractJWT    = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

//local
const LocalStrategy = require('passport-local').Strategy;

//passport local
passport.use('client-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, callback) => {

        return Client.findOne({ 'email': email.toLowerCase() }, (err, client) => {
            if (err) {
                return callback(err);
            }
            if (!client) {
                return callback(null, false, { message: 'Client does not exist in the database.'});
            }
            if (!client.validPassword(password)) {
                return callback(null, false, { message: 'Invalid password.'});
            }
            return callback(null, client);
        });
    }
));

let cookieExtractor = (req, res) => {
  var token = null;
  if (req && req.cookies) token = req.cookies['client-jwt'];
  return token;
};

//passport jwt
const opts = {};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey    =  process.env.jwt_secret;

passport.use('client-jwt', new JWTStrategy(opts, (jwt_payload, callback) => {
    let query = Client.findOne({_id: jwt_payload._id}).select({'email': 1, 'name': 1, 'client': 1});

    query.exec((err, client) => {
        if (err) {
            return callback(err, false);
        }
        if (client) {
            return callback(null, client);
        } else {
            return callback(null, false);
            // or you could create a new account
        }
    });
}));