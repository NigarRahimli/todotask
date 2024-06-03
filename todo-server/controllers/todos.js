const Todo = require("../models/todo");

// Get all todos, optionally filtered by completion status
exports.getTodos = (req, res, next) => {
  const userId = req.params.userId;
  const isCompleted = req.query.isCompleted; // Fetch isCompleted from query parameters
  const whereCondition = { userId: userId };

  // If isCompleted is provided, add it to the where condition
  if (isCompleted !== undefined) {
    whereCondition.isCompleted = isCompleted;
  }

  Todo.findAll({
    where: whereCondition
  })
    .then((todos) => {
      res.status(200).json({ todos: todos });
    })
    .catch((err) => console.log(err));
};

// Get a single todo by ID
exports.getTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findByPk(todoId)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ message: "ToDo not found!" });
      }
      res.status(200).json({ todo: todo });
    })
    .catch((err) => console.log(err));
};

// Create a new todo
exports.createTodo = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.body.userId;
  Todo.create({
    title: title,
    description: description,
    userId: userId,
    isCompleted: false // By default, new todos are not completed
  })
    .then((result) => {
      console.log("Created ToDo");
      res.status(201).json({
        message: "ToDo created successfully!",
        todo: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update an existing todo
exports.updateTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedUserId = req.body.userId;
  const isCompleted = req.body.isCompleted; // Optionally update completion status

  Todo.findByPk(todoId)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ message: "ToDo not found!" });
      }
      // Update todo attributes
      todo.title = updatedTitle;
      todo.description = updatedDescription;
      todo.userId = updatedUserId;
      // If isCompleted is provided in the request body, update it
      if (isCompleted !== undefined) {
        todo.isCompleted = isCompleted;
      }
      return todo.save();
    })
    .then((result) => {
      res.status(200).json({ message: "ToDo updated!", todo: result });
    })
    .catch((err) => console.log(err));
};

// Delete a todo
exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findByPk(todoId)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ message: "ToDo not found!" });
      }
      return Todo.destroy({
        where: {
          id: todoId,
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "ToDo deleted!" });
    })
    .catch((err) => console.log(err));
};
