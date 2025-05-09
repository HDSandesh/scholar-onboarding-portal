const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Chat = sequelize.define("Chat", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  isGroupChat: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true, // Only for group chats
  },
  lastMessageAt: {
    type: DataTypes.DATE,
    allowNull: true, // Updated when a new message is sent
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: true, // User who created the group (null for one-on-one)
  },
});

// Many-to-Many Relationship (Users <-> Chats)
Chat.belongsToMany(User, { through: "ChatParticipants" });

module.exports = Chat;
