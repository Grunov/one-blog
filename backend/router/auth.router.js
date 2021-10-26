const Router = require('express').Router;
const authController = require('../controllers/auth.controller');
const router = new Router();
const {body} = require('express-validator');


router.post('/signup',
    body('name')
    .isLength({min: 5, max: 32})
    .withMessage('Is required, no shorter than 5 and no longer than 32 characters'),
    body('email')
    .isEmail()
    .withMessage('Is required, field must be correct email'),
    body('password')
    .isLength({min: 5, max: 32})
    .withMessage('Is required, no shorter than 5 and no longer than 32 characters'),
    authController.signup
);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);

module.exports = router;