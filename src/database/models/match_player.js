"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class match_player extends Model {
    static associate(models) {
    }
  }

  match_player.init(
    {
      team_number: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "match_player",
    },
  );

  return match_player;
};