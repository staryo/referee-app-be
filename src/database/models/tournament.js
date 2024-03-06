"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class tournament extends Model {
    static associate(models) {

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
      default_number_of_periouds: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      default_perioud_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      match_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "tournament",
    },
  );

  return tournament;
};