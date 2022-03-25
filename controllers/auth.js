const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.signup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPass,
      })
      return user.save()
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: 'User created successfully!', userId: result._id })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.login = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  let loadedUser
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error('User not found')
        error.statusCode = 401
        throw error
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong Password')
        error.statusCode = 401
        throw error
      }
      const token = jwt.sign(
        {
          name: loadedUser.name,
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        'secretGroupsecret',
        { expiresIn: '1h' }
      );
      // console.log(loadedUser.name);
      // console.log(loadedUser.email);
      // console.log(loadedUser._id);
      // console.log(token);
      console.log('success')
      res.status(200).json({ token: token, userId: loadedUser._id.toString() })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: 'Fetched users successfully',
        users: users,
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find todo.')
                error.statusCode = 404
                throw error
      }
      return User.findByIdAndRemove(userId);
    })
    .then(result => {
      console.log(result)
      res.status(200).json({message : 'Deleted user.'})
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}