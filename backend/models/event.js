const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Event = sequelize.define("Event", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    media: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  
  module.exports = Event;