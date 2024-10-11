"use client"
import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import ScheduledTasks from '../ScheduledTasks';
import CalendarWidget from '../CalendarWidget';
import CourseCard from '../CourseCard';


interface Course {
  id: number;
  title: string;
  semester: string;
  image: string;
  description: string;
  percentageComplete: number;
  timeSpent: string;
  upcomingDeadlines: { title: string; dueDate: string }[];
}

interface User {
  name: string;
  role: string;
}

interface Task {
  id: number;
  title: string;
  time: string;
}

interface StudentDashboardProps {
  user?: User; // Allow user to be optional
}

const courses: Course[] = [
  {
    id: 1,
    title: 'MATH.241 - Linear Algebra',
    semester: '2241 Fall',
    image: '/images/course1.jpg',
    description: 'A detailed study of linear equations, matrices, and vector spaces.',
    percentageComplete: 75,
    timeSpent: '12 hours',
    upcomingDeadlines: [
      { title: 'Assignment 3', dueDate: 'October 10, 2024' },
      { title: 'Midterm Exam', dueDate: 'October 15, 2024' },
    ],
  },
  {
    id: 2,
    title: 'CSCI.99 - Undergraduate Co-op Seminar',
    semester: '2241 Fall',
    image: '/images/course2.jpg',
    description: 'A seminar focused on career preparation and co-op opportunities.',
    percentageComplete: 40,
    timeSpent: '5 hours',
    upcomingDeadlines: [],
  },
  // More course data as needed
];

const tasks: Task[] = [
  { id: 1, title: 'Linear Algebra Lecture', time: '9:00 AM' },
  { id: 2, title: 'Computer Science Seminar', time: '11:00 AM' },
  { id: 3, title: 'Biology Lab', time: '2:00 PM' },
];

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [quote, setQuote] = useState<string>('');

  // Fetch a random quote on every refresh
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuote(data.content);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote('Believe you can and you’re halfway there. - Theodore Roosevelt');
      }
    };
    fetchQuote();
  }, []);

  // Handle viewing the full calendar
  const handleViewFullCalendar = () => {
    alert('Redirect to the full calendar view');
  };

 

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, Hades!</h1>
        <p className="mb-4 text-lg italic text-gray-600">"{quote}"</p>

        {/* Scheduled Tasks and Calendar Widget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ScheduledTasks tasks={tasks} />
          <CalendarWidget onViewFullCalendar={handleViewFullCalendar} />
        </div>

        {/* Ongoing Courses Section with Course Cards and Progress */}
        <h2 className="text-2xl font-bold mb-4">Ongoing Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              semester={course.semester}
              image={course.image}
              percentageComplete={course.percentageComplete}
              timeSpent={course.timeSpent}
            />
          ))}
        </div>

        {/* Other Dashboard Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">User Profile</h2>
            <p>View and edit your profile information.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p>Manage your application settings and preferences.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
