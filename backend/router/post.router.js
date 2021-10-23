const Router = require('express').Router;
const router = new Router()
const {body} = require('express-validator');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middlware');

router.get('/', postController.getAllPosts);
router.get('/user/:id',authMiddleware, postController.getAllPostsByUserId);
router.get('/:id', postController.getPost);
router.post(
    '/create', 
    authMiddleware,
    body('authorName')
      .notEmpty()
      .isLength({min: 3, max: 30})
      .withMessage('Is required field'),

    body('text')
      .notEmpty()
      .isLength({min: 30, max: 300})
      .withMessage('Is required, no shorter than 30 and no longer than 300 characters'),

    postController.createPost
)
router.patch(
    '/update', 
    authMiddleware,
    body('text')
    .notEmpty()
    .isLength({min: 30, max: 300})
    .withMessage('Is required, no shorter than 30 and no longer than 300 characters'),
        
    postController.updatePost
)
router.delete('/delete', authMiddleware, postController.deletePost)

module.exports = router;