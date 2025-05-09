const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Buddy = sequelize.define("Buddy", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    scholarId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    buddyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  });
  
  User.hasMany(Buddy, { foreignKey: "scholarId" });
  User.hasMany(Buddy, { foreignKey: "buddyId" });
  Buddy.belongsTo(User, { foreignKey: "scholarId" });
  Buddy.belongsTo(User, { foreignKey: "buddyId" });
  
  module.exports = Buddy;
  