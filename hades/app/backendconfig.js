// src/backendconfig.js
export const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://129.21.118.199:5000" ;
export const loginUrl = `${baseUrl}/auth/login`;
export const signupUrl = `${baseUrl}/auth/signup`;
export const logoutUrl = `${baseUrl}/auth/logout`;
export const studentdashboardUrl = `${baseUrl}/api/v1/dashboard/student-dashboard`;
export const teacherdashboardUrl = `${baseUrl}/api/v1/dashboard/teacher-dashboard`;