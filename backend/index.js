const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path')
const cors = require("cors")
const sequelize = require("./config/database"); // Import Sequelize instance
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors())
// Test database connection
sequelize
.authenticate()
.then(() => console.log("Connected to PostgreSQL"))
.catch((err) => console.error("Error:", err));

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Scholar Onboarding Backend is Running!");
});

app.listen(port, () => {
    console.log(`Server is running on ${process.env.BACKEND_URL || `http://localhost:${port}`}`);
});
