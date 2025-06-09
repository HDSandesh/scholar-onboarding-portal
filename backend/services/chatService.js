const Chat = require("../models/chat");
const ChatParticipant = require("../models/chatParticipant");
const Message = require("../models/message");
const User = require("../models/user");
const { Op, literal } = require("sequelize");

exports.createChat = async ({ isGroup, name, participantIds = [], creatorId }) => {
    // Ensure creator is included
    const allParticipantIds = new Set(participantIds);
    allParticipantIds.add(creatorId);
    const userIds = [...allParticipantIds];
  
    if (!isGroup && userIds.length === 2) {
      // Try to find existing one-to-one chat
      const existingChats = await Chat.findAll({
        where: {
          isGroup: false,
        },
        include: [{
          model: ChatParticipant,
          as: 'chatParticipants',
          attributes: ['userId'],
        }]
      });
  
      for (let chat of existingChats) {
        const existingUserIds = chat.chatParticipants.map(p => p.userId).sort();
        const inputUserIds = userIds.slice().sort();
  
        const isSameParticipants = JSON.stringify(existingUserIds) === JSON.stringify(inputUserIds);
        if (isSameParticipants) {
          return chat; // return existing chat if same users
        }
      }
    }
  
    // Create new chat
    const chat = await Chat.create({ isGroup, name });
  
    const participants = userIds.map((userId) => ({
      chatId: chat.id,
      userId,
    }));
  
    await ChatParticipant.bulkCreate(participants);
  
    return chat;
  };
  

  exports.getChatsByUser = async (userId) => {
    const chats = await Chat.findAll({
      include: [
        {
          model: ChatParticipant,
          as: "chatParticipants",
          where: {
            userId: { [Op.ne]: userId }, // Get participants other than the current user
          },
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "firstName","lastName", "email", "role"], // Add any fields you need
            },
          ],
        },
      ],
      // Ensure the chat actually includes the current user as a participant
      where: {
        "$chatParticipants.chatId$": {
          [Op.in]: literal(`(
            SELECT "chatId" FROM "ChatParticipants" WHERE "userId" = '${userId}'
          )`),
        },
      },
      order: [["updatedAt", "DESC"]],
    });
  
    // Add unread count
    for (let chat of chats) {
      const unreadCount = await Message.count({
        where: {
          chatId: chat.id,
          sentAt: { [Op.lt]: new Date() },
          // Uncomment if using seenBy field
          // seenBy: { [Op.notILike]: `%${userId}%` }
        },
      });
  
      chat.dataValues.unreadMessagesCount = unreadCount;
    }
  
    return chats;
  };
  

  exports.getChatById = async (chatId) => {
    const chat = await Chat.findByPk(chatId, {
      include: [
        {
          model: ChatParticipant,
          as: "chatParticipants",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "firstName", "lastName", "role", "profilePicture"],
            },
          ],
        },
        {
          model: Message,
          as: "Messages",
          separate: true,
          order: [["sentAt", "ASC"]],
        },
      ],
    });
  
    if (!chat) return null;
  
    // Group consecutive messages by the same sender
    const groupedMessages = [];
    let currentGroup = null;
  
    for (const msg of chat.Messages) {
      if (
        !currentGroup ||
        currentGroup.senderId !== msg.senderId
      ) {
        currentGroup = {
          senderId: msg.senderId,
          messages: [msg],
        };
        groupedMessages.push(currentGroup);
      } else {
        currentGroup.messages.push(msg);
      }
    }
  
    // Attach grouped messages to chat
    chat.dataValues.groupedMessages = groupedMessages;
    delete chat.dataValues.Messages; 
    return chat;
  };
  

exports.addParticipant = async (chatId, userId) => {
  return await ChatParticipant.create({ chatId, userId });
};

exports.removeParticipant = async (chatId, userId) => {
  return await ChatParticipant.destroy({ where: { chatId, userId } });
};
