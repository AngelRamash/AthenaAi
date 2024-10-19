// src/CourseCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: number;
  title: string;
  semester: string;
  image: string;
  percentageComplete: number;
  timeSpent: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  semester,
  image,
  percentageComplete,
  timeSpent,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={`${title} cover`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{semester}</p>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: `${percentageComplete}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{percentageComplete}% Complete</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">Time Spent: {timeSpent}</p>
        <div className="mt-4 flex justify-between">
          
          <button
            onClick={onEdit}
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
