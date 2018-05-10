const express  = require('express');
const router   = express();
const passport = require('passport');
const userController = require('../controller/user-controller');

require('../config/passport');

/* login */
router.route('/login').get(userController.getLogin);
router.route('/login').post(userController.postLogin);

router.route('/profile').get(passport.authenticate('jwt', {session: false}), userController.getProfile);

module.exports = router;
