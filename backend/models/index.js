'use strict';

const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database'); // Use the initialized instance
const db = {};

// Read and initialize all models dynamically
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.endsWith('.js'))
  .forEach(file => {
    const modelDef = require(path.join(__dirname, file));

    // Handle both class-based and function-based models
    const model = modelDef.init ? modelDef : modelDef(sequelize, sequelize.Sequelize.DataTypes);

    db[model.name] = model;
  });

// Associate models if applicable
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;
sequelize.sync({ alter : true })
  .then(() => console.log("✅ Database synced with alter: Tables recreated"))
  .catch(err => console.error("❌ Error syncing database:", err));
module.exports = db;
