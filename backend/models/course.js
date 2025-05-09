const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Course = sequelize.define("Course", {
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
    content: {
      type: DataTypes.JSON,
      allowNull: false, // Stores course materials
    },
  });
  
  module.exports = Course;
  