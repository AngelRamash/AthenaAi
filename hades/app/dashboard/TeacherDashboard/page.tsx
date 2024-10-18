"use client";
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import CourseCard from "../CourseCard";
import UploadCourseImage from "./UploadCourseImage";
import { v4 as uuidv4 } from "uuid";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "/Pandora-s-Box/hades/app/apiService";

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
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const [courseForm, setCourseForm] = useState({
    title: "",
    semester: "",
    image: "/images/default.jpg",
  });

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to fetch courses.");
      }
    };
    fetchCourses();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setCourseForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveCourse = async () => {
    const { title, semester, image } = courseForm;

    if (!title || !semester) {
      alert("Please fill in all fields.");
      return;
    }

    const courseData = {
      title,
      semester,
      image,
      percentageComplete: 0,
      timeSpent: "0 hours",
    };

    setLoading(true);

    try {
      if (editingCourseId) {
        const updatedCourse = await updateCourse(editingCourseId, courseData);
        setCourses((prev) =>
          prev.map((course) =>
            course.id === editingCourseId ? updatedCourse : course
          )
        );
      } else {
        const newCourse = await createCourse({
          ...courseData,
          id: uuidv4(),
        });
        setCourses((prev) => [...prev, newCourse]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save the course.");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setCourseForm({ title: "", semester: "", image: "/images/default.jpg" });
    setEditingCourseId(null);
    setShowForm(false);
  };

  const handleEditCourse = (course: Course) => {
    setCourseForm({
      title: course.title,
      semester: course.semester,
      image: course.image,
    });
    setEditingCourseId(course.id);
    setShowForm(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        setCourses((prev) => prev.filter((course) => course.id !== courseId));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete the course.");
      }
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>

        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
        >
          {editingCourseId ? "Edit Course" : "Create New Course"}
        </button>

        {showForm && (
          <div className="relative mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingCourseId ? "Edit Course" : "Create New Course"}
            </h2>
            <button
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
              onClick={resetForm}
            >
              X
            </button>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Course Title
              </label>
              <input
                type="text"
                value={courseForm.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter Course Title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Semester
              </label>
              <input
                type="text"
                value={courseForm.semester}
                onChange={(e) => handleInputChange("semester", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter Semester"
              />
            </div>

            <UploadCourseImage
              onImageUpload={(image) => handleInputChange("image", image)}
            />

            <button
              onClick={handleSaveCourse}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingCourseId
                ? "Save Changes"
                : "Create Course"}
            </button>
          </div>
        )}

        {/* Course Analytics & Reporting Section */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Course Analytics & Reporting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Course Completion Tracking</h3>
            <p className="mt-2 text-gray-700">
              Track how much of the course students have completed, both for individual students and the class as a whole.
            </p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Feedback & Surveys</h3>
            <p className="mt-2 text-gray-700">
              Add the ability for teachers to collect feedback from students about the course. Use this feedback to improve future courses.
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Progress Reports</h3>
            <p className="mt-2 text-gray-700">
              Automatically generate progress reports for students. Teachers can review these reports and share them with students or parents.
            </p>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
