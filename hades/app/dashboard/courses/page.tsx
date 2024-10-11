"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../Layout';

interface Course {
  id: number;
  title: string;
  semester: string;
  image: string;
  description: string;
}

const sampleCourses: Course[] = [
  { id: 1, title: 'MATH.241 - Linear Algebra', semester: '2241 Fall', image: '/images/course1.jpg', description: 'A detailed study of linear equations, matrices, and vector spaces.' },
  { id: 2, title: 'CSCI.99 - Undergraduate Co-op Seminar', semester: '2241 Fall', image: '/images/course2.jpg', description: 'A seminar focused on career preparation and co-op opportunities.' },
  { id: 3, title: 'BIOL.103 - General Biology I Lab', semester: '2241 Fall', image: '/images/course3.jpg', description: 'Introduction to the lab practices in biology, covering various biological systems.' },
  // More course data as needed
];

const CourseDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Retrieve the course ID from the URL
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id) {
      // Find the course by ID
      const foundCourse = sampleCourses.find((c) => c.id === parseInt(id as string, 10));
      setCourse(foundCourse || null);
    }
  }, [id]);

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold">Course Not Found</h1>
          <p>The course you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-gray-700 mb-4">{course.semester}</p>
        <p className="mb-6">{course.description}</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </Layout>
  );
};

export default CourseDetail;
