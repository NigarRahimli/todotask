import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Todos response:", response.data);
        setTodos(response.data.todos); // Extract the todos array from the response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError("Error fetching todos. Please try again later.");
        setLoading(false);
      }
    };

    fetchTodos();
  }, [token]);

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/todos",
        { title: newTodo, userId: 1 }, // Pass userId directly in the object
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update the todos state to include the new todo immediately
      setTodos((prevTodos) => [...prevTodos, response.data.todo]); // Use response.data.todo to access the newly created todo
      setNewTodo("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("You are not authenticated. Please log in again.");
        // Handle authentication error, e.g., redirect to login page
      } else {
        console.error("Error adding todo:", error);
        // Handle other errors
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
