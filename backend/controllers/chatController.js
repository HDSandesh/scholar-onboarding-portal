const chatService = require("../services/chatService");

exports.createChat = async (req, res) => {
  try {
    const creatorId = req.user?.id;
    const chat = await chatService.createChat({
      ...req.body,
      creatorId,
    });

    res.status(201).json(chat);
  } catch (err) {
    console.error("Create chat error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getChatsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await chatService.getChatsByUser(userId);
    res.status(200).json(chats);
  } catch (err) {
    console.error("Get user chats error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getChatById = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await chatService.getChatById(chatId);
    res.status(200).json(chat);
  } catch (err) {
    console.error("Get chat by ID error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.addParticipant = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const updated = await chatService.addParticipant(chatId, userId);
    res.status(200).json(updated);
  } catch (err) {
    console.error("Add participant error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.removeParticipant = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const updated = await chatService.removeParticipant(chatId, userId);
    res.status(200).json(updated);
  } catch (err) {
    console.error("Remove participant error:", err);
    res.status(500).json({ error: err.message });
  }
};
