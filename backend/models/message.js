const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Chat = require("./chat");
const User = require("./user");
const Message = sequelize.define("Message", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Chats",
        key: "id",
      },
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    seenBy: {
      type: DataTypes.ARRAY(DataTypes.UUID), // Stores IDs of users who read the message
      defaultValue: [],
    },
  });
  
  // Relationships
  Message.belongsTo(User, { foreignKey: "senderId" });
  Message.belongsTo(Chat, { foreignKey: "chatId" });
  Chat.hasMany(Message, { foreignKey: "chatId" });
  
  module.exports = Message;
  