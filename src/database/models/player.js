"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    static associate(models) {

    }
  }

  player.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tornament_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "player",
    },
  );

  return player;
};