import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext"; // replaced with Firebase version below
import Home from "./pages/Home";            // new landing page
import Dashboard from "./pages/Dashboard";  // your Sidebar + TaskList
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <TodoProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TodoProvider>
  );
};

export default App;
