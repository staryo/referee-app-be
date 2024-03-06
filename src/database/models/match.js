"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class match extends Model {
    static associate(models) {

    }
  }

  match.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      tournament_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      second_team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      period: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
    },
    {
      sequelize,
      modelName: "match",
    },
  );

  return match;
};