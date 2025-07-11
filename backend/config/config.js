require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "I528706",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "scholar_onboarding",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "5432",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USER || "I528706",
    password: process.env.DB_PASSWORD || "your_db_password",
    database: process.env.DB_NAME || "scholar_onboarding_test",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "5432",
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
  }
};
