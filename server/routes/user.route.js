const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

router.post('/getLastActive', user_controller.getLastActive);

module.exports = router;