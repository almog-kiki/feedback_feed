const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/post.controller');

router.get('/getPosts', post_controller.getPosts);
router.post('/create', post_controller.post_create);

module.exports = router;