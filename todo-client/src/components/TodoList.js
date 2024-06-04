import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; 

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/todos/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data.todos); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError("User not found."); 
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(
        `http://localhost:3000/todos/`, 
        { title: newTodo, userId: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos((prevTodos) => [...prevTodos, response.data.todo]); // Add to the bottom
      setNewTodo("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("You are not authenticated. Please log in again.");
      } else {
        console.error("Error adding todo:", error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditTodo = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoTitle(todo.title);
  };

  const handleSaveEdit = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, { title: editTodoTitle }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, title: editTodoTitle } : todo)));
      setEditTodoId(null);
      setEditTodoTitle("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditTodoTitle("");
  };

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/register'); 
  };

  return (
    <div className="max-w-xl mx-auto p-5 rounded-lg bg-gray-100 shadow-md">
      
      {loading ? (
        <>       
        <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-gray-700">Todos</h2>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>
        <p className="text-center text-lg text-gray-600">Loading todos...</p>
        </>
      ) : error ? ( 
        <div className="m-[100px] text-center text-lg text-black-500">
          <p>{error}</p>
          <p>You can return to <a className=" text-blue-600" href="/"> Welcome Page</a></p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-gray-700">Todos</h2>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>
          <div className="flex justify-center mb-5">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg flex-grow mr-2"
              placeholder="New Todo"
            />
            <button onClick={handleAddTodo} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Add Todo
            </button>
          </div>
          <ul className="list-none p-0">
            {todos.map((todo) => (
              <li key={todo.id} className="bg-white mb-2.5 p-3 rounded-lg border border-gray-300 flex justify-between items-center">
                {editTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editTodoTitle}
                    onChange={(e) => setEditTodoTitle(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg flex-grow mr-2"
                  />
                ) : (
                  <span>{todo.title}</span>
                )}
                <div className="flex">
                  {editTodoId === todo.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(todo.id)} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Save
                      </button>
                      <button onClick={handleCancelEdit} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditTodo(todo)} className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteTodo(todo.id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoList;
