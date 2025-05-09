const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Batch = require("./Batch");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // Initially null until the user sets it
  },
  role: {
    type: DataTypes.ENUM("Scholar", "OnboardingBuddy", "VTManager", "Admin"),
    allowNull: false,
  },
  batchId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Batch,
      key: "id",
    },
    validate: {
      isBatchAllowed(value) {
        if (this.role !== "Scholar" && value) {
          throw new Error("Only Scholars can be assigned a batch.");
        }
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isResumeAllowed(value) {
        if (this.role !== "Scholar" && value) {
          throw new Error("Only Scholars can have a resume.");
        }
      },
    },
  },
  achievements: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  college: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  currentTeam: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isCurrentTeamAllowed(value) {
        if (this.role !== "OnboardingBuddy" && value) {
          throw new Error("Only Onboarding Buddies can have a current team.");
        }
      },
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// Relationships
Batch.hasMany(User, { foreignKey: "batchId", onDelete: "SET NULL" });
User.belongsTo(Batch, { foreignKey: "batchId" });

// Ensure correct constraints at the application level
User.addHook("beforeSave", (user) => {
  if (user.role !== "Scholar") {
    user.resume = null;
    user.batchId = null;
  }
  if (user.role !== "OnboardingBuddy") {
    user.currentTeam = null;
  }
});

module.exports = User;
