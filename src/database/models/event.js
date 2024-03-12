"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    static associate(models) {
      event.belongsTo(models.match)
      event.belongsToMany(models.player, { through: 'event_player' }); // Creates a join table player_events with eventId and playerId
    }
  }

  event.init(
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
      assist_author_id: {
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
      team_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "event",
    },
  );

  return event;
};