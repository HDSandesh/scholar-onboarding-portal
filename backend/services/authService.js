const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const login = async (email, password) => {
  const user = await db.User.findOne({
    where: db.sequelize.where(
      db.sequelize.fn("LOWER", db.sequelize.col("email")),
      email.toLowerCase()
    ),
  });

  if (!user) throw new Error("User not found. Please check your email.");

  if (!user.password) throw new Error("User has not set a password. Please set your password first.");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid email or password.");

  if (!user.isActive) throw new Error("Your account is deactivated. Contact admin for assistance.");

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

  return { 
    token, 
    user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, profilePicture: user.profilePicture } 
  };
};

module.exports = { login };
