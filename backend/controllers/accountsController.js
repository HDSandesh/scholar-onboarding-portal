const accountService = require("../services/accountService");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const createAccount = async (req, res) => {
  try {
    const account = await accountService.createAccount(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAccounts = async (req, res) => {
    try {
    const { role='Admin', page = 1, limit = 20 } = req.query;
    const result = await accountService.getAccounts(role, parseInt(page), parseInt(limit));
    res.status(200).json(result);
    } catch (err) {
        console.log(err)
    res.status(500).json({ error: err.message });
    }
};

const importAccounts = async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      const result = await accountService.importAccounts(sheetData);
  
      res.status(200).json({
        message: "Import completed",
        successCount: result.success,
        failedCount: result.failed,
        failedRows: result.failedAccounts,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const exportAccounts = async (req, res) => {
    try {
      const allAccounts = await accountService.getAccounts(); // Get all accounts
  
      // Group by user type
      const grouped = {
        Scholar: [],
        OnboardingBuddy: [],
        Admin: [],
        VTManager: [],
      };
  
      allAccounts.forEach(account => {
        const role = account.role;
        if (grouped[role]) {
          grouped[role].push(account);
        }
      });
  
      // Create workbook and add separate sheets
      const workbook = XLSX.utils.book_new();
  
      Object.entries(grouped).forEach(([role, users]) => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        XLSX.utils.book_append_sheet(workbook, worksheet, role);
      });
  
      const filePath = path.join(__dirname, "../exports", "accounts-export.xlsx");
      XLSX.writeFile(workbook, filePath);
  
      res.download(filePath, "accounts-export.xlsx", err => {
        if (err) console.error("Download error:", err);
        fs.unlinkSync(filePath); // Cleanup
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const updateAccount = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAccount = await accountService.updateAccount(id, req.body);
      res.status(200).json(updatedAccount);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const toggleAccountStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const toggledAccount = await accountService.toggleAccountStatus(id);
      res.status(200).json(toggledAccount);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {
  createAccount,
  getAccounts,
  importAccounts,
  exportAccounts,
  updateAccount,
  toggleAccountStatus
};
