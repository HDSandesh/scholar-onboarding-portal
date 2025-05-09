const bcrypt = require("bcrypt");
const db = require("../models");
const emailService = require("../utils/emailService");
const xlsx = require("xlsx");
const jwt = require("jsonwebtoken");

const createUser = async ({ firstName, lastName, email, role }) => {
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  const user = await db.User.create({
    firstName,
    lastName,
    email,
    role,
    isActive: false, // Default inactive until activation
    password: null, // User must set password
  });

  // Generate password setup token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

  // Send password setup email
  const passwordResetLink = `${process.env.FRONTEND_URL}/set-password?token=${token}`;
  await emailService.sendEmail(
    email,
    "Set Your Password",
    `Welcome ${firstName},\n\nClick the link below to set your password:\n${passwordResetLink}`
  );

  return user;
};

const updateUserStatus = async (userId, status) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("User not found");

  user.isActive = status;
  await user.save();
};

const bulkCreateUsers = async (fileBuffer) => {
  const workbook = xlsx.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const usersToCreate = [];
  const emailPromises = [];

  for (const row of sheet) {
    const { FirstName, LastName, Email, Role } = row;
    if (!FirstName || !LastName || !Email || !Role) continue;

    const existingUser = await db.User.findOne({ where: { email: Email } });
    if (existingUser) continue;

    const user = await db.User.create({
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      role: Role,
      isActive: false, // New users are inactive until activated
      password: null, // Users must set a password
    });

    // Generate password setup token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    const passwordResetLink = `${process.env.FRONTEND_URL}/set-password?token=${token}`;

    emailPromises.push(
      emailService.sendEmail(
        Email,
        "Set Your Password",
        `Welcome ${FirstName},\n\nClick the link below to set your password:\n${passwordResetLink}`
      )
    );

    usersToCreate.push(user);
  }

  await Promise.all(emailPromises);
  return usersToCreate.length;
};

const setPassword = async (token, newPassword) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await db.User.findByPk(decoded.id);
  if (!user) throw new Error("User not found");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};

module.exports = { createUser, updateUserStatus, bulkCreateUsers, setPassword };
