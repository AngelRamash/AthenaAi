import React from 'react';
import { Navigate } from 'react-router-dom';
import TeacherDashboard from './dashboard/TeacherDashboard/page';
import StudentDashboard from './dashboard/StudentDashboard/page';

interface User {
  name: string;
  role: string;
}

interface ProtectedRouteProps {
  user: User;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user }) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Determine which dashboard to render based on user role
  switch (user.role) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'student':
      return <StudentDashboard user={user} />;
    default:
      // Redirect to login if role is unknown
      return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
