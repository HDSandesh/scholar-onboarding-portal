const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const UserStats = sequelize.define("UserStats", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  postsCreated: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  postsLiked: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  commentsMade: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  formsSubmitted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  engagementScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // This will be computed as a sum of all activities
  },
});

// Auto-update engagementScore before saving
UserStats.addHook("beforeSave", (stats) => {
  stats.engagementScore =
    stats.postsCreated * 5 + // 5 points per post
    stats.postsLiked * 2 + // 2 points per like received
    stats.commentsMade * 3 + // 3 points per comment
    stats.formsSubmitted * 3; // 3 points per form submission
});

module.exports = UserStats;
