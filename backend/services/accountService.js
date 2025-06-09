const { Op } = require("sequelize");
const db = require("../models");
const Account = db.User;
// Create a single account
const createAccount = async (accountData) => {
  const existing = await Account.findOne({
    where: {
      email: accountData.email, // Use another unique field if needed
    },
  });

  if (existing) {
    throw new Error("Account with this email already exists.");
  }

  const account = await Account.create(accountData);
  return account;
};

// Get accounts, optionally filtered by role
const getAccounts = async (role, page, limit) => {
  const whereClause = { role };

  const options = {
    where: whereClause,
    order: [['createdAt', 'DESC']],
  };

  if (page && limit) {
    const offset = (page - 1) * limit;
    options.limit = limit;
    options.offset = offset;
  }

  const { count, rows } = await Account.findAndCountAll(options);

  const response = {
    total: count,
    data: rows,
  };

  if (page && limit) {
    response.page = page;
    response.limit = limit;
    response.totalPages = Math.ceil(count / limit);
  }

  return response;
};


// Bulk import accounts from Excel
const importAccounts = async (accountsData) => {
  const createdAccounts = [];
  const failedAccounts = [];

  for (const data of accountsData) {
    try {
      const exists = await Account.findOne({ where: { email: data.email } });
      if (exists) {
        failedAccounts.push({
          ...data,
          reason: "Duplicate email",
        });
        continue;
      }

      const account = await Account.create(data);
      createdAccounts.push(account);
    } catch (err) {
      failedAccounts.push({
        ...data,
        reason: err.message || "Unknown error",
      });
    }
  }

  return {
    success: createdAccounts.length,
    failed: failedAccounts.length,
    createdAccounts,
    failedAccounts,
  };
};

const updateAccount = async (id, updateData) => {
  const [updatedRowsCount, [updatedAccount]] = await Account.update(updateData, {
    where: { id },
    returning: true,
  });

  if (updatedRowsCount === 0) {
    throw new Error("Account not found or no changes made.");
  }

  return updatedAccount;
};

// Toggle isActive status for an account
const toggleAccountStatus = async (id) => {
  const account = await Account.findByPk(id);

  if (!account) {
    throw new Error("Account not found.");
  }

  account.isActive = !account.isActive;
  await account.save();

  return account;
};

module.exports = {
  createAccount,
  getAccounts,
  importAccounts,
  updateAccount,
  toggleAccountStatus
};
