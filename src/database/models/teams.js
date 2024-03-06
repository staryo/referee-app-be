"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    static associate(models) {

    }
  }

  teams.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "teams",
    },
  );

  return teams;
};