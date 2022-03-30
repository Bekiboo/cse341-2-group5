const express = require('express')
const { body } = require('express-validator')

const todoListController = require('../controllers/todoList')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /todoList/todo/:memberId
router.get('/todo/:todoId', isAuth, todoListController.getTodo)

// POST /todoList/todo
router.post(
  '/todo/:memberId',
  isAuth,
  //   [
  //     body('task').trim().isLength({ min: 4 }),
  //   ],
  todoListController.createTodo
)

router.patch('/todo/:todoId', todoListController.updateTodo)

router.delete('/todo/:todoId', isAuth, todoListController.deleteTodo)

module.exports = router
