const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Form = require("./form");
const User = require("./user");

const FormResponse = sequelize.define("FormResponse", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    formId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Form,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    responses: {
      type: DataTypes.JSON,
      allowNull: false, // Stores user responses for each field
    },
  });
  
  Form.hasMany(FormResponse, { foreignKey: "formId" });
  User.hasMany(FormResponse, { foreignKey: "userId" });
  FormResponse.belongsTo(Form, { foreignKey: "formId" });
  FormResponse.belongsTo(User, { foreignKey: "userId" });
  
  module.exports = FormResponse;