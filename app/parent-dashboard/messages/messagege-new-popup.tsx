"use client";
import React, { useState } from "react";

const MessageNewPop = ({ onClose }: any) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    message: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSend = () => {
    // Logic to send message
    console.log("Sending message:", formData);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">New Message</h2>
        <div className="mb-4">
          <label htmlFor="from" className="block mb-2">
            From
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* To input field */}
        <div className="mb-4">
          <label htmlFor="to" className="block mb-2">
            To
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* Date display field */}
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
        {/* Attachments */}
        <div className="mb-4">
          <label className="block mb-2">Attachments</label>
          {/* Add attachment button */}
          <button className="bg-green-400 text-white px-4 py-2 rounded">
            Add Attachment
          </button>
        </div>
        {/* Message text area */}
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button onClick={handleClose} className="px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="bg-green-400 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageNewPop;
