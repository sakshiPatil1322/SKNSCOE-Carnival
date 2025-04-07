import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import EventRegistrationModal from "../components/EventRegistrationModel";

const Homepage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      url: "/images/clg1.JPG",
      heading: "Skn Sinhgad College of Engineering Korti , Pandharpur",
      description: 'Accredited by NBA (UG Programmes - Civil , E&TC , Mech) & NAAC with "A+" Grade',
      buttonText: "Explore Events",
      buttonLink: "#events",
    },
    {
      url: "/images/clg2.JPG",
      heading: "Skn Sinhgad College of Engineering Korti , Pandharpur",
      description: 'Accredited by NBA (UG Programmes - Civil , E&TC , Mech) & NAAC with "A+" Grade',
      buttonText: "Explore Events",
      buttonLink: "#events",
    }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/student/ongoing`
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] sm:h-[70vh] xs:h-[60vh] overflow-hidden mt-5 shadow-2xl rounded-2xl">
        {/* Dark Bottom Gradient Shadow */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10" />

        {heroImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-0"
              }`}
            style={{
              backgroundImage: `url(${slide.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Centered content */}
            <div className="w-full h-full flex items-center justify-center px-2 sm:px-4">
              <div className="w-full max-w-4xl bg-[#000000cc] flex flex-col items-center justify-center text-white text-center rounded-2xl shadow-2xl p-4 sm:p-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                  {slide.heading}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-6">{slide.description}</p>
                <a
                  href={slide.buttonLink}
                  style={{ textDecoration: 'none' }}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full text-lg transition-all duration-300 shadow-md p-5 no-underline"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Main Content */}
      <div
        id="events"
        className="flex flex-col lg:flex-row gap-6 p-6 mt-5 h-screen"
      >
        {/* Events Section */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-center mt-5">
            Ongoing Events
          </h2>
          <div className="flex-1 overflow-y-auto hide-scrollbar pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                  >
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <p className="text-sm text-gray-600">Type: {event.type}</p>
                    <p className="text-sm text-gray-600">
                      Category: {event.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Guide: {event.guide?.name || "Not Assigned"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ends on: {new Date(event.endDate).toDateString()}
                    </p>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600 w-full"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Register
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No ongoing events available.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-center mt-5">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto hide-scrollbar pr-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="aspect-square bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-500"
              >
                Image {num}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Event Registration */}
      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </Layout>
  );
};

export default Homepage;
