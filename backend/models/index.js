'use strict';

const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database'); // Initialized Sequelize instance

const db = {};

// Dynamically load all models in this directory
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.endsWith('.js'))
  .forEach(file => {
    const modelDef = require(path.join(__dirname, file));
    // Support class or factory model export
    const model = modelDef.init ? modelDef : modelDef(sequelize, sequelize.Sequelize.DataTypes);
    db[model.name] = model;
});

// Extract models
const { Chat, ChatParticipant, Message, User } = db;

// === Associations === //

// Many-to-many Chat <-> User through ChatParticipant
Chat.belongsToMany(User, {
  through: ChatParticipant,
  foreignKey: 'chatId',
  otherKey: 'userId',
  as: 'participants',      // chat.getParticipants()
});
User.belongsToMany(Chat, {
  through: ChatParticipant,
  foreignKey: 'userId',
  otherKey: 'chatId',
  as: 'chats',             // user.getChats()
});

// Explicit belongsTo and hasMany for ChatParticipant -> Chat and User
ChatParticipant.belongsTo(Chat, { foreignKey: 'chatId', as: 'chat' });
Chat.hasMany(ChatParticipant, { foreignKey: 'chatId', as: 'chatParticipants' });

ChatParticipant.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(ChatParticipant, { foreignKey: 'userId', as: 'chatParticipants' });

// ChatParticipant tracks lastSeenMessage optionally
ChatParticipant.belongsTo(Message, { foreignKey: 'lastSeenMessageId', as: 'lastSeenMessage' });

// Messages belong to Chat and User (sender)
Message.belongsTo(Chat, { foreignKey: 'chatId' });
Chat.hasMany(Message, { foreignKey: 'chatId' });

Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });

// Apply any additional associations in models themselves (if any)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;

// Sync DB (optional, adjust or remove in production)
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced with alter'))
  .catch(err => console.error('❌ Error syncing database:', err));

module.exports = db;
