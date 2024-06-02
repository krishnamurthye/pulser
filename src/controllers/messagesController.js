const { messageSQLModel } = require("../models");
const upload = require("../middleware/upload");

// Get all messages for the authenticated user
const getMessages = async (req, res) => {
  try {
    const authUser = req.authUser; // This is set by the middleware
    if (!authUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const messages = await messageSQLModel.findAll({
      where: { authUserId: authUser.id },
    });

    return res.status(200).json(messages);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving messages" });
  }
};

// Get a single message by ID
const getMessageById = async (req, res) => {
  try {
    const authUser = req.authUser;
    const { id } = req.params;

    const message = await messageSQLModel.findOne({
      where: { id, appUserId: authUser.id },
    });

    if (!message) {
      return res.status(404).json({ error: "message not found" });
    }

    return res.status(200).json(message);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the message" });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  try {
    const authUser = req.authUser;
    const { type, from, to, subject, message } = req.body;

    const newMessage = await messageSQLModel.create({
      type,
      from,
      to,
      subject,
      message,
      attachment: req.file.buffer, // Store the file buffer as BLOB
      authUserId: authUser.id,
    });

    return res.status(201).json(newMessage);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the message" });
  }
};

// Update a message
const updateMessage = async (req, res) => {
  try {
    const authUser = req.authUser;
    const { id } = req.params;
    const { type, from, to, subject, message, attachment } = req.body;

    const existingMessage = await messageSQLModel.findOne({
      where: { id, appUserId: authUser.id },
    });

    if (!existingMessage) {
      return res.status(404).json({ error: "message not found" });
    }

    existingMessage.type = type || existingMessage.type;
    existingMessage.from = from || existingMessage.from;
    existingMessage.to = to || existingMessage.to;
    existingMessage.subject = subject || existingMessage.subject;
    existingMessage.message = message || existingMessage.message;
    existingMessage.attachment = attachment || existingMessage.attachment;

    await existingMessage.save();

    return res.status(200).json(existingMessage);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the message" });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const authUser = req.authUser;
    const { id } = req.params;

    const message = await messageSQLModel.findOne({
      where: { id, appUserId: authUser.id },
    });

    if (!message) {
      return res.status(404).json({ error: "message not found" });
    }

    await message.destroy();

    return res.status(204).json({ message: "message deleted successfully" });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the message" });
  }
};

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
