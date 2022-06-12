"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlayGame.belongsTo(models.Room, {
        foreignKey: "roomId",
        as: "PlayGame",
      });
    }
  }
  PlayGame.init(
    {
      roomId: DataTypes.INTEGER,
      p1Choose: DataTypes.STRING,
      p2Choose: DataTypes.STRING,
      result: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PlayGame",
    }
  );
  return PlayGame;
};
