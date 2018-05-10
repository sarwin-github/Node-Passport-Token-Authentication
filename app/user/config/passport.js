const User          = require('../model/user');
const passport      = require('passport');
const passportJWT   = require("passport-jwt");

//jwt authentication
const ExtractJWT    = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

//local
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, callback) => {

        return User.findOne({ 'email': email.toLowerCase() }, (err, user) => {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, false, { message: 'User does not exist in the database.'});
            }
            if (!user.validPassword(password)) {
                return callback(null, false, { message: 'Invalid password.'});
            }
            return callback(null, user);
        });
    }
));

var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey    = 'jwt_secret_token';

passport.use(new JWTStrategy(opts, (jwt_payload, callback) => {
    User.findOneById({id: jwt_payload._id}, (err, user) => {
      console.log(user, err)
        if (err) {
            return callback(err, false);
        }
        if (user) {
            return callback(null, user);
        } else {
            return callback(null, false);
            // or you could create a new account
        }
    });
}));