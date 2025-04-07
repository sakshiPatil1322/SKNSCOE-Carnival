import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/events/get-all-event`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/events/delete-event/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  return (
    <Layout>
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold m-up p-3">Event Management</h2>
        <table className="w-[80%] border-collapse border border-gray-200 text-center shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Event Coordinator</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-b">
                <td className="border p-2">{event.name}</td>
                <td className="border p-2">{event.type}</td>
                <td className="border p-2">{event.category}</td>
                <td className="border p-2">{event.guide?.name || "N/A"}</td>
                <td className="border p-2 text-center">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/update-event/${event._id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ManageEvents;
