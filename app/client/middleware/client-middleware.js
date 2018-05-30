const passport = require('passport');

module.exports.authorizeAccess = (req, res, next) => {
  passport.authenticate('client-jwt', {session: false}, (err, client, info) => {
        if (err || !client) {
            return res.status(400).json({
                error: 'You are not authorized to access this route.'
            });
        }

        req.login(client, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            next();
        });
    })
    (req, res);
}