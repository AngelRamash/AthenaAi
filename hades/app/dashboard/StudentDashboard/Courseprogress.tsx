import React from 'react';
import { FaClock, FaExclamationCircle } from 'react-icons/fa';

interface CourseProgressProps {
  percentageComplete: number;
  timeSpent: string;
  upcomingDeadlines: { title: string; dueDate: string }[];
}

const CourseProgress: React.FC<CourseProgressProps> = ({ percentageComplete, timeSpent, upcomingDeadlines }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Course Progress</h2>

      {/* Progress Bar */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Completion</label>
        <div className="w-full bg-gray-300 rounded-lg overflow-hidden h-6">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${percentageComplete}%` }}
          ></div>
        </div>
        <p className="mt-2 text-right">{percentageComplete}% Complete</p>
      </div>

      {/* Time Spent */}
      <div className="flex items-center mb-4">
        <FaClock className="text-blue-500 text-xl mr-2" />
        <p className="text-lg font-medium">Time Spent: {timeSpent}</p>
      </div>

      {/* Upcoming Deadlines */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Upcoming Deadlines</h3>
        {upcomingDeadlines.length === 0 ? (
          <p>No upcoming deadlines.</p>
        ) : (
          <ul className="list-disc ml-6">
            {upcomingDeadlines.map((deadline, index) => (
              <li key={index} className="mb-1">
                <FaExclamationCircle className="inline-block text-red-500 mr-1" /> {deadline.title} - {deadline.dueDate}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseProgress;
