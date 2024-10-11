"use client"
import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import CourseCard from '../CourseCard';
import UploadCourseImage from './UploadCourseImage';
import { v4 as uuidv4 } from 'uuid'; // For unique course IDs
import { getCourses, createCourse, updateCourse, deleteCourse } from '/Pandora-s-Box/hades/app/apiService'; // API service functions

interface Course {
  id: string;
  title: string;
  semester: string;
  image: string;
  percentageComplete: number;
  timeSpent: string;
}

const TeacherDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [newCourseTitle, setNewCourseTitle] = useState<string>('');
  const [newCourseSemester, setNewCourseSemester] = useState<string>('');
  const [newCourseImage, setNewCourseImage] = useState<string>('/images/default.jpg');
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch courses from the backend when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert('Failed to fetch courses.');
      }
    };
    fetchCourses();
  }, []);

  // Function to handle course creation or update
  const handleSaveCourse = async () => {
    if (!newCourseTitle || !newCourseSemester) {
      alert("Please fill in all fields.");
      return;
    }

    const courseData = {
      title: newCourseTitle,
      semester: newCourseSemester,
      image: newCourseImage,
      percentageComplete: 0,
      timeSpent: '0 hours',
    };

    setLoading(true);

    try {
      if (editingCourseId) {
        // Update an existing course
        const updatedCourse = await updateCourse(editingCourseId, courseData);
        setCourses(
          courses.map(course => (course.id === editingCourseId ? updatedCourse : course))
        );
      } else {
        // Create a new course
        const newCourse = await createCourse(courseData);
        setCourses([...courses, newCourse]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving course:", error);
      alert('Failed to save the course.');
    }

    setLoading(false);
  };

  const resetForm = () => {
    setNewCourseTitle('');
    setNewCourseSemester('');
    setNewCourseImage('/images/default.jpg');
    setEditingCourseId(null);
    setShowForm(false);
  };

  // Function to edit a course
  const handleEditCourse = (course: Course) => {
    setNewCourseTitle(course.title);
    setNewCourseSemester(course.semester);
    setNewCourseImage(course.image);
    setEditingCourseId(course.id);
    setShowForm(true);
  };

  // Function to delete a course
  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        setCourses(courses.filter(course => course.id !== courseId));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert('Failed to delete the course.');
      }
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>

        {/* Button to open course creation form */}
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
        >
          {editingCourseId ? "Edit Course" : "Create New Course"}
        </button>

        {/* Conditionally render the course creation/edit form */}
        {showForm && (
          <div className="relative mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{editingCourseId ? "Edit Course" : "Create New Course"}</h2>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
              onClick={resetForm}
            >
              X
            </button>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Course Title</label>
              <input
                type="text"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter Course Title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Semester</label>
              <input
                type="text"
                value={newCourseSemester}
                onChange={(e) => setNewCourseSemester(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter Semester"
              />
            </div>

            {/* Upload Image Component */}
            <UploadCourseImage onImageUpload={setNewCourseImage} />

            {/* Save Course Button */}
            <button
              onClick={handleSaveCourse}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : editingCourseId ? "Save Changes" : "Create Course"}
            </button>
          </div>
        )}

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              semester={course.semester}
              image={course.image}
              percentageComplete={course.percentageComplete}
              timeSpent={course.timeSpent}
              onEdit={() => handleEditCourse(course)}
              onDelete={() => handleDeleteCourse(course.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
