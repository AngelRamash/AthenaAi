// src/components/CourseDetails.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseMaterials, uploadCourseMaterial, getCourseEvents, createCourseEvent } from '../apiService';

interface User {
  name: string;
  role: string;
}

interface CourseDetailsProps {
  user: User;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ user }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const [materials, setMaterials] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    // Fetch course materials
    const fetchMaterials = async () => {
      const data = await getCourseMaterials(courseId);
      setMaterials(data);
    };
    fetchMaterials();

    // Fetch course events
    const fetchEvents = async () => {
      const data = await getCourseEvents(courseId);
      setEvents(data);
    };
    fetchEvents();
  }, [courseId]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        await uploadCourseMaterial(courseId, selectedFile);
        // Refresh materials list
        const data = await getCourseMaterials(courseId);
        setMaterials(data);
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      }
    }
  };

  // Handle event creation
  const handleCreateEvent = async () => {
    try {
      await createCourseEvent(courseId, newEvent);
      // Refresh events list
      const data = await getCourseEvents(courseId);
      setEvents(data);
      setNewEvent({ title: '', description: '', start_date: '', end_date: '' });
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Course Details</h1>

      {/* Materials Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Materials</h2>
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
          disabled={!selectedFile}
        >
          Upload
        </button>
        <ul className="mt-4">
          {materials.map((material) => (
            <li key={material.id} className="mb-2">
              {material.filename}
            </li>
          ))}
        </ul>
      </section>

      {/* Events Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Course Calendar Events</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="datetime-local"
            value={newEvent.start_date}
            onChange={(e) => setNewEvent({ ...newEvent, start_date: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="datetime-local"
            value={newEvent.end_date}
            onChange={(e) => setNewEvent({ ...newEvent, end_date: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={handleCreateEvent} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Event
          </button>
        </div>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-2">
              <strong>{event.title}</strong> - {new Date(event.start_date).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CourseDetails;
