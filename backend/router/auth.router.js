const Router = require('express').Router;
const authController = require('../controllers/auth.controller');
const router = new Router();
const {body} = require('express-validator');


router.post('/signup',
    body('name').isLength({min: 3, max: 32}),
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    authController.signup
);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);

module.exports = router;