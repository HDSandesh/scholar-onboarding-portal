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
    allowNull: true, // Long course description
  },
  instructorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false, // e.g., "2Hrs"
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true, // e.g., ['UI5', 'MVC']
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true, // URL to course
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true, // Optional image URL
  }
});

module.exports = Course;
