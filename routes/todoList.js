const express = require('express')
const { body } = require('express-validator')

const todoListController = require('../controllers/todoList')
const isAuth = require('../middleware/is-auth');

const router = express.Router()

// GET /todoList/todos
router.get('/todos', isAuth, todoListController.getTodos);
// router.get('/todos', todoListController.getTodos);

// POST /todoList/todo
router.post(
  '/todo',
  isAuth,
//   [
//     body('task').trim().isLength({ min: 4 }),
//   ],
  todoListController.createTodo
)

router.put(
  '/todo/:todoId',
  // [
  //   body('title').trim().isLength({ min: 5 }),
  // ],
  todoListController.updateTodo
)

router.delete('/todo/:todoId', isAuth, todoListController.deleteTodo)






module.exports = router
