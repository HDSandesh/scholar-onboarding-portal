const messageService = require("../services/messageService");

exports.getMessagesByChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await messageService.getMessagesByChat(chatId);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
