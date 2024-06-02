"use client";
import React, { useEffect, useState } from "react";
import MessageNewPopUp from "./messagege-new-popup";
import { fetchMessages } from "@/app/apis/api-calls";

const Messages = () => {
  const [showNewMessagePopup, setShowNewMessagePopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    setLoading(true);
    try {
      const result: any = await fetchMessages();
      setMessages(result || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = () => {
    setShowNewMessagePopup(true);
  };

  const handleClosePopup = () => {
    setShowNewMessagePopup(false);
    getMessages(); // Fetch messages again when the popup is closed
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-400 text-white py-2 px-4 rounded"
          onClick={handleNewMessage}
        >
          New Message
        </button>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Read</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">From/To</th>
              <th className="border border-gray-300 p-2">Subject</th>
              <th className="border border-gray-300 p-2">Message</th>
              <th className="border border-gray-300 p-2">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message: any) => (
              <tr key={message.id}>
                <td className="border border-gray-300 p-2">{message.type}</td>
                <td className="border border-gray-300 p-2">
                  {message?.read ? "Read" : "Unread"}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(message?.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {message.from} / {message.to}
                </td>
                <td className="border border-gray-300 p-2">
                  {message.subject}
                </td>
                <td className="border border-gray-300 p-2">
                  {message.message}
                </td>
                <td className="border border-gray-300 p-2">
                  {message.attachment ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showNewMessagePopup && <MessageNewPopUp onClose={handleClosePopup} />}
    </div>
  );
};

export default Messages;
