"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    static associate(models) {

    }
  }

  events.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      goal_author_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      match_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      period: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assistans_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "events",
    },
  );

  return events;
};