const express   = require('express');
const csrf      = require('csurf');
const router    = express();

const clientController = require('../controller/client-controller');
const clientMiddleware = require('../middleware/client-middleware');

/* login */
router.route('/login').get(clientController.getLogin);
router.route('/login').post(clientController.postLogin);

router.route('/signup').get(clientController.getSignUp);
router.route('/signup').post(clientController.signUp);

router.route('/profile').get(clientMiddleware.authorizeAccess, clientController.getProfile);
router.route('/logout').get(clientController.getLogout);

module.exports = router;
