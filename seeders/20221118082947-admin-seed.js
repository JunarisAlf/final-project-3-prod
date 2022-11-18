'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const password = 'admin1234';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return queryInterface.bulkInsert('User', [
            {
                full_name: "Admin from Seeder",
                email: "admin@gmail.com",
                password: hashedPassword,
                gender: "male",
                role: "admin",
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('User', null, {});
    },
};
