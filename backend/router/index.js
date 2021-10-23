const Router = require('express').Router;
const router = new Router();
const authRouter  = require('./auth.router');
const postRouter = require('./post.router')

router.use('/auth', authRouter);
router.use('/post', postRouter);

module.exports = router;