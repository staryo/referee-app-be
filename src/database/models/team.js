"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    static associate(models) {
      team.belongsTo(models.tournament); // Adds tournamentId to Team
    }
  }

  team.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "team",
    },
  );

  return team;
};