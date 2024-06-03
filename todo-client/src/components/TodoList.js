import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/todos/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Todos response:", response.data);
        setTodos(response.data.todos); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError("Error fetching todos. Please try again later.");
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId')
    try {
      const response = await axios.post(
        `http://localhost:3000/todos/`, 
        { title: newTodo,
          userId:userId
         },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
 
      setTodos((prevTodos) => [...prevTodos, response.data.todo]); 
      setNewTodo("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("You are not authenticated. Please log in again.");
      } else {
        console.error("Error adding todo:", error);
      }
    }
  };

  return (
    <div>
      <h2>Todos</h2>
      {loading ? (
        <p>Loading todos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </>
      )}
    </div>
  );
};

export default TodoList;
