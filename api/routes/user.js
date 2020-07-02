const express = require('express');
const router = express.Router();
const userCtrl = require('./../controllers/user.controller');
const middleWare = require('./../middleware/auth.middleware');

/**
 * @swagger
 * /api/user/test:
 *  get:
 *      description: get all users
 *      response:
 *          '200':
 *              description: List of users
 */
router.post('/', userCtrl.signUpUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;
