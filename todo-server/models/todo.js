const Sequelize = require("sequelize");
const db = require("../util/database");

const Todo = db.define("todo", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Todo;
