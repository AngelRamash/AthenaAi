import React from 'react';

interface CourseSummaryProps {
  title: string;
  percentageComplete: number;
  timeSpent: string;
}

const CourseSummary: React.FC<CourseSummaryProps> = ({ title, percentageComplete, timeSpent }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-300 rounded-lg overflow-hidden h-4">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${percentageComplete}%` }}
          ></div>
        </div>
        <p className="mt-2 text-right text-sm">{percentageComplete}% Complete</p>
      </div>

      {/* Time Spent */}
      <p className="text-gray-700">
        <strong>Time Spent:</strong> {timeSpent}
      </p>
    </div>
  );
};

export default CourseSummary;
