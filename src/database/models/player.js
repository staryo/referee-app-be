"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    static associate(models) {
      player.belongsTo(models.tournament); // Adds tournamentId to Player
      player.belongsToMany(models.event, { through: 'assistants' }); // Adds eventId to Player
      player.hasMany(models.match_player_team)
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
    },
    {
      sequelize,
      modelName: "player",
    },
  );

  return player;
};