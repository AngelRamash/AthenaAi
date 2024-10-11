//react_router.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './ProtectedRoute';
import CourseDetails from './components/CourseDetails';
import StudentCourseMaterials from './components/StudentCourseMaterials';


interface User {
  name: string;
  role: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Example logic to retrieve the user from localStorage or an API
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          user ? <Navigate to="/dashboard" replace /> : <LoginForm />
        }
      />

      {/* Signup Route */}
      <Route
        path="/signup"
        element={
          user ? <Navigate to="/dashboard" replace /> : <SignupForm />
        }
      />

      {/* Dashboard Route - Protected Route */}
      <Route
        path="/dashboard"
        element={
          user ? <ProtectedRoute user={user} /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/courses/:courseId"
        element={
          user ? (
            user.role === 'teacher' ? (
              <CourseDetails user={user} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
