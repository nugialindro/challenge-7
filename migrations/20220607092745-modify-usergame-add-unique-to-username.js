"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("UserGames", "username", {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("UserGames", "username", {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    });
  },
};
