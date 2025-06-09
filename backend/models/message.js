const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sentAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "Users", key: "id" },
  },
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "Chats", key: "id" },
  },
});

module.exports = Message;
