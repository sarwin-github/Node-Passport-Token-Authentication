const express   = require('express');
const csrf      = require('csurf');
const router    = express();

const userController = require('../controller/user-controller');
const userMiddleware = require('../middleware/user-middleware');

/* login */
router.route('/login').get(userController.getLogin);
router.route('/login').post(userController.postLogin);

router.route('/signup').get(userController.getSignUp);
router.route('/signup').post(userController.signUp);

router.route('/profile').get(userMiddleware.authorizeAccess, userController.getProfile);

router.route('/logout').get(userController.getLogout);

module.exports = router;
