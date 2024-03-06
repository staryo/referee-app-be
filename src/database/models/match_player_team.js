"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class match_player_team extends Model {
    static associate(models) {
      match_player_team.belongsTo(models.match)
      match_player_team.belongsTo(models.player)
      match_player_team.belongsTo(models.team)
    }
  }

  match_player_team.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: "match_player_team",
    },
  );

  return match_player_team;
};