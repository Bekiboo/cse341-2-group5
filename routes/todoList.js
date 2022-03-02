const express = require('express')
const { body } = require('express-validator')

const todoListController = require('../controllers/todoList')

const router = express.Router()

// GET /todoList/todos
router.get('/todos', todoListController.getTodos)

// POST /todoList/todo
router.post(
  '/todo',
//   [
//     body('task').trim().isLength({ min: 4 }),
//   ],
  todoListController.createTodo
)

// router.put(
//   '/todo/:todoId',
//   [
//     body('title').trim().isLength({ min: 5 }),
//   ],
//   todoListController.updateTodo
// )

router.delete('/todo/:todoId', todoListController.deleteTodo)

module.exports = router
