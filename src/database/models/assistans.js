"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class assistans extends Model {
    static associate(models) {

    }
  }

  assistans.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      match_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      
      
    },
    {
      sequelize,
      modelName: "assistans",
    },
  );

  return assistans;
};