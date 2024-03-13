"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class match extends Model {
    static associate(models) {
      match.belongsTo(models.tournament); // Adds tournamentId to Match
      match.belongsTo(models.team, { as: "team1" }); // Adds team1Id to Match
      match.belongsTo(models.team, { as: "team2" }); // Adds team2Id to Match
      match.hasMany(models.event)
      match.belongsToMany(models.player, { through: "match_player" })
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
    },
    {
      sequelize,
      modelName: "match",
    },
  );

  return match;
};