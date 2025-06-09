const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const http = require("http");
const sequelize = require("./config/database");

// Route files
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const courseRoutes = require("./routes/courseRoutes");
const accountRoutes = require("./routes/accountRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const formRoutes = require("./routes/formRoutes");

// Socket.IO setup
const initializeSocket = require("./config/socket");

// Load env variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
initializeSocket(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/forms", formRoutes);

// Sequelize DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
    return sequelize.sync(); // Optional: sync models
  })
  .then(() => {
    server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
