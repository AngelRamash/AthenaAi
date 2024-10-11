// src/components/StudentCourseMaterials.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseMaterials } from '../apiService';

interface User {
  name: string;
  role: string;
}

interface StudentCourseMaterialsProps {
  user: User;
}

const StudentCourseMaterials: React.FC<StudentCourseMaterialsProps> = ({ user }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const [materials, setMaterials] = useState<any[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await getCourseMaterials(courseId);
        setMaterials(data);
      } catch (error) {
        console.error('Error fetching materials:', error);
        alert('Failed to fetch materials.');
      }
    };
    fetchMaterials();
  }, [courseId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Course Materials</h1>
      <ul>
        {materials.map((material) => (
          <li key={material.id} className="mb-2">
            <a
              href={`/api/materials/${material.id}/download`}
              className="text-blue-600 underline"
            >
              {material.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentCourseMaterials;
