const Message = require("../models/message");
const User = require("../models/user");

exports.sendMessage = async ({ chatId, senderId, content }) => {
  const message = await Message.create({
    chatId,
    senderId,
    content,
    seenBy: [senderId], // sender has seen their own message
  });

  // Optionally populate sender data
  return await Message.findByPk(message.id, {
    include: [{ model: User, attributes: ["id", "firstName","lastName", "role", "email", "profilePicture"], as:"sender" }],
  });
};

exports.getMessagesByChat = async (chatId) => {
  return await Message.findAll({
    where: { chatId },
    order: [["sentAt", "ASC"]],
    include: [{ model: User, attributes: ["id", "name", "email"] }],
  });
};
