'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin', 10); // Hash the password

    await queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'sandeshhd16@gmail.com',
      role: 'Admin',
      password: hashedPassword, // Store hashed password
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'sandeshhd16@gmail.com' }, {});
  }
};
