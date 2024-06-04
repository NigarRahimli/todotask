import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import Welcome from './components/Welcome';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
