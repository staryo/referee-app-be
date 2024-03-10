"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class match extends Model {
    static associate(models) {
      match.belongsTo(models.tournament); // Adds tournamentId to Match
      match.belongsTo(models.team, { as: "team1" }); // Adds team1Id to Match
      match.belongsTo(models.team, { as: "team2" }); // Adds team2Id to Match
      match.hasMany(models.event)
      match.belongsToMany(models.player, {through: "match_player"})
    }
  }

  match.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      current_period: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      is_period_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "match",
    },
  );

  return match;
};