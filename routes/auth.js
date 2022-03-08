const express = require('express');
const { body } = require('express-validator');

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
                return Promise.reject('Email alrady exists.');
            }
        })
    }), // I removed the normalizeEmail() because it removes dots from emails
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

module.exports = router;