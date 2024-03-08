"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class tournament extends Model {
    static associate(models) {
      tournament.hasMany(models.team); // Adds tournamentId to Team
      tournament.hasMany(models.player); // Adds tournamentId to Player
      tournament.hasMany(models.match); // Adds tournamentId to Match
      tournament.belongsToMany(models.user, {through: "tournament_user"})
    }
  }

  tournament.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sport_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      default_number_of_periods: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      default_period_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "tournament",
    },
  );

  return tournament;
};