// src/apiService.js
import axios from 'axios';
import { baseUrl } from './backendconfig';

// Create an axios instance with the base URL and default configuration
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // Set timeout to 10 seconds
});

// Request interceptor to add the Authorization header to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function for error handling
const handleError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        throw new Error("Invalid request. Please check your inputs.");
      case 401:
        throw new Error("Unauthorized. Please check your credentials.");
      case 403:
        throw new Error("Forbidden. You do not have permission to perform this action.");
      case 404:
        throw new Error("Resource not found.");
      case 409:
        throw new Error("Conflict. The resource already exists.");
      case 500:
        throw new Error("Server error. Please try again later.");
      default:
        throw new Error(error.response.data.message || "Operation failed.");
    }
  } else {
    throw new Error("Network error or server not reachable.");
  }
};

// Authentication Functions

// Signup function (updated to include role)
export const signup = async (name, email, password, role) => {
  try {
    const response = await axiosInstance.post('/auth/signup', { name, email, password, role });
    return response.data; // This will contain the access_token and other data if needed
  } catch (error) {
    handleError(error);
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data; // This contains the access_token and other data if needed
  } catch (error) {
    handleError(error);
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    return response.data; // This will contain the logout success message
  } catch (error) {
    handleError(error);
  }
};

// Course Management Functions

// Get all courses
export const getCourses = async () => {
  try {
    const response = await axiosInstance.get('/api/courses');
    return response.data; // Returns an array of courses
  } catch (error) {
    handleError(error);
  }
};

// Get events for all courses the student is enrolled in
export const getStudentEvents = async () => {
  try {
    const response = await axiosInstance.get('/api/student/events');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Create a new course
export const createCourse = async (courseData) => {
  try {
    const response = await axiosInstance.post('/api/courses', courseData);
    return response.data; // Returns the newly created course
  } catch (error) {
    handleError(error);
  }
};

// Update an existing course
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axiosInstance.put(`/api/courses/${courseId}`, courseData);
    return response.data; // Returns the updated course
  } catch (error) {
    handleError(error);
  }
};

// Delete a course
export const deleteCourse = async (courseId) => {
  try {
    const response = await axiosInstance.delete(`/api/courses/${courseId}`);
    return response.data; // Returns a success message
  } catch (error) {
    handleError(error);
  }
};

// Export the axios instance in case you need it elsewhere
export default axiosInstance;
