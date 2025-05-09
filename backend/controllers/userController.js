const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;
    const user = await userService.createUser({ firstName, lastName, email, role });
    res.status(201).json({ message: "User created. Password setup email sent.", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const activateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await userService.updateUserStatus(userId, true); // Activate user
    res.json({ message: "User activated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await userService.updateUserStatus(userId, false); // Deactivate user
    res.json({ message: "User deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bulkCreateUsers = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const createdCount = await userService.bulkCreateUsers(req.file.buffer);
    res.json({ message: `${createdCount} users created successfully, emails sent.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await userService.setPassword(token, newPassword);
    res.json({ message: "Password set successfully. You can now log in." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, activateUser, deactivateUser, bulkCreateUsers, setPassword };
