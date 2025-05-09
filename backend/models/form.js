const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Form = sequelize.define("Form", {
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
    fields: {
      type: DataTypes.JSON,
      allowNull: false, // Stores form structure
    },
    fillBy: {
      type: DataTypes.DATE,
      allowNull: false, // Deadline for form submission
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Active state of the form
    }
  });
  
  module.exports = Form;