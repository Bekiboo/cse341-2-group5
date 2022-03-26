const { validationResult } = require('express-validator')

const Family = require('../models/family');
const Todo = require('../models/todo');
const User = require('../models/user');

exports.getTodos = (req, res, next) => {
    const query = {};
    query.creator = req.userId;
    console.log(JSON.stringify(query));
  Todo.find(query)
    .then((todos) => {
      console.log(JSON.stringify(todos));
      res.status(200).json({
        message: 'Fetched todos successfully',
        todos: todos,
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.createTodo = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect')
    error.statusCode = 422
    throw error
  }
  console.log(req.body);
  const task = req.body.task;
  let doer;
  const todo = new Todo({
    task: task,
    // creator: { id: req.userId },
    creator: req.userId,
    // doer: { _id: '62353512c76c1caf0c4aaae2', name: 'John'}
    doer: { _id: '623e594c3681eb8bf876ef61'}
  })
  todo
    .save()
    .then(result => {
      return Family.findById('623e594c3681eb8bf876ef61');
    })
    .then(member => {
      doer = member;
      member.tasks.push(todo);
      return member.save();
    })
    .then((result) => {
      res.status(201).json({
        message: 'Todo created successfully',
        todo: result,
        doer: {_id: doer._id, name: doer.name}
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
      doer = todo.doer;
      return Todo.findByIdAndRemove(todoId);
    })
    .then(result => {
      //
      // console.log(JSON.stringify(doer))
      //
      return Family.findById(doer);
    })
    .then(member => {
      console.log(JSON.stringify(member))
      console.log(JSON.stringify(task))
      member.tasks.pull(task);
      return member.save();
    })
    .then(result => {
      console.log(result)
      res.status(200).json({message : 'Deleted todo.'})
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
  const task = req.body.task
  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = new Error('Could not find todo.')
        error.statusCode = 404
        throw error
      }
      todo.task = task
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