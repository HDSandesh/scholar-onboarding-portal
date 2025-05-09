const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM(
      "newPost", 
      "newEvent", 
      "courseUpdate", 
      "formDeadline", 
      "manual", 
      "postLiked",  // New Type
      "postCommented" // New Type
    ),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING, // Redirect to post, event, etc.
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.UUID, // User who triggered this notification (e.g., user who liked the post)
    allowNull: true,
  },
  targetUser: {
    type: DataTypes.UUID, // The user who should receive the notification (e.g., post owner)
    allowNull: true,
  },
  isReadBy: {
    type: DataTypes.ARRAY(DataTypes.UUID), // Users who have read it
    defaultValue: [],
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Relationships
Notification.belongsTo(User, { foreignKey: "createdBy", as: "creator", allowNull: true });
Notification.belongsTo(User, { foreignKey: "targetUser", as: "recipient", allowNull: true });

module.exports = Notification;
