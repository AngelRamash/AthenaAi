// src/CalendarWidget.tsx

import React, { useState, useEffect } from 'react';
import { getStudentEvents } from '/Pandora-s-Box/hades/app/apiService';

const CalendarWidget: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getStudentEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to fetch events.');
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2">
            <strong>{event.title}</strong> - {new Date(event.start_date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarWidget;
