"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon (optional)
const customMarker = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [32, 32],
});

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setResponseMessage(result.message || 'Something went wrong, please try again.');
  };

  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-20 px-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-8 md:mb-10 lg:mb-12">
        Contact Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-96">
          <MapContainer
            center={[9.026, 38.7439]}
            zoom={13}
            className="w-full h-full rounded-lg shadow-md"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]} icon={customMarker}>
              <Popup>Your location</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows={4}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
          {responseMessage && <p className="mt-4 text-green-500">{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
