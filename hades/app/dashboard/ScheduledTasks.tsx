import React from 'react';

interface Task {
  id: number;
  title: string;
  time: string;
}

interface ScheduledTasksProps {
  tasks: Task[];
}

const ScheduledTasks: React.FC<ScheduledTasksProps> = ({ tasks }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Today's Schedule</h2>
      {tasks.length === 0 ? (
        <p>No tasks scheduled for today.</p>
      ) : (
        <ul className="list-disc ml-4">
          {tasks.map((task) => (
            <li key={task.id} className="mb-1">
              <strong>{task.title}</strong> at {task.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScheduledTasks;
