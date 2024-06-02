const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo, getTodo} = require('../controllers/todos');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// Get Todos
router.get('/:todoId', isAuth, getTodo);

// Get Todos by UserId
router.get('/user/:userId', isAuth, getTodos);

// Get Todo
router.get('/', isAuth, getTodos);

// Create Todo
router.post('/', isAuth, createTodo);

// Update Todo
router.put('/:todoId', isAuth, updateTodo);

// Delete Todo
router.delete('/:todoId', isAuth, deleteTodo);

module.exports = router;
