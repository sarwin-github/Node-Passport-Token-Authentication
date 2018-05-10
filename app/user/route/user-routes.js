const express = require('express');
const router  = express();

const userController = require('../controller/user-controller');

/* login */
router.route('/').get(userController.getLogin);
router.route('/').post(userController.postLogin);

module.exports = router;
