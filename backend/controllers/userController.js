const userService = require("../services/userService");
const XLSX = require("xlsx");
const path = require("path")
const fs = require("fs")

const createUser = async (req, res) => {
  console.log(req)
  try {
    const { firstName, lastName, email, role, buddyId } = req.body;
    const user = await userService.createUser({ firstName, lastName, email, role, buddyId });
    res.status(201).json({ message: "User created. Password setup email sent.", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const { token, password } = req.body;
    await userService.setPassword(token, password);
    res.json({ message: "Password set successfully. You can now log in." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAccount = await userService.updateAccount(id, req.body);
    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserBuddy = async (req, res) => {
  try {
    const { id } = req.params;
    const { buddyId } = req.body;

    const result = await userService.updateBuddyForScholar(id, buddyId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Buddy update error:', error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

const getAccounts = async (req, res) => {
  try {
  const { role, page, limit, query } = req.query;
  const result = await userService.getAccounts(role, parseInt(page), parseInt(limit), query);
  res.status(200).json(result);
  } catch (err) {
      console.log(err)
  res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await userService.deleteUserById(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(400).json({ error: error.message });
  }
};

const sendMail = async (req, res)=>{
  const {id} = req.body
  try{
    const result = await userService.sendMail(id)
    res.status(200).send(result)
  }catch(error){
    console.error("Send Email error:", error);
    res.status(400).json({ error: error.message });
  }
}

const exportAccounts = async (req, res) => {
  try {
    const allAccounts = await userService.getAccountsForExport(); // Get all accounts

    const grouped = {
      Scholar: [],
      OnboardingBuddy: [],
      Admin: [],
      VTManager: [],
    };

    allAccounts.forEach(account => {
      if (grouped[account.role]) {
        const role = account.role
        delete account.role;
        grouped[role].push(account);
      }
    });

    const workbook = XLSX.utils.book_new();

    Object.entries(grouped).forEach(([role, users]) => {
      const worksheet = XLSX.utils.json_to_sheet(users);
      XLSX.utils.book_append_sheet(workbook, worksheet, role);
    });

    const filePath = path.join(__dirname, "../exports", "accounts-export.xlsx");
    XLSX.writeFile(workbook, filePath);

    res.download(filePath, "accounts-export.xlsx", err => {
      if (err) {
        console.error("Download error:", err);
      }
      fs.unlinkSync(filePath); // Delete file after sending
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { createUser, activateUser, deactivateUser, bulkCreateUsers, setPassword, getAccounts, updateAccount, updateUserBuddy, deleteUser, exportAccounts, sendMail };
