const Todo = require("../models/todo");

exports.getTodos = (req, res, next) => {
  Todo.findAll()
    .then((todos) => {
      res.status(200).json({ todos: todos });
    })
    .catch((err) => console.log(err));
};

exports.getTodos = (req, res, next) => {
  const userId = req.params.userId; 
  Todo.findAll({
    where: {
      userId: userId,
    }
  })
    .then((todos) => {
      res.status(200).json({ todos: todos });
    })
    .catch((err) => console.log(err));
};

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

exports.createTodo = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.body.userId;
  Todo.create({
    title: title,
    description: description,
    userId: userId,
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

exports.updateTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedUserId = req.body.userId;
  Todo.findByPk(todoId)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ message: "ToDo not found!" });
      }
      todo.title = updatedTitle;
      todo.description = updatedDescription;
      todo.userId = updatedUserId;
      return todo.save();
    })
    .then((result) => {
      res.status(200).json({ message: "ToDo updated!", todo: result });
    })
    .catch((err) => console.log(err));
};

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
