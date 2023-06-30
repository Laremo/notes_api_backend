const express = require('express');
const loginController = require('../controllers/login.Controller');
const router = express();

router.post('/', loginController.signIn);

module.exports = router;
