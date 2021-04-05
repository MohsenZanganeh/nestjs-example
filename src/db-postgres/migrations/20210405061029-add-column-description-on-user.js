'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'petName', {
        type: Sequelize.DataTypes.STRING,
      }),
      queryInterface.addColumn('Users', 'favoriteColor', {
        type: Sequelize.DataTypes.STRING,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
