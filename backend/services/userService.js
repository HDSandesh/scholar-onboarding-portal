const bcrypt = require("bcrypt");
const db = require("../models");
const emailService = require("../utils/emailService");
const xlsx = require("xlsx");
const jwt = require("jsonwebtoken");

const createUser = async ({ firstName, lastName, email, role, buddyId }) => {
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  const user = await db.User.create({
    firstName,
    lastName,
    email,
    role,
    buddyId,
    isActive: false, // Default inactive until activation
    password: null, // User must set password
  });

  // Generate password setup token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  // Send password setup email
  const passwordResetLink = `${process.env.FRONTEND_URL}/set-password?token=${token}`;
  await emailService.sendEmail(
    email,
    "Set Your Password",
    `Welcome ${firstName},\n\nClick the link below to set your password:\n${passwordResetLink}`
  );

  return {
    id: user.id,
    firstName,
    lastName,
    email,
    role,
  };
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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
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
  user.isActive = true
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};

const getAccounts = async (role, page, limit, query) => {
  const whereClause = {};

  if (role) {
    whereClause.role = role;
  }

  // If a search query is passed, match it against name or email
  if (query) {
    whereClause[Op.or] = [
      where(
        literal(`LOWER(CONCAT("firstName", ' ', "lastName"))`),
        {
          [Op.like]: `%${query.toLowerCase()}%`,
        }
      ),
      {
        email: {
          [Op.iLike]: `%${query}%`,
        },
      },
    ];
  }

  const options = {
    attributes: { exclude: ['password'] },
    where: whereClause,
    order: [['firstName', 'ASC']],
  };

  if (page && limit) {
    const offset = (page - 1) * limit;
    options.limit = limit;
    options.offset = offset;
  }

  const { count, rows } = await db.User.findAndCountAll(options);

  // Role counts (could be cached if needed)
  const [totalScholars, totalOnboardingBuddies, totalVTManagers, totalAdmins] = await Promise.all([
    db.User.count({ where: { role: 'Scholar' } }),
    db.User.count({ where: { role: 'OnboardingBuddy' } }),
    db.User.count({ where: { role: 'VTManager' } }),
    db.User.count({ where: { role: 'Admin' } }),
  ]);

  const result = {
    total: count,
    data: rows,
    roleCounts: {
      totalScholars,
      totalOnboardingBuddies,
      totalVTManagers,
      totalAdmins,
    },
  };

  if (page && limit) {
    result.page = page;
    result.totalPages = Math.ceil(count / limit);
  }

  return result;
};

const { User, Batch } = require("../models");
const { Op, where, literal } = require("sequelize");

const getAccountsForExport = async () => {
  const users = await User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "role"],
    include: [
      {
        model: Batch,
        attributes: ["name"],
      },
      {
        model: User,
        as: "buddy",
        attributes: ["firstName", "lastName"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
  const formatted = users.map((user) => {
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    if (user.role === "Scholar") {
      userData.batchName = user.Batch?.name || "";
      userData.buddyName = user.buddy
        ? `${user.buddy.firstName} ${user.buddy.lastName}`
        : "";
    }

    return userData;
  });

  return formatted;
};

const updateAccount = async (id, updateData) => {
  const [updatedRowsCount, [updatedAccount]] = await db.User.update(
    updateData,
    {
      where: { id },
      returning: true,
    }
  );

  if (updatedRowsCount === 0) {
    throw new Error("Account not found or no changes made.");
  }

  return updatedAccount;
};

const updateBuddyForScholar = async (userId, buddyId) => {
  if (!buddyId) {
    const error = new Error("buddyId is required");
    error.status = 400;
    throw error;
  }

  const user = await db.User.findByPk(userId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (user.role !== "Scholar") {
    const error = new Error(
      'Buddy can only be updated for users with role "Scholar"'
    );
    error.status = 403;
    throw error;
  }

  user.buddyId = buddyId;
  await user.save();

  return {
    id: user.id,
    buddy: user.buddyId,
    message: "Buddy updated successfully",
  };
};

const sendMail = async (id) => {
  try {
    const user = await db.User.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const passwordResetLink = `${process.env.FRONTEND_URL}/set-password?token=${token}`;

    await emailService.sendEmail(
      user.email,
      "Set Your Password",
      `Welcome ${user.firstName},\n\nClick the link below to set your password:\n${passwordResetLink}`
    );

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

const deleteUserById = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  await user.destroy();
  return { message: "User deleted successfully" };
};

module.exports = {
  createUser,
  updateUserStatus,
  bulkCreateUsers,
  setPassword,
  getAccounts,
  getAccountsForExport,
  updateAccount,
  updateBuddyForScholar,
  deleteUserById,
  sendMail
};
