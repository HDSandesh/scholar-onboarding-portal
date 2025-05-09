const { Sequelize } = require("sequelize");
const config = require("./config")[process.env.NODE_ENV || "development"]; // Load config

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging || false, // Optional: Disable logging if not needed
});

module.exports = sequelize;
