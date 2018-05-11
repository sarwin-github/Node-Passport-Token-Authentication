const express  = require('express');
const router   = express();

const userController = require('../controller/user-controller');
const userMiddleware = require('../middleware/user-middleware');

/* login */
router.route('/login').get(userController.getLogin);
router.route('/login').post(userController.postLogin);

router.route('/signup').post(userController.signUp);
router.route('/profile').get(userMiddleware.authorizeAccess, userController.getProfile);

module.exports = router;
