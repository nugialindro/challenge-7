"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayerUserBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlayerUserBiodata.belongsTo(models.PlayerUser, {
        foreignKey: "playerUserId",
        as: "PlayerUser",
      });
    }
  }
  PlayerUserBiodata.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      playerUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PlayerUserBiodata",
    }
  );
  return PlayerUserBiodata;
};
