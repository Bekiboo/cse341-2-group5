const { validationResult } = require('express-validator')

const Family = require('../models/family')
const Todo = require('../models/todo')
const User = require('../models/user')

exports.getTodo = async (req, res, next) => {
  let todoId = req.params.todoId
  try {
    const todo = await Todo.findById(todoId)
    if (!todo) {
      const error = new Error('Could not find task.')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      message: 'Task fetched',
      todo: todo,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.createTodo = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect')
    error.statusCode = 422
    throw error
  }
  const task = req.body.task
  const memberId = req.params.memberId
  let doer
  const todo = new Todo({
    task: task,
    member: { _id: memberId },
  })
  todo
    .save()
    .then((result) => {
      return Family.findById(memberId)
    })
    .then((member) => {
      doer = member
      member.tasks.push(todo)
      return member.save()
    })
    .then((result) => {
      res.status(201).json({
        message: 'Todo created successfully',
        todo: {_id: todo._id, task: todo.task},
        doer: { _id: doer._id, name: doer.name },
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.todoId
  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = new Error('Could not find todo.')
        error.statusCode = 404
        throw error
      }
      // check logged in user
      task = todoId
      doer = todo.member
      return Todo.findByIdAndRemove(todoId)
    })
    .then((result) => {
      return Family.findById(doer)
    })
    .then((member) => {
      member.tasks.pull(task)
      return member.save()
    })
    .then((result) => {
      res.status(200).json({ message: 'Deleted todo.' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.updateTodo = (req, res, next) => {
  const todoId = req.params.todoId
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect')
    error.statusCode = 422
    throw error
  }
  console.log(req.body);
  const completed = req.body.completed
  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = new Error('Could not find todo.')
        error.statusCode = 404
        throw error
      }
      todo.completed = completed
      return todo.save()
    })
    .then((result) => {
      res.status(200).json({ message: 'Todo updated', todo: result })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
