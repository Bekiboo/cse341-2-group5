const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

//PUT
router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter valid email address.')
    .custom((value, { req }) => { //checks for existing email
        return User.findOne({email: value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('Email already exists.');
            }
        })
    }),
    // .normalizeEmail(), I commented out normalizeEmail because it removes dots from emails
    body('password')
    .trim()
    .isLength({min: 5}),
    body('name')
    .trim()
    .not()
    .isEmpty()
],
authController.signup
);

router.post('/login', authController.login);

router.get('/users', isAuth, authController.getUsers);

router.delete('/users/:userId', isAuth, authController.deleteUser)
// Logout route???

module.exports = router;